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




    const allowed = ["eligibility", "finder", "cost", "sop"];
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

    return NextResponse.json({ ok: true, run });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Failed to save tool run" }, { status: 500 });
  }
}
