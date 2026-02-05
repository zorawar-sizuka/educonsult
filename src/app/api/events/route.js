// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// // cache at edge for speed + SEO
// export const revalidate = 300; // 5 minutes

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const monthName = searchParams.get("month");

//     let dateFilter = {};

//     if (monthName && monthName !== "All Months") {
//       const year = new Date().getFullYear();
//       const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();

//       const start = new Date(Date.UTC(year, monthIndex, 1, 0, 0, 0));
//       const end = new Date(Date.UTC(year, monthIndex + 1, 0, 23, 59, 59));

//       dateFilter = {
//         date: { gte: start, lte: end },
//       };
//     }

//     const events = await prisma.event.findMany({
//       where: {
//         isPublished: true,
//         ...dateFilter,
//       },
//       orderBy: { date: "asc" },
//       select: {
//         id: true,
//         title: true,
//         category: true,
//         date: true,
//         time: true,
//         location: true,
//         description: true,
//         longDescription: true,
//         imageUrl: true, 
//         isPublished: true, 
//       },
//     });

//     return NextResponse.json(events, {
//       headers: {
//         "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
//       },
//     });
//   } catch (err) {
//     console.error("Public Events API Error:", err);
//     return NextResponse.json([], { status: 200 });
//   }
// } 




// // events/route.js (public read-only) — Updated to fully leverage Accelerate caching
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// // // ISR + edge caching (Vercel level)
// // export const revalidate = 300; // 5 minutes

// export async function GET(req) { 
// //   console.log("Accelerate URL present:", !!process.env.ACCELERATE_URL);
// // console.log("Prisma client has Accelerate:", !!prisma._engine?.accelerate);
//   try {
//     const { searchParams } = new URL(req.url);
//     const monthName = searchParams.get("month");

//     let dateFilter = {};

//     if (monthName && monthName !== "All Months") {
//       const year = new Date().getFullYear();
//       const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();

//       const start = new Date(Date.UTC(year, monthIndex, 1, 0, 0, 0));
//       const end = new Date(Date.UTC(year, monthIndex + 1, 0, 23, 59, 59));

//       dateFilter = {
//         date: { gte: start, lte: end },
//       };
//     }

//     const events = await prisma.event.findMany({
//       where: {
//         isPublished: true,
//         ...dateFilter,
//       },
//       orderBy: { date: "asc" },
//       select: {
//         id: true,
//         title: true,
//         category: true,
//         date: true,
//         time: true,
//         location: true,
//         description: true,
//         longDescription: true,
//         imageUrl: true, 
//         isPublished: true, 
//       },
//       // Explicit Accelerate cache strategy — matches your ISR revalidate
//       // ttl: 300s cache, swr: 600s stale-while-revalidate (fresh data in background)
//       cacheStrategy: { ttl: 300, swr: 600 },
//     });

//     console.log("[Events API] Query returned", events.length, "rows");
//     console.log("[Events API] Cache strategy applied (Accelerate should cache this)");
//     return NextResponse.json(events, {
//       headers: {
//         "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
//       },
//     });
//   } catch (err) {
//     console.error("Public Events API Error:", err);
//     return NextResponse.json([], { status: 200 });
//   } 

  
// }











import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// NO export const revalidate — API routes should NEVER have this (causes quota burn)
// We use Cache-Control + Prisma Accelerate caching instead

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