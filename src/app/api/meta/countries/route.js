import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    return NextResponse.json({ ok: true, countries });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Failed to load countries" },
      { status: 500 }
    );
  }
}
