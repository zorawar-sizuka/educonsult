import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const templateId = Number(body?.templateId);
    const sessionId = body?.sessionId || null;
    const inputs = body?.inputs ?? {};
    const generated = body?.generated ?? null;
    const draftId = body?.draftId ? Number(body.draftId) : null;

    if (!Number.isFinite(templateId)) {
      return NextResponse.json({ ok: false, error: "templateId required" }, { status: 400 });
    }

    if (draftId && Number.isFinite(draftId)) {
      const updated = await prisma.sOPDraft.update({
        where: { id: draftId },
        data: { inputs, generated },
        select: { id: true, updatedAt: true },
      });
      return NextResponse.json({ ok: true, draft: updated });
    }

    const created = await prisma.sOPDraft.create({
      data: { templateId, sessionId, inputs, generated },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, draft: created });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save draft" }, { status: 500 });
  }
}
