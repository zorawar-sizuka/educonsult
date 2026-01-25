import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const id = Number(body?.id);
    const saved = Boolean(body?.saved);

    if (!Number.isFinite(id)) {
      return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
    }

    const updated = await prisma.toolRun.update({
      where: { id },
      data: { saved },
      select: { id: true, saved: true },
    });

    return NextResponse.json({ ok: true, updated });
  } catch (e) {
    const msg = String(e?.message || "");
    if (msg.includes("ToolRun.saved") && msg.includes("does not exist")) {
      return NextResponse.json(
        { ok: false, error: "Saved feature not ready (DB not migrated yet)." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Failed to update saved status" },
      { status: 500 }
    );
  }
}
