// import Link from "next/link";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { prisma } from "@/lib/prisma";

// export const revalidate = 1800; // 30 min ISR for the page

// function resolveEventImage(url) {
//   if (!url) return "/events/event.png";
//   if (url.startsWith("data:image/")) return url; // old base64 rows
//   if (url.startsWith("http://") || url.startsWith("https://")) return url;
//   if (url.startsWith("/")) return url; // /uploads/... etc
//   return "/events/event.png";
// }

// async function getEventBySlug(slug) {
//   if (!slug || typeof slug !== "string") return null;

//   try {
//     return await prisma.event.findFirst({
//       where: { slug, isPublished: true },
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
//   } catch (e) {
//     console.error("[EventDetailPage] prisma error:", e);
//     return null;
//   }
// }

// // ✅ Next 15+ params can be Promise in generateMetadata too
// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   const event = await getEventBySlug(slug);

//   if (!event) {
//     return {
//       title: "Event not found | Events in Kathmandu",
//       description: "This event doesn’t exist or is not published.",
//       alternates: { canonical: "/events" },
//       robots: { index: false, follow: false },
//     };
//   }

//   const title = `${event.title} | Events in Kathmandu`;
//   const desc =
//     event.description ||
//     "Explore education seminars, workshops and info sessions in Kathmandu.";

//   const img = resolveEventImage(event.imageUrl);

//   // For OG we want absolute if possible; if not, skip absolute building in dev.
//   // (Next will still render fine)
//   const siteUrl =
//     process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";

//   const ogImage =
//     img.startsWith("http") || img.startsWith("data:image/")
//       ? img
//       : siteUrl
//       ? `${siteUrl}${img}`
//       : img;

//   return {
//     title,
//     description: desc,
//     alternates: { canonical: `/events/${event.slug}` },
//     openGraph: {
//       title,
//       description: desc,
//       url: siteUrl ? `${siteUrl}/events/${event.slug}` : undefined,
//       images: [{ url: ogImage, width: 1200, height: 630, alt: event.title }],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description: desc,
//       images: [ogImage],
//     },
//   };
// }

// export default async function EventDetailPage({ params }) {
//   const { slug } = await params;

//   const event = await getEventBySlug(slug);
//   if (!event) return notFound();

//   const img = resolveEventImage(event.imageUrl);

//   const siteUrl =
//     process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";

//   const schemaImage =
//     img.startsWith("http") || img.startsWith("data:image/")
//       ? img
//       : siteUrl
//       ? `${siteUrl}${img}`
//       : img;

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "Event",
//     name: event.title,
//     startDate: new Date(event.date).toISOString(),
//     eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
//     eventStatus: "https://schema.org/EventScheduled",
//     location: {
//       "@type": "Place",
//       name: event.location || "Kathmandu",
//       address: {
//         "@type": "PostalAddress",
//         postalCode: "44600",
//         addressLocality: "Kathmandu",
//         addressCountry: "NP",
//       },
//     },
//     image: [schemaImage],
//     description: event.description || "Upcoming education event in Kathmandu.",
//     url: siteUrl ? `${siteUrl}/events/${event.slug}` : undefined,
//   };

//   const isDataUrl = img.startsWith("data:image/");

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />

//       <main className="bg-white pt-32">
//         <div className="max-w-5xl mx-auto px-6 ">
//           <Link
//             href="/events"
//             className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900"
//           >
//             ← Back to Events
//           </Link>
//         </div>

//         <section className="max-w-5xl mx-auto px-6 pt-6 pb-12">
//           <div className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200">
//             <Image
//               src={img}
//               alt={event.title}
//               fill
//               priority
//               sizes="(min-width: 1024px) 1024px, 100vw"
//               className="object-cover"
//               unoptimized={isDataUrl} // ✅ important for base64 data URLs
//             />
       

//             <div className="absolute bottom-6 left-6 right-6">
//               <div className="flex flex-wrap items-center gap-3 mb-4">
//                 <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-600 text-white">
//                   {event.category || "Event"}
//                 </span>
//               </div>

//               <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 leading-tight">
//                 {event.title}
//               </h1>

