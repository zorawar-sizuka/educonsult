import EventsClient from "./EventsClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

// ✅ Strong SEO targeting (but not spammy)
export const metadata = {
  title: "Education Events in Kathmandu | Seminars, Workshops & Info Sessions",
  description:
    "Explore upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and study abroad info events. Register interest and stay updated.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Education Events in Kathmandu | Seminars, Workshops & Info Sessions",
    description:
      "Upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and more.",
    url: `${siteUrl}/events`,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Events in Kathmandu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events in Kathmandu",
    description:
      "Upcoming education events in Kathmandu—seminars, workshops, counselling sessions, and more.",
    images: ["/og.jpg"],
  },
};

async function getEvents() {
  // Server-side fetch: uses your existing API
  // IMPORTANT: if this endpoint is protected, expose a public-safe list endpoint.
  try {
    const res = await fetch(`${siteUrl}/api/events`, {
      // Revalidate to keep SEO page fresh without constant rebuild
      next: { revalidate: 300 }, // 5 minutes
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const initialEvents = await getEvents();

  // ✅ Schema: ItemList of Events (Google-friendly)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Events in Kathmandu",
    itemListElement: initialEvents
      .filter((e) => e?.title && e?.date)
      .slice(0, 30)
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
              addressLocality: "Kathmandu",
              addressCountry: "NP",
            },
          },
          image: event.imageUrl ? [event.imageUrl] : [`${siteUrl}/events/event.png`],
          description: event.description || "Upcoming event in Kathmandu.",
          url: `${siteUrl}/events`,
        },
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventsClient initialEvents={initialEvents} />
    </>
  );
}
