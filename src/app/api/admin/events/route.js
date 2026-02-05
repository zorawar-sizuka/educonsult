// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';  
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 


// // 'force-dynamic' ensures we always get the latest CMS data
// export const dynamic = 'force-dynamic';


// //GET REQUEST //
// export async function GET(req) { 
//   const session = await getServerSession(authOptions);
// if (!session) {
//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// }
//   try {
//     const { searchParams } = new URL(req.url);
//     const monthName = searchParams.get('month'); // e.g., "January"
    
//     // --- 1. BUILD DATE FILTER (Optional Server-Side Optimization) ---
//     // If a month is provided, we only fetch events for that specific window.
//     // This makes specific month views instant even if you have 1000s of events.
//     let dateFilter = {};
    
//     if (monthName && monthName !== "All Months") {
//       const currentYear = new Date().getFullYear();
//       const monthIndex = new Date(`${monthName} 1, ${currentYear}`).getMonth();
      
//       // Start of month
//       const startDate = new Date(currentYear, monthIndex, 1);
//       // End of month
//       const endDate = new Date(currentYear, monthIndex + 1, 0, 23, 59, 59);

//       dateFilter = {
//         date: {
//           gte: startDate,
//           lte: endDate,
//         },
//       };
//     }

//     // --- 2. OPTIMIZED DB QUERY ---
//     const events = await prisma.event.findMany({
//       where: dateFilter,
//       orderBy: { date: 'asc' },
//       // SELECT: We explicitly choose fields. 
//       // If 'longDescription' is massive, removing it here and fetching it 
//       // only on the single-event page would make the list 10x faster.
//       // For now, I included it, but consider removing it if the list gets slow.
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
//       }
//     });

//     return NextResponse.json(events);
//   } catch (error) {
//     console.error("GET Events Error:", error);
//     return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
//   }
// }

// // POST REQUEST
// export async function POST(req) { 
//   const session = await getServerSession(authOptions);
// if (!session) {
//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// }
//   try {
//     const body = await req.json();
    
//     // Basic validation
//     if (!body.title || !body.date) {
//       return NextResponse.json({ error: "Title and Date are required" }, { status: 400 });
//     }

//     const newEvent = await prisma.event.create({
//       data: {
//         title: body.title,
//         category: body.category || "General",
//         date: new Date(body.date), // Ensure date is stored as DateTime object
//         time: body.time,
//         location: body.location,
//         description: body.description,
//         longDescription: body.longDescription,
//         imageUrl: body.imageUrl,
//       },
//     });
    
//     return NextResponse.json(newEvent, { status: 201 });
//   } catch (error) {
//     console.error("POST Event Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // DELETE REQUEST
// export async function DELETE(req) { 
//   const session = await getServerSession(authOptions);
// if (!session) {
//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// }
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get('id');

//     if (!id) {
//         return NextResponse.json({ error: "ID required" }, { status: 400 });
//     }

//     await prisma.event.delete({ 
//         where: { id: Number(id) } 
//     });
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE Event Error:", error);
//     return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
//   }
// } 

// // PUT REQUEST
// export async function PUT(req) { 
//   const session = await getServerSession(authOptions);
// if (!session) {
//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// }
//   try {
//     const body = await req.json();
//     const { id, ...updateData } = body; // id is separate for where clause

//     if (!id) {
//       return NextResponse.json({ error: 'ID required for update' }, { status: 400 });
//     }

//     // Ensure date is parsed if provided
//     if (updateData.date) {
//       updateData.date = new Date(updateData.date);
//     }

//     const updatedEvent = await prisma.event.update({
//       where: { id: Number(id) },
//       data: updateData,
//     });

//     return NextResponse.json(updatedEvent, { status: 200 });
//   } catch (error) {
//     console.error('PUT Event Error:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }











// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
// import { revalidateTag } from "next/cache";

// export const dynamic = "force-dynamic";

// async function requireAdmin(req) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user) {
//     return { ok: false, res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
//   }

//   if (session.user.role !== "ADMIN") {
//     return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
//   }

//   return { ok: true, session };
// }

// // GET
// export async function GET(req) {
//   const guard = await requireAdmin(req);
//   if (!guard.ok) return guard.res;

//   try {
//     const { searchParams } = new URL(req.url);
//     const monthName = searchParams.get("month");

//     let dateFilter = {};

//     if (monthName && monthName !== "All Months") {
//       const currentYear = new Date().getFullYear();
//       const monthIndex = new Date(`${monthName} 1, ${currentYear}`).getMonth();

//       const startDate = new Date(currentYear, monthIndex, 1);
//       const endDate = new Date(currentYear, monthIndex + 1, 0, 23, 59, 59);

//       dateFilter = {
//         date: { gte: startDate, lte: endDate },
//       };
//     }

//     const events = await prisma.event.findMany({
//       where: dateFilter,
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

//     return NextResponse.json(events);
//   } catch (error) {
//     console.error("GET Events Error:", error);
//     return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
//   }
// }

