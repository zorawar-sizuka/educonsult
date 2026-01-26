import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const toolType = body?.toolType;
    const sessionId = body?.sessionId || null;
    const payload = body?.payload ?? {};
    const result = body?.result ?? null; 
    const saved = Boolean(body?.saved);

    const allowed = ["eligibility", "finder", "cost", "sop", "gpa"]; // Added "gpa"
    if (!allowed.includes(toolType)) {
      return NextResponse.json({ ok: false, error: "Invalid toolType" }, { status: 400 });
    }

    const run = await prisma.toolRun.create({
      data: {
        toolType,
        sessionId,
        payload,
        result, 
        saved
      },
      select: {
        id: true,
        toolType: true,
        createdAt: true,
      },
    });

    // FIFO: Cap at 10 per session (runs after insert)
    if (sessionId) {
      const totalRuns = await prisma.toolRun.count({
        where: { sessionId },
      });

      if (totalRuns > 10) {
        const excess = totalRuns - 10;
        const cutoffTimestamp = await getNthOldestTimestamp(sessionId, excess);
        await prisma.toolRun.deleteMany({
          where: {
            sessionId,
            createdAt: { lt: cutoffTimestamp }, // Deletes oldest excess
          },
        });
        console.log(`[FIFO] Pruned ${excess} old runs for session ${sessionId}`);
      }
    }

    return NextResponse.json({ ok: true, run });
  } catch (e) {
    console.error("[Tool Run Error]:", e);
    return NextResponse.json({ ok: false, error: "Failed to save tool run" }, { status: 500 });
  } 
}

// Helper (moved outside—now callable)
async function getNthOldestTimestamp(sessionId, n) {
  const nthOldest = await prisma.toolRun.findFirst({
    where: { sessionId },
    orderBy: { createdAt: 'asc' },
    skip: n - 1, // Gets the Nth oldest
    select: { createdAt: true },
  });
  return nthOldest?.createdAt || new Date(0);
}