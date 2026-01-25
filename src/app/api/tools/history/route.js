import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const safeInt = (v, fallback) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const toolType = searchParams.get("toolType");
  const sessionId = searchParams.get("sessionId");
  const take = Math.min(safeInt(searchParams.get("take"), 10), 50);
  const savedOnly = searchParams.get("savedOnly") === "1";

  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "sessionId required" }, { status: 400 });
  }

  const baseWhere = { sessionId };
  if (toolType) baseWhere.toolType = toolType;

  // We attempt with saved support first; if DB lacks the column, fall back gracefully.
  try {
    const where = { ...baseWhere };
    if (savedOnly) where.saved = true;

    const runs = await prisma.toolRun.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take,
      select: {
        id: true,
        toolType: true,
        payload: true,
        result: true,
        createdAt: true,
        saved: true,
      },
    });

    return NextResponse.json({ ok: true, runs, savedSupported: true });
  } catch (e) {
    // If DB doesn't have the column yet, fallback: no saved filtering, mark saved as false
    const msg = String(e?.message || "");
    const isMissingSavedColumn =
      msg.includes("ToolRun.saved") && msg.includes("does not exist");

    if (!isMissingSavedColumn) {
      return NextResponse.json({ ok: false, error: "Failed to load history" }, { status: 500 });
    }

    const runs = await prisma.toolRun.findMany({
      where: baseWhere,
      orderBy: { createdAt: "desc" },
      take,
      select: {
        id: true,
        toolType: true,
        payload: true,
        result: true,
        createdAt: true,
      },
    });

    // attach saved:false to keep frontend consistent
    const normalized = runs.map(r => ({ ...r, saved: false }));

    return NextResponse.json({
      ok: true,
      runs: savedOnly ? [] : normalized,
      savedSupported: false,
      warning: "Saved column not ready yet; showing regular history only.",
    });
  }
}
