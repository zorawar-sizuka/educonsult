





import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const sessionId = body?.sessionId || null;
    const universityId = Number(body?.universityId);

    if (!sessionId) return NextResponse.json({ ok: false, error: "sessionId required" }, { status: 400 });
    if (!Number.isFinite(universityId)) return NextResponse.json({ ok: false, error: "universityId required" }, { status: 400 });

    const saved = await prisma.savedUniversity.upsert({
      where: { saved_uni_session_unique: { sessionId, universityId } },
      update: {},
      create: { sessionId, universityId },
      select: { id: true, universityId: true },
    });

    // Prune to 25 oldest if exceeded
    const count = await prisma.savedUniversity.count({ where: { sessionId } });
    if (count > 25) {
      const excess = count - 25;
      const oldest = await prisma.savedUniversity.findMany({
        where: { sessionId },
        orderBy: { createdAt: "asc" },
        take: excess,
      });
      const idsToDelete = oldest.map(o => o.id);
      await prisma.savedUniversity.deleteMany({
        where: { id: { in: idsToDelete } },
      });
    }

    return NextResponse.json({ ok: true, saved });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Failed to save university" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const universityId = Number(searchParams.get("universityId"));

    if (!sessionId) return NextResponse.json({ ok: false, error: "sessionId required" }, { status: 400 });
    if (!Number.isFinite(universityId)) return NextResponse.json({ ok: false, error: "universityId required" }, { status: 400 });

    await prisma.savedUniversity.delete({
      where: { saved_uni_session_unique: { sessionId, universityId } },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to unsave university" }, { status: 500 });
  }
}