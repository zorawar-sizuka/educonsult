import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const safeInt = (v, fallback) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const country = searchParams.get("country") || "All";
    const maxTuition = safeInt(searchParams.get("maxTuition"), 80000);
    const take = Math.min(safeInt(searchParams.get("take"), 50), 200);

    const where = {
      AND: [
        country !== "All" ? { countryCode: country } : {},
        {
          OR: [
            { tuitionYearUsd: { lte: maxTuition } },
            { tuitionYearUsd: null }, // keep if you want unknown tuition to still show
          ],
        },
      ],
    };

    const universities = await prisma.university.findMany({
      where,
      orderBy: [{ ranking: "asc" }, { tuitionYearUsd: "asc" }],
      take,
      select: {
        id: true,
        name: true,
        countryCode: true,
        ranking: true,
        tuitionYearUsd: true,
        intake: true,
      },
    });

    return NextResponse.json({ ok: true, universities });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Failed to load universities" },
      { status: 500 }
    );
  }
}
