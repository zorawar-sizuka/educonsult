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

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

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

// // GET — Admin full list
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
//       // Optional: Cache admin list globally (safe — no user-specific data)
//       // Accelerate will cache across all admin requests worldwide
//       // cacheStrategy: { ttl: 60, swr: 300 }, // 1 min cache + 5 min stale
//     });

//     return NextResponse.json(events);
//   } catch (error) {
//     console.error("GET Events Error:", error);
//     return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
//   }
// }

// // POST / CREATE
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
//     revalidatePath('/events'); // Revalidates the public events page on-demand
//     // Write auto-invalidates any cached reads (public + admin GET)
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
//     revalidatePath('/events'); // Revalidates the public events page on-demand
//     // Delete auto-invalidates cached reads
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE Event Error:", error);
//     return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
//   }
// }

// // PUT / UPDATE
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
//     revalidatePath('/events'); // Revalidates the public events page on-demand
//     // Update auto-invalidates cached reads
//     return NextResponse.json(updatedEvent, { status: 200 });
//   } catch (error) {
//     console.error("PUT Event Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   } 
//   revalidatePath('/events'); // Revalidates the public events page on-demand
// } 
















// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { revalidatePath } from "next/cache";

// export const dynamic = "force-dynamic";

// // ---------- helpers ----------
// async function requireAdmin() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user) {
//     return { ok: false, res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
//   }
//   if (session.user.role !== "ADMIN") {
//     return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
//   }

//   return { ok: true, session };
// }

// function jsonError(message, status = 400) {
//   return NextResponse.json({ error: message }, { status });
// }

// function safeString(v, max = 240) {
//   if (typeof v !== "string") return "";
//   return v.trim().slice(0, max);
// }

// function parseId(raw) {
//   const n = Number(raw);
//   if (!Number.isInteger(n) || n <= 0) return null;
//   return n;
// }

// function parseMonthWindow(monthName) {
//   if (!monthName || monthName === "All Months") return null;

//   const allowed = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December",
//   ];
//   if (!allowed.includes(monthName)) return null;

//   const year = new Date().getFullYear();
//   const monthIndex = allowed.indexOf(monthName);

//   // local dates (works fine for Kathmandu usage)
//   const start = new Date(year, monthIndex, 1, 0, 0, 0, 0);
//   const end = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);

//   return { start, end };
// }
// function slugify(input) {
//   return String(input || "")
//     .toLowerCase()
//     .trim()
//     .replace(/['"]/g, "")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// }

// async function uniqueSlugForTitle(title) {
//   const base = slugify(title) || "event";
//   let slug = base;

//   // try base, base-2, base-3 ...
//   for (let i = 1; i < 1000; i++) {
//     const exists = await prisma.event.findUnique({ where: { slug } });
//     if (!exists) return slug;
//     slug = `${base}-${i + 1}`;
//   }
//   // last resort
//   return `${base}-${Date.now()}`;
// }

// const EVENT_SELECT = {
//   id: true,
//   title: true,
//   category: true,
//   date: true,
//   time: true,
//   location: true,
//   description: true,
//   longDescription: true,
//   imageUrl: true,
//   isPublished: true,
//   createdAt: true,
// };

// // ---------- handlers ----------

// // GET — Admin full list (optionally filtered by month)
// export async function GET(req) {
//   const guard = await requireAdmin();
//   if (!guard.ok) return guard.res;

//   try {
//     const { searchParams } = new URL(req.url);
//     const monthName = searchParams.get("month");

//     const window = parseMonthWindow(monthName);
//     const where = window
//       ? { date: { gte: window.start, lte: window.end } }
//       : {};

//     const events = await prisma.event.findMany({
//       where,
//       orderBy: { date: "asc" },
//       select: EVENT_SELECT,
//     });

//     return NextResponse.json(events);
//   } catch (error) {
//     console.error("GET /api/admin/events Error:", error);
//     return jsonError("Failed to fetch events", 500);
//   }
// }

// // POST POST POST 
// export async function POST(req) {
//   const guard = await requireAdmin(req);
//   if (!guard.ok) return guard.res;

//   try {
//     const body = await req.json();

//     const title = String(body.title || "").trim();
//     const category = String(body.category || "General").trim();
//     const time = String(body.time || "").trim();
//     const location = String(body.location || "").trim();
//     const description = String(body.description || "").trim();
//     const longDescription = body.longDescription ?? null;
//     const imageUrl = body.imageUrl ?? null;
//     const isPublished = Boolean(body.isPublished);

//     if (!title || !body.date) {
//       return NextResponse.json({ error: "Title and Date are required" }, { status: 400 });
//     }

