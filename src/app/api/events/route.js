


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


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
        slug:true,
        category: true,
        date: true,
        time: true,
        location: true,
        description: true,
        longDescription: true,
        imageUrl: true,
        isPublished: true,
      },
      // Prisma Accelerate caching — global, does NOT count against Vercel ISR quota
      cacheStrategy: { ttl: 300, swr: 600 }, // 5 min cache + 10 min stale
    });

    console.log("[Public Events API] Returned", events.length, "rows");

    return NextResponse.json(events, {
      // Edge caching — Vercel CDN caches this response
      // No ISR writes — pure edge cache
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("Public Events API Error:", err);
    return NextResponse.json([], { status: 200 });
  }
}