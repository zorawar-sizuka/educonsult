import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const toolType = searchParams.get("toolType") || null;
    const take = Math.min(Number(searchParams.get("take")) || 25, 50);

    if (!sessionId) {
      return NextResponse.json({ ok: false, error: "sessionId required" }, { status: 400 });
    }

    const where = { sessionId };
    if (toolType) where.toolType = toolType;

    const runs = await prisma.toolSaved.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take,
      select: {
        id: true,
        toolType: true,
        payload: true,
        result: true,
        createdAt: true,
        originalRunId: true, // optional, useful for UI
      },
    });

    return NextResponse.json({ ok: true, runs });
  } catch (e) {
    console.error("[Saved History Error]:", e);
    return NextResponse.json({ ok: false, error: "Failed to load saved history" }, { status: 500 });
  }
}