//     const date = new Date(body.date);
//     if (Number.isNaN(date.getTime())) {
//       return NextResponse.json({ error: "Invalid date" }, { status: 400 });
//     }

//     // ✅ generate slug server-side
//     const slug = await uniqueSlugForTitle(title);

//     const newEvent = await prisma.event.create({
//       data: {
//         title,
//         slug,
//         category,
//         date,
//         time,
//         location,
//         description,
//         longDescription,
//         imageUrl,
//         isPublished,
//       },
//       select: {
//         id: true,
//         title: true,
//         slug: true,
//         category: true,
//         date: true,
//         time: true,
//         location: true,
//         description: true,
//         longDescription: true,
//         imageUrl: true,
//         isPublished: true,
//         createdAt: true,
//       },
//     });

//     return NextResponse.json(newEvent, { status: 201 });
//   } catch (error) {
//     console.error("POST Event Error:", error);
//     return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
//   }
// }


// // DELETE — by query ?id=
// export async function DELETE(req) {
//   const guard = await requireAdmin();
//   if (!guard.ok) return guard.res;

//   try {
//     const { searchParams } = new URL(req.url);
//     const id = parseId(searchParams.get("id"));
//     if (!id) return jsonError("Valid ID required", 400);

//     await prisma.event.delete({ where: { id } });

//     revalidatePath("/events");

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE /api/admin/events Error:", error);

//     // Prisma "record not found" safety
//     if (error?.code === "P2025") return jsonError("Event not found", 404);

//     return jsonError("Failed to delete event", 500);
//   }
// }

// // PUT — Update (expects JSON body with id)
// export async function PUT(req) {
//   const guard = await requireAdmin();
//   if (!guard.ok) return guard.res;

//   try {
//     const body = await req.json().catch(() => null);
//     if (!body) return jsonError("Invalid JSON body", 400);

//     const id = parseId(body.id);
//     if (!id) return jsonError("Valid ID required for update", 400);

//     const updateData = {};

//     if (typeof body.title === "string") {
//       const t = safeString(body.title, 140);
//       if (!t) return jsonError("Title cannot be empty", 400);
//       updateData.title = t;
//     }
//     if (typeof body.category === "string") updateData.category = safeString(body.category, 60) || "General";
//     if (typeof body.time === "string") updateData.time = safeString(body.time, 60);
//     if (typeof body.location === "string") updateData.location = safeString(body.location, 140);
//     if (typeof body.description === "string") updateData.description = safeString(body.description, 500);

//     if (typeof body.longDescription !== "undefined") {
//       updateData.longDescription = typeof body.longDescription === "string" ? body.longDescription.trim() : null;
//     }
//     if (typeof body.imageUrl !== "undefined") {
//       updateData.imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : null;
//     }
//     if (typeof body.isPublished !== "undefined") {
//       updateData.isPublished = Boolean(body.isPublished);
//     }
//     if (typeof body.date !== "undefined") {
//       const d = new Date(body.date);
//       if (Number.isNaN(d.getTime())) return jsonError("Invalid date", 400);
//       updateData.date = d;
//     }

//     if (Object.keys(updateData).length === 0) {
//       return jsonError("No valid fields to update", 400);
//     }

//     const updatedEvent = await prisma.event.update({
//       where: { id },
//       data: updateData,
//       select: EVENT_SELECT,
//     });

//     revalidatePath("/events");

//     return NextResponse.json(updatedEvent, { status: 200 });
//   } catch (error) {
//     console.error("PUT /api/admin/events Error:", error);

//     if (error?.code === "P2025") return jsonError("Event not found", 404);

//     return jsonError("Failed to update event", 500);
//   }
// }
















// app/api/admin/events/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob"; // Vercel Blob

export const dynamic = "force-dynamic";

// ── Helpers ──
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { ok: false, res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  if (session.user.role !== "ADMIN") {
    return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { ok: true, session };
}

function jsonError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function safeString(v, max = 240) {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function parseId(raw) {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function parseMonthWindow(monthName) {
  if (!monthName || monthName === "All Months") return null;

  const allowed = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!allowed.includes(monthName)) return null;

  const year = new Date().getFullYear();
  const monthIndex = allowed.indexOf(monthName);

  const start = new Date(year, monthIndex, 1, 0, 0, 0);
  const end = new Date(year, monthIndex + 1, 0, 23, 59, 59);

  return { start, end };
}

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlugForTitle(title) {
  const base = slugify(title) || "event";
  let slug = base;

  for (let i = 1; i < 1000; i++) {
    const exists = await prisma.event.findUnique({ where: { slug } });
    if (!exists) return slug;
    slug = `${base}-${i + 1}`;
  }
  return `${base}-${Date.now()}`;
}

const EVENT_SELECT = {
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
};

// ── GET ── Admin full list (optional month filter)
export async function GET(req) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;

  try {
    const { searchParams } = new URL(req.url);
    const monthName = searchParams.get("month");

    const window = parseMonthWindow(monthName);
    const where = window ? { date: { gte: window.start, lte: window.end } } : {};

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: "asc" },
      select: EVENT_SELECT,
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/admin/events Error:", error);
    return jsonError("Failed to fetch events", 500);
  }
}

