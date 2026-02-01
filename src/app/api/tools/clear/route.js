import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ ok: false }, { status: 400 });

    await prisma.toolRun.deleteMany({ where: { sessionId } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}