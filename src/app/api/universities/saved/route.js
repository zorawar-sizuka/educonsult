import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    if (!sessionId) return NextResponse.json({ ok: false, error: "sessionId required" }, { status: 400 });

    const saved = await prisma.savedUniversity.findMany({
      where: { sessionId },
      orderBy: { createdAt: "desc" },
      select: {
        createdAt: true,
        university: {
          select: { id: true, name: true, countryCode: true, ranking: true, tuitionYearUsd: true, intake: true },
        },
      },
    });

    return NextResponse.json({ ok: true, saved });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to load saved universities" }, { status: 500 });
  }
}