// ── POST ── Create new event (supports image upload via multipart/form-data)
export async function POST(req) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;

  try {
    const contentType = req.headers.get("content-type") || "";
    let body;

    // Support both JSON and multipart/form-data (for file upload)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());

      // Handle file upload if present
      const file = formData.get("image");
      if (file && file.size > 0) {
        if (!file.type?.startsWith("image/")) {
          return jsonError("Only image files allowed", 400);
        }

        const ext = file.name.split(".").pop() || "jpg";
        const filename = `${crypto.randomUUID()}.${ext}`;

        const blob = await put(filename, file, {
          access: "public",
        });

        body.imageUrl = blob.url; // Permanent Vercel Blob URL
      }
    } else {
      body = await req.json();
    }

    const title = safeString(body.title, 140);
    if (!title || !body.date) {
      return jsonError("Title and Date are required", 400);
    }

    const date = new Date(body.date);
    if (Number.isNaN(date.getTime())) {
      return jsonError("Invalid date", 400);
    }

    const slug = await uniqueSlugForTitle(title);

    const newEvent = await prisma.event.create({
      data: {
        title,
        slug,
        category: safeString(body.category, 60) || "General",
        date,
        time: safeString(body.time, 60),
        location: safeString(body.location, 140),
        description: safeString(body.description, 500),
        longDescription: body.longDescription ? String(body.longDescription).trim() : null,
        imageUrl: body.imageUrl || null,
        isPublished: Boolean(body.isPublished),
      },
      select: EVENT_SELECT,
    });

    revalidatePath("/events");

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/events Error:", error);
    return jsonError("Failed to create event", 500);
  }
}

// ── DELETE ── by ?id=
export async function DELETE(req) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;

  try {
    const { searchParams } = new URL(req.url);
    const id = parseId(searchParams.get("id"));
    if (!id) return jsonError("Valid ID required", 400);

    await prisma.event.delete({ where: { id } });

    revalidatePath("/events");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/events Error:", error);
    if (error?.code === "P2025") return jsonError("Event not found", 404);
    return jsonError("Failed to delete event", 500);
  }
}

// ── PUT ── Update event (supports JSON or multipart for image)
export async function PUT(req) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.res;

  try {
    const contentType = req.headers.get("content-type") || "";
    let body;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());

      const file = formData.get("image");
      if (file && file.size > 0) {
        if (!file.type?.startsWith("image/")) {
          return jsonError("Only image files allowed", 400);
        }

        const ext = file.name.split(".").pop() || "jpg";
        const filename = `${crypto.randomUUID()}.${ext}`;

        const blob = await put(filename, file, {
          access: "public",
        });

        body.imageUrl = blob.url;
      }
    } else {
      body = await req.json();
    }

    const id = parseId(body.id);
    if (!id) return jsonError("Valid ID required for update", 400);

    const updateData = {};

    if (typeof body.title === "string") {
      const t = safeString(body.title, 140);
      if (!t) return jsonError("Title cannot be empty", 400);
      updateData.title = t;
    }
    if (typeof body.category === "string") updateData.category = safeString(body.category, 60) || "General";
    if (typeof body.time === "string") updateData.time = safeString(body.time, 60);
    if (typeof body.location === "string") updateData.location = safeString(body.location, 140);
    if (typeof body.description === "string") updateData.description = safeString(body.description, 500);

    if (typeof body.longDescription !== "undefined") {
      updateData.longDescription = typeof body.longDescription === "string" ? body.longDescription.trim() : null;
    }
    if (typeof body.imageUrl !== "undefined") {
      updateData.imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : null;
    }
    if (typeof body.isPublished !== "undefined") {
      updateData.isPublished = Boolean(body.isPublished);
    }
    if (typeof body.date !== "undefined") {
      const d = new Date(body.date);
      if (Number.isNaN(d.getTime())) return jsonError("Invalid date", 400);
      updateData.date = d;
    }

    if (Object.keys(updateData).length === 0) {
      return jsonError("No valid fields to update", 400);
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: updateData,
      select: EVENT_SELECT,
    });

    revalidatePath("/events");

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("PUT /api/admin/events Error:", error);
    if (error?.code === "P2025") return jsonError("Event not found", 404);
    return jsonError("Failed to update event", 500);
  }
}