//               <p className="mt-3 text-slate-700 max-w-2xl">
//                 {event.description}
//               </p>
//             </div>
//           </div>

//           <div className="mt-10 grid gap-6 sm:grid-cols-2">
//             <div className="rounded-2xl border border-slate-200 p-6">
//               <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
//                 Date
//               </div>
//               <div className="text-lg font-semibold text-slate-900">
//                 {new Date(event.date).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </div>
//               <div className="text-slate-500 mt-1">{event.time}</div>
//             </div>

//             <div className="rounded-2xl border border-slate-200 p-6">
//               <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
//                 Location
//               </div>
//               <div className="text-lg font-semibold text-slate-900">
//                 {event.location || "Kathmandu"}
//               </div>
//               <div className="text-slate-500 mt-1">Nepal</div>
//             </div>
//           </div>

//           <div className="mt-10 rounded-2xl border border-slate-200 p-6 sm:p-8">
//             <div className="prose prose-slate max-w-none">
//               <h2 className="font-serif">About this event</h2>
//               <p>{event.longDescription || "More details will be announced soon."}</p>
//             </div>

//             <div className="mt-8 flex flex-col sm:flex-row gap-3">
//               <Link
//                 href="/events"
//                 className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition"
//               >
//                 Explore more events
//               </Link>
//               <Link
//                 href="/contact"
//                 className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition"
//               >
//                 Ask about this event
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }






// import Link from "next/link";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { prisma } from "@/lib/prisma";

// // Revalidate every 30 minutes
// export const revalidate = 1800;

// function resolveEventImage(url) {
//   if (!url) return "/events/event.png";
//   if (url.startsWith("data:image/")) return url;
//   if (url.startsWith("http://") || url.startsWith("https://")) return url;
//   if (url.startsWith("/")) return url;
//   return "/events/event.png";
// }

// async function getEventBySlug(slug) {
//   if (!slug || typeof slug !== "string") return null;

//   try {
//     return await prisma.event.findFirst({
//       where: { slug, isPublished: true },
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
//   } catch (e) {
//     console.error("[EventDetailPage] prisma error:", e);
//     return null;
//   }
// }

// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   const event = await getEventBySlug(slug);

//   if (!event) {
//     return {
//       title: "Event not found | Events in Kathmandu",
//       description: "This event doesn’t exist or is not published.",
//       alternates: { canonical: "/events" },
//       robots: { index: false, follow: false },
//     };
//   }

//   const title = `${event.title} | Events in Kathmandu`;
//   const desc =
//     event.description ||
//     "Explore education seminars, workshops and info sessions in Kathmandu.";

//   const img = resolveEventImage(event.imageUrl);
//   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
//   const ogImage =
//     img.startsWith("http") || img.startsWith("data:image/")
//       ? img
//       : siteUrl
//       ? `${siteUrl}${img}`
//       : img;

//   return {
//     title,
//     description: desc,
//     alternates: { canonical: `/events/${event.slug}` },
//     openGraph: {
//       title,
//       description: desc,
//       url: siteUrl ? `${siteUrl}/events/${event.slug}` : undefined,
//       images: [{ url: ogImage, width: 1200, height: 630, alt: event.title }],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description: desc,
//       images: [ogImage],
//     },
//   };
// }

// export default async function EventDetailPage({ params }) {
//   const { slug } = await params;

//   const event = await getEventBySlug(slug);
//   if (!event) return notFound();

//   const img = resolveEventImage(event.imageUrl);
//   const isDataUrl = img.startsWith("data:image/");

//   // Schema.org JSON-LD
//   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
//   const schemaImage =
//     img.startsWith("http") || img.startsWith("data:image/")
//       ? img
//       : siteUrl
//       ? `${siteUrl}${img}`
//       : img;

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "Event",
//     name: event.title,
//     startDate: new Date(event.date).toISOString(),
//     eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
//     eventStatus: "https://schema.org/EventScheduled",
//     location: {
//       "@type": "Place",
//       name: event.location || "Kathmandu",
//       address: {
//         "@type": "PostalAddress",
//         postalCode: "44600",
//         addressLocality: "Kathmandu",
//         addressCountry: "NP",
//       },
//     },
//     image: [schemaImage],
//     description: event.description || "Upcoming education event in Kathmandu.",
//     url: siteUrl ? `${siteUrl}/events/${event.slug}` : undefined,
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />

