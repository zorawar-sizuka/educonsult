// // app/events/page.jsx  (or rename to EventsGridServer.jsx if you prefer)
// import EventsGridClient from "./EventsgridClient";

// const siteUrl =
//   process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

// // Recommended: 30-minute revalidation — safe, fast, low quota burn
// export const revalidate = 1800; // 30 minutes

// // Optional: uncomment for zero automatic writes (only admin-triggered)
// // export const dynamic = 'force-static';

// async function getEvents() {
//   try {
//     const res = await fetch(`${siteUrl}/api/events`, {
//       next: { revalidate: 1800 }, // matches page-level
//       // OR for zero writes + only on-demand:
//       // cache: 'force-cache',
//     });

//     if (!res.ok) {
//       console.error("Events API failed:", res.status);
//       return [];
//     }

//     const data = await res.json();
//     return Array.isArray(data) ? data : [];
//   } catch (err) {
//     console.error("Events fetch error:", err);
//     return [];
//   }
// }

// export default async function EventsGridServer() {
//   const events = await getEvents();
//   return <EventsGridClient initialEvents={events} />;
// } 








// import EventsGridClient from "./EventsgridClient";

// const siteUrl =
//   process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

// async function getEvents() {
//   try {
//     const res = await fetch(`${siteUrl}/api/events`, {
//       next: { revalidate: 1800 }, // 30 min
//     });

//     if (!res.ok) return [];
//     const data = await res.json();
//     return Array.isArray(data) ? data : [];
//   } catch {
//     return [];
//   }
// }

// export default async function EventsGridServer() {
//   const events = await getEvents();
//   console.log("[EventsGridServer] events length =", events.length);
//   return <EventsGridClient initialEvents={events} />;
// }





// app/events/components/Eventsgrid.server.jsx
import { prisma } from "@/lib/prisma";
import EventsGridClient from "./EventsgridClient";

export const revalidate = 1800;

export default async function EventsGridServer() {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { date: "asc" },
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
    },
  });

  console.log("[EventsGridServer] prisma events =", events.length);
  return <EventsGridClient initialEvents={events} />;
}
