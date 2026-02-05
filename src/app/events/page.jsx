// import EventsClient from "./EventsClient";

// const siteUrl =
//   process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

// // ✅ Strong SEO targeting (but not spammy)
// export const metadata = {
//   title: "Education Events in Kathmandu | Seminars, Workshops & Info Sessions",
//   description:
//     "Explore upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and study abroad info events. Register interest and stay updated.",
//   alternates: { canonical: "/events" },
//   openGraph: {
//     title: "Education Events in Kathmandu | Seminars, Workshops & Info Sessions",
//     description:
//       "Upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and more.",
//     url: `${siteUrl}/events`,
//     images: [{ url: "/ogs/og.png", width: 1200, height: 630, alt: "Events in Kathmandu" }],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Events in Kathmandu",
//     description:
//       "Upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and more.",
//     images: ["/ogs/og.png"],
//   },
// };

// async function getEvents() {
//   // Server-side fetch: uses your existing API
//   // IMPORTANT: if this endpoint is protected, expose a public-safe list endpoint.
//   try {
//     const res = await fetch(`${siteUrl}/api/events`, {
//       // Revalidate to keep SEO page fresh without constant rebuild
//       next: { revalidate: 300 }, // 5 minutes
//     });
//     if (!res.ok) return [];
//     const data = await res.json();
//     return Array.isArray(data) ? data : [];
//   } catch {
//     return [];
//   }
// }

// export default async function EventsPage() {
//   const initialEvents = await getEvents();

//   // ✅ Schema: ItemList of Events (Google-friendly)
//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "ItemList",
//     name: "Events in Kathmandu",
//     itemListElement: initialEvents
//       .filter((e) => e?.title && e?.date)
//       .slice(0, 30)
//       .map((event, idx) => ({
//         "@type": "ListItem",
//         position: idx + 1,
//         item: {
//           "@type": "Event",
//           name: event.title,
//           startDate: new Date(event.date).toISOString(),
//           eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
//           eventStatus: "https://schema.org/EventScheduled",
//           location: {
//             "@type": "Place",
//             name: event.location || "Kathmandu",
//             address: {
//               "@type": "44600",
//               addressLocality: "Kathmandu",
//               addressCountry: "NP",
//             },
//           },
//           image: event.imageUrl ? [event.imageUrl] : [`${siteUrl}/events/event.png`],
//           description: event.description || "Upcoming event in Kathmandu.",
//           url: `${siteUrl}/events`,
//         },
//       })),
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <EventsClient initialEvents={initialEvents} />
//     </>
//   );
// }








// import EventsClient from "./EventsClient";

// export const dynamic = "force-dynamic"; // ✅ kills ISR fallback generation

// const siteUrl =
//   process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

// export const metadata = {
//   title: "Education Events in Kathmandu | Seminars, Workshops & Info Sessions",
//   description:
//     "Explore upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and study abroad info events. Register interest and stay updated.",
//   alternates: { canonical: "/events" },
//   openGraph: {
//     title: "Education Events in Kathmandu | Seminars, Workshops & Info Sessions",
//     description:
//       "Upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and more.",
//     url: `${siteUrl}/events`,
//     images: [{ url: "/ogs/og.png", width: 1200, height: 630, alt: "Events in Kathmandu" }],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Events in Kathmandu",
//     description:
//       "Upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and more.",
//     images: ["/ogs/og.png"],
//   },
// };

// async function getEvents() {
//   try {
//     // ✅ no-store ensures no ISR caching and avoids huge ISR artifacts
//     const res = await fetch(`${siteUrl}/api/events`, { cache: "no-store" });
//     if (!res.ok) return [];
//     const data = await res.json();
//     return Array.isArray(data) ? data : [];
//   } catch {
//     return [];
//   }
// }

// export default async function EventsPage() {
//   const initialEvents = await getEvents();

//   // ✅ Keep schema light (don’t dump the entire DB into HTML)
//   const schemaEvents = initialEvents
//     .filter((e) => e?.title && e?.date)
//     .slice(0, 10); // was 30; reduce further to keep HTML small

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "ItemList",
//     name: "Education Events in Kathmandu",
//     itemListElement: schemaEvents.map((event, idx) => ({
//       "@type": "ListItem",
//       position: idx + 1,
//       item: {
//         "@type": "Event",
//         name: event.title,
//         startDate: new Date(event.date).toISOString(),
//         eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
//         eventStatus: "https://schema.org/EventScheduled",
//         location: {
//           "@type": "Place",
//           name: event.location || "Kathmandu",
//           address: {
//             "@type": "PostalAddress", // ✅ FIXED
//             postalCode: "44600",
//             addressLocality: "Kathmandu",
//             addressCountry: "NP",
//           },
//         },
//         // ✅ NEVER embed base64 images in schema; use fallback
//         image: [`${siteUrl}/events/event.png`],
//         description: event.description || "Upcoming education event in Kathmandu.",
//         url: `${siteUrl}/events`,
//       },
//     })),
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <EventsClient initialEvents={initialEvents} />
//     </>
//   );
// }











// import EventsHero from "./EventsHero";
// import EventsGridServer from "./Eventsgrid.server";

// export const dynamic = "force-dynamic"; // safest + fastest UX

// export const metadata = {
//   title: "Education Events in Kathmandu | Seminars & Workshops",
//   description:
//     "Explore upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and study abroad info events.",
//   alternates: { canonical: "/events" },
// };

// export default function EventsPage() {
//   return (
//     <>
//       <EventsHero />   {/* renders instantly */}
//       <EventsGridServer />   {/* streams in below */}
//     </>
//   );
// }



import { Suspense } from "react";
import EventsHero from "./EventsHero";
import EventsGridServer from "./Eventsgrid.server";
import EventsGridSkeleton from "./EventsSkeleton"; // your skeleton UI
import NewsletterCTA from "./NewsLetter";

export default function EventsPage() {
  return (
    <>
      <EventsHero /> {/* renders instantly */}

      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGridServer /> {/* streams in below */}
      </Suspense> 
    
        {/* Newsletter */}
        <div className="my-16 sm:my-20 lg:my-24 ">
        <NewsletterCTA />
      </div>
    </>
  );
}
