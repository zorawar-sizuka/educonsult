import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic'; // Ensures fresh on request, but ISR caches

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: "asc" },
      select: {
        code: true,
        name: true,
        currencyCode: true,
        livingCostMonthlyUsd: true,
        updatedAt: true,
      },
    });

    // Optional: Add revalidation header for ISR (1h cache, reval on-demand)
    const response = NextResponse.json({ ok: true, countries });
    response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate=3600'); // 1h edge cache

    return response;
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Failed to load countries" },
      { status: 500 }
    );
  }
}