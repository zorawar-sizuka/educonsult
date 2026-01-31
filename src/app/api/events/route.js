import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// cache at edge for speed + SEO
export const revalidate = 300; // 5 minutes

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const monthName = searchParams.get("month");

    let dateFilter = {};

    if (monthName && monthName !== "All Months") {
      const year = new Date().getFullYear();
      const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();

      const start = new Date(Date.UTC(year, monthIndex, 1, 0, 0, 0));
      const end = new Date(Date.UTC(year, monthIndex + 1, 0, 23, 59, 59));

      dateFilter = {
        date: { gte: start, lte: end },
      };
    }

    const events = await prisma.event.findMany({
      where: {
        isPublished: true,
        ...dateFilter,
      },
      orderBy: { date: "asc" },
      select: {
        id: true,
        title: true,
        category: true,
        date: true,
        time: true,
        location: true,
        description: true,
        longDescription: true,
        imageUrl: true, 
        isPublished: true, 
      },
    });

    return NextResponse.json(events, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("Public Events API Error:", err);
    return NextResponse.json([], { status: 200 });
  }
} 


