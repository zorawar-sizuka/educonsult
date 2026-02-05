import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req, ctx) {
  // ✅ Next.js can pass params as a Promise
  const { slug } = await ctx.params;

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid slug" }, { status: 400 });
  }

  try {
    const event = await prisma.event.findFirst({
      where: { slug, isPublished: true },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        date: true,
        time: true,
        location: true,
        description: true,
        longDescription: true,
        imageUrl: true,
        isPublished: true,
        createdAt: true,
      },
    });

    if (!event) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { ok: true, event },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    console.error("Public Event by slug API Error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
