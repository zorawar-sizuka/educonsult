import { Suspense } from "react";
import EventsHero from "./components/EventsHero";
import EventsGridServer from "./components/Eventsgrid.server";
import EventsGridSkeleton from "./components/EventsSkeleton";
import NewsletterCTA from "./components/NewsLetter";

const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

// ✅ SEO metadata for /events
export const metadata = {
  title: "Education Events in Kathmandu | Seminars, Workshops & Info Sessions",
  description:
    "Explore upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and study abroad info events. Register interest and stay updated.",
  alternates: {
    canonical: `${siteUrl}/events`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Education Events in Kathmandu | Seminars, Workshops & Info Sessions",
    description:
      "Upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and more.",
    url: `${siteUrl}/events`,
    images: [
      {
        url: `${siteUrl}/ogs/og.png`,
        width: 1200,
        height: 630,
        alt: "Education events in Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Events in Kathmandu",
    description:
      "Upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and more.",
    images: [`${siteUrl}/ogs/og.png`],
  },
};

async function getEventsForSchema() {
  // Keep schema small (prevents big HTML + avoids ISR oversized issues)
  try {
    const res = await fetch(`${siteUrl}/api/events`, {
      cache: "no-store", // schema stays accurate; you can change later
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 10) : [];
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const schemaEvents = await getEventsForSchema();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Education Events in Kathmandu",
    itemListElement: schemaEvents
      .filter((e) => e?.title && e?.date)
      .map((event, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
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
          image: [
            event.imageUrl?.startsWith("http")
              ? event.imageUrl
              : `${siteUrl}/events/event.png`,
          ],
          description: event.description || "Upcoming education event in Kathmandu.",
          url: `${siteUrl}/events`,
        },
      })),
  };

  return (
    <>
      {/* ✅ Structured data for Google */}
      {schemaEvents.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <EventsHero />

      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGridServer />
      </Suspense>

      <div className="my-16 sm:my-20 lg:my-24">
        <NewsletterCTA />
      </div>
    </>
  );
}