// // POST
// export async function POST(req) {
//   const guard = await requireAdmin(req);
//   if (!guard.ok) return guard.res;

//   try {
//     const body = await req.json();

//     if (!body.title || !body.date) {
//       return NextResponse.json({ error: "Title and Date are required" }, { status: 400 });
//     }

//     const newEvent = await prisma.event.create({
//       data: {
//         title: body.title,
//         category: body.category || "General",
//         date: new Date(body.date),
//         time: body.time,
//         location: body.location,
//         description: body.description,
//         longDescription: body.longDescription,
//         imageUrl: body.imageUrl, 
//         isPublished: Boolean(body.isPublished),

//       },
//     });

//     return NextResponse.json(newEvent, { status: 201 });
//   } catch (error) {
//     console.error("POST Event Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // DELETE
// export async function DELETE(req) {
//   const guard = await requireAdmin(req);
//   if (!guard.ok) return guard.res;

//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

//     await prisma.event.delete({ where: { id: Number(id) } });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE Event Error:", error);
//     return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
//   }
// }

// // PUT
// export async function PUT(req) {
//   const guard = await requireAdmin(req);
//   if (!guard.ok) return guard.res;

//   try {
//     const body = await req.json();
//     const { id, ...updateData } = body;

//     if (!id) {
//       return NextResponse.json({ error: "ID required for update" }, { status: 400 });
//     }

//     if (updateData.date) updateData.date = new Date(updateData.date); 

//     if (typeof updateData.isPublished !== "undefined") {
//       updateData.isPublished = Boolean(updateData.isPublished);
//     }
    

//     const updatedEvent = await prisma.event.update({
//       where: { id: Number(id) },
//       data: updateData, 
      
//     });

//     return NextResponse.json(updatedEvent, { status: 200 });
//   } catch (error) {
//     console.error("PUT Event Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }






// api/events/route.js (admin CRUD) — Updated with minor best practices
// No cacheStrategy needed on writes (they auto-invalidate Accelerate cache)
// Optional cacheStrategy on GET if you want admin list cached globally (safe since no per-user data)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export const dynamic = "force-dynamic";

async function requireAdmin(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { ok: false, res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  if (session.user.role !== "ADMIN") {
    return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { ok: true, session };
}

// GET — Admin full list
export async function GET(req) {
  const guard = await requireAdmin(req);
  if (!guard.ok) return guard.res;

  try {
    const { searchParams } = new URL(req.url);
    const monthName = searchParams.get("month");

    let dateFilter = {};

    if (monthName && monthName !== "All Months") {
      const currentYear = new Date().getFullYear();
      const monthIndex = new Date(`${monthName} 1, ${currentYear}`).getMonth();

      const startDate = new Date(currentYear, monthIndex, 1);
      const endDate = new Date(currentYear, monthIndex + 1, 0, 23, 59, 59);

      dateFilter = {
        date: { gte: startDate, lte: endDate },
      };
    }

    const events = await prisma.event.findMany({
      where: dateFilter,
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
      // Optional: Cache admin list globally (safe — no user-specific data)
      // Accelerate will cache across all admin requests worldwide
      // cacheStrategy: { ttl: 60, swr: 300 }, // 1 min cache + 5 min stale
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("GET Events Error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// POST / CREATE
export async function POST(req) {
  const guard = await requireAdmin(req);
  if (!guard.ok) return guard.res;

  try {
    const body = await req.json();

    if (!body.title || !body.date) {
      return NextResponse.json({ error: "Title and Date are required" }, { status: 400 });
    }

    const newEvent = await prisma.event.create({
      data: {
        title: body.title,
        category: body.category || "General",
        date: new Date(body.date),
        time: body.time,
        location: body.location,
        description: body.description,
        longDescription: body.longDescription,
        imageUrl: body.imageUrl, 
        isPublished: Boolean(body.isPublished),
      },
    });
    revalidatePath('/events'); // Revalidates the public events page on-demand
    // Write auto-invalidates any cached reads (public + admin GET)
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("POST Event Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req) {
  const guard = await requireAdmin(req);
  if (!guard.ok) return guard.res;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.event.delete({ where: { id: Number(id) } });
    revalidatePath('/events'); // Revalidates the public events page on-demand
    // Delete auto-invalidates cached reads
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Event Error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

// PUT / UPDATE
export async function PUT(req) {
  const guard = await requireAdmin(req);
  if (!guard.ok) return guard.res;

  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required for update" }, { status: 400 });
    }

    if (updateData.date) updateData.date = new Date(updateData.date); 

    if (typeof updateData.isPublished !== "undefined") {
      updateData.isPublished = Boolean(updateData.isPublished);
    }

    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: updateData, 
    });
    revalidatePath('/events'); // Revalidates the public events page on-demand
    // Update auto-invalidates cached reads
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("PUT Event Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } 
  revalidatePath('/events'); // Revalidates the public events page on-demand
} 