//       <main className="bg-gray-50/50 pt-28 md:pt-32 min-h-screen">
//         <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
//           <Link
//             href="/events"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-[#3a56a4] hover:text-[#ef6925] transition-colors duration-200"
//           >
//             ← Back to Events
//           </Link>
//         </div>

//         <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 pb-16">
//           {/* Hero */}
//           <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-[#f8f9fc] to-[#eef2ff] border border-[#d8e0f5] shadow-sm">
//             <Image
//               src={img}
//               alt={event.title}
//               fill
//               priority
//               sizes="(min-width: 1024px) 1024px, 100vw"
//               className="object-cover"
//               unoptimized={isDataUrl}
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

//             <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
//               <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-5">
//                 <span className="px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider bg-[#f16825] text-white shadow-sm">
//                   {event.category || "Event"}
//                 </span>
//               </div>

//               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg">
//                 {event.title}
//               </h1>

//               <p className="mt-3 md:mt-4 text-base md:text-lg text-white/95 max-w-3xl font-medium">
//                 {event.description}
//               </p>
//             </div>
//           </div>

//           {/* Date & Location cards */}
//           <div className="mt-10 grid gap-6 sm:grid-cols-2">
//             <div className="rounded-2xl border border-[#d8e0f5] bg-white p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow">
//               <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3a56a4] mb-2">
//                 Date
//               </div>
//               <div className="text-xl md:text-2xl font-semibold text-[#1f2d4d]">
//                 {new Date(event.date).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </div>
//               <div className="text-[#6b7899] mt-1.5 text-base md:text-lg">{event.time}</div>
//             </div>

//             <div className="rounded-2xl border border-[#d8e0f5] bg-white p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow">
//               <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3a56a4] mb-2">
//                 Location
//               </div>
//               <div className="text-xl md:text-2xl font-semibold text-[#1f2d4d]">
//                 {event.location || "Kathmandu"}
//               </div>
//               <div className="text-[#6b7899] mt-1.5 text-base md:text-lg">Nepal</div>
//             </div>
//           </div>

//           {/* About + CTAs */}
//           <div className="mt-12 rounded-3xl border border-[#d8e0f5] bg-white p-6 md:p-10 shadow-sm">
//             <div className="prose prose-lg max-w-none prose-headings:text-[#1f2d4d] prose-p:text-[#3f4e7a]">
//               <h2 className="font-serif text-3xl md:text-4xl text-[#1f2d4d] mb-6">
//                 About this event
//               </h2>
//               <div className="text-[#3f4e7a] leading-relaxed">
//                 {event.longDescription || "More details will be announced soon."}
//               </div>
//             </div>

//             <div className="mt-10 flex flex-col sm:flex-row gap-4">
//               <Link
//                 href="/events"
//                 className="inline-flex justify-center items-center px-7 py-3.5 rounded-xl text-base md:text-lg font-semibold text-white bg-[#3a56a4] hover:bg-[#2f4688] focus:ring-2 focus:ring-[#3a56a4]/40 transition-all duration-200 shadow-sm hover:shadow"
//               >
//                 Explore more events
//               </Link>

//               <Link
//                 href="/contact"
//                 className="inline-flex justify-center items-center px-7 py-3.5 rounded-xl text-base md:text-lg font-semibold text-[white] bg-[#f16825]/90 hover:text-[#f16825] border border-[#d0dfff] hover:bg-[#dfe7ff] hover:border-[#c0d4ff] transition-all duration-200"
//               >
//                 Ask about this event
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }




import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventRegistrationTrigger from "../components/RegistrationTrigger"; // ← adjust path

// Revalidate every 30 minutes
export const revalidate = 1800;

function resolveEventImage(url) {
  if (!url) return "/events/event.png";
  if (url.startsWith("data:image/")) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return url;
  return "/events/event.png";
}

