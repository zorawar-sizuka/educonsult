import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 1800; // 30 min ISR for the page

function resolveEventImage(url) {
  if (!url) return "/events/event.png";
  if (url.startsWith("data:image/")) return url; // old base64 rows
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return url; // /uploads/... etc
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

// ✅ Next 15+ params can be Promise in generateMetadata too
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

  // For OG we want absolute if possible; if not, skip absolute building in dev.
  // (Next will still render fine)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";

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

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";

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

  const isDataUrl = img.startsWith("data:image/");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white pt-32">
        <div className="max-w-5xl mx-auto px-6 ">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900"
          >
            ← Back to Events
          </Link>
        </div>

        <section className="max-w-5xl mx-auto px-6 pt-6 pb-12">
          <div className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src={img}
              alt={event.title}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              unoptimized={isDataUrl} // ✅ important for base64 data URLs
            />
       

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-indigo-600 text-white">
                  {event.category || "Event"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 leading-tight">
                {event.title}
              </h1>

              <p className="mt-3 text-slate-700 max-w-2xl">
                {event.description}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Date
              </div>
              <div className="text-lg font-semibold text-slate-900">
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-slate-500 mt-1">{event.time}</div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Location
              </div>
              <div className="text-lg font-semibold text-slate-900">
                {event.location || "Kathmandu"}
              </div>
              <div className="text-slate-500 mt-1">Nepal</div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="prose prose-slate max-w-none">
              <h2 className="font-serif">About this event</h2>
              <p>{event.longDescription || "More details will be announced soon."}</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/events"
                className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition"
              >
                Explore more events
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition"
              >
                Ask about this event
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
