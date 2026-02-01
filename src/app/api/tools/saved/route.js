import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { runId, action } = body; // action: "save" or "unsave"
    const sessionId = body.sessionId || null;

    if (!["save", "unsave"].includes(action) || !runId || !sessionId) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }

    // Fetch the original run first (must exist and belong to session)
    const original = await prisma.toolRun.findUnique({
      where: { id: Number(runId) },
      select: { toolType: true, payload: true, result: true, sessionId: true },
    });

    if (!original || original.sessionId !== sessionId) {
      return NextResponse.json({ ok: false, error: "Run not found or unauthorized" }, { status: 404 });
    }

    if (action === "save") {
      // Manual upsert: find by originalRunId, update if exists, else create
      const existing = await prisma.toolSaved.findFirst({
        where: { originalRunId: Number(runId) },
      });

      if (existing) {
        await prisma.toolSaved.update({
          where: { id: existing.id },
          data: {
            payload: original.payload,
            result: original.result,
            updatedAt: new Date(),
          },
        });
      } else {
        await prisma.toolSaved.create({
          data: {
            sessionId: original.sessionId,
            toolType: original.toolType,
            payload: original.payload,
            result: original.result,
            originalRunId: Number(runId),
          },
        });
      }

      // Prune if >25 saved items for this session
      const count = await prisma.toolSaved.count({ where: { sessionId } });
      if (count > 25) {
        const excess = count - 25;
        const cutoff = await getNthOldestSavedTimestamp(sessionId, excess);
        await prisma.toolSaved.deleteMany({
          where: { sessionId, createdAt: { lt: cutoff } },
        });
      }

      return NextResponse.json({ ok: true, message: "Saved successfully" });
    }

    if (action === "unsave") {
      await prisma.toolSaved.deleteMany({ where: { originalRunId: Number(runId) } });
      return NextResponse.json({ ok: true, message: "Unsaved successfully" });
    }
  } catch (e) {
    console.error("[Tool Saved Error]:", e);
    return NextResponse.json({ ok: false, error: "Operation failed" }, { status: 500 });
  }
}

async function getNthOldestSavedTimestamp(sessionId, n) {
  const nth = await prisma.toolSaved.findFirst({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
    skip: n - 1,
    select: { createdAt: true },
  });
  return nth?.createdAt || new Date(0);
}