async function getEventBySlug(slug) {
  if (!slug || typeof slug !== "string") return null;

  try {
    return await prisma.event.findFirst({
      where: { slug, isPublished: true },
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
        createdAt: true,
      },
    });
  } catch (e) {
    console.error("[EventDetailPage] prisma error:", e);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event not found | Events in Kathmandu",
      description: "This event doesn’t exist or is not published.",
      alternates: { canonical: "/events" },
      robots: { index: false, follow: false },
    };
  }

  const title = `${event.title} | Events in Kathmandu`;
  const desc =
    event.description ||
    "Explore education seminars, workshops and info sessions in Kathmandu.";

  const img = resolveEventImage(event.imageUrl);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
  const ogImage =
    img.startsWith("http") || img.startsWith("data:image/")
      ? img
      : siteUrl
      ? `${siteUrl}${img}`
      : img;

  return {
    title,
    description: desc,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title,
      description: desc,
      url: siteUrl ? `${siteUrl}/events/${event.slug}` : undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;

  const event = await getEventBySlug(slug);
  if (!event) return notFound();

  const img = resolveEventImage(event.imageUrl);
  const isDataUrl = img.startsWith("data:image/");

  // Schema.org JSON-LD
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";
  const schemaImage =
    img.startsWith("http") || img.startsWith("data:image/")
      ? img
      : siteUrl
      ? `${siteUrl}${img}`
      : img;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: new Date(event.date).toISOString(),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location || "Kathmandu",
      address: {
        "@type": "PostalAddress",
        postalCode: "44600",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
    },
    image: [schemaImage],
    description: event.description || "Upcoming education event in Kathmandu.",
    url: siteUrl ? `${siteUrl}/events/${event.slug}` : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-gray-50/50 pt-28 md:pt-32 min-h-screen">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3a56a4] hover:text-[#ef6925] transition-colors duration-200"
          >
            ← Back to Events
          </Link>
        </div>

        <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 pb-16">
          {/* Hero */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-[#f8f9fc] to-[#eef2ff] border border-[#d8e0f5] shadow-sm">
            <Image
              src={img}
              alt={event.title}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              unoptimized={isDataUrl}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
              <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-5">
                <span className="px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider bg-[#ef6926] text-white shadow-sm">
                  {event.category || "Event"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                {event.title}
              </h1>

              <p className="mt-3 md:mt-4 text-base md:text-lg text-white/95 max-w-3xl font-medium">
                {event.description}
              </p>
            </div>
          </div>

          {/* Date & Location cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#d8e0f5] bg-white p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3a56a4] mb-2">
                Date
              </div>
              <div className="text-xl md:text-2xl font-semibold text-[#1f2d4d]">
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-[#6b7899] mt-1.5 text-base md:text-lg">{event.time}</div>
            </div>

            <div className="rounded-2xl border border-[#d8e0f5] bg-white p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3a56a4] mb-2">
                Location
              </div>
              <div className="text-xl md:text-2xl font-semibold text-[#1f2d4d]">
                {event.location || "Kathmandu"}
              </div>
              <div className="text-[#6b7899] mt-1.5 text-base md:text-lg">Nepal</div>
            </div>
          </div>

          {/* About + CTAs */}
          <div className="mt-12 rounded-3xl border border-[#d8e0f5] bg-white p-6 md:p-10 shadow-sm">
            <div className="prose prose-lg max-w-none prose-headings:text-[#1f2d4d] prose-p:text-[#3f4e7a]">
              <h2 className="font-serif text-3xl md:text-4xl text-[#1f2d4d] mb-6">
                About this event
              </h2>
              <div className="text-[#3f4e7a] leading-relaxed">
                {event.longDescription || "More details will be announced soon."}
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {/* Keep the "Explore more events" link */}
              <Link
                href="/events"
                className="inline-flex justify-center items-center px-7 py-3.5 rounded-xl text-base md:text-lg font-semibold text-white bg-[#ef6926] hover:bg-[#ef6926]/80 focus:ring-2 focus:ring-[#3a56a4]/40 transition-all duration-200 shadow-sm hover:shadow"
              >
                Explore more events
              </Link>

              {/* Replace the second link with the registration trigger */}
              <EventRegistrationTrigger eventTitle={event.title} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}