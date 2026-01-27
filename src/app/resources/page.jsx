import ResourcesClient from "./ResourcesClient";
import { resourcesData } from "@/app/data/resourceData";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const metadata = {
  title: "Student Resources | Guides, Study Links & Latest Insights",
  description:
    "Downloadable study abroad guides, helpful links, and articles to support your university admissions, SOP preparation, scholarships, and visa process.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Student Resources",
    description:
      "Guides, study links, and insights for admissions, SOP, scholarships, and visas.",
    url: `${siteUrl}/resources`,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Student Resources" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Resources",
    description:
      "Guides, study links, and insights for admissions, SOP, scholarships, and visas.",
    images: ["/og.jpg"],
  },
};

export default function ResourcesPage() {
  // ✅ Schema: ItemList (blogs + guides summarized)
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Student Resources",
    url: `${siteUrl}/resources`,
    hasPart: [
      ...(resourcesData.guides || []).map((g) => ({
        "@type": "CreativeWork",
        name: g.title,
        description: g.desc,
        url: g.downloadUrl ? `${siteUrl}${g.downloadUrl}` : `${siteUrl}/resources`,
      })),
      ...(resourcesData.blogs || []).map((b) => ({
        "@type": "Article",
        headline: b.title,
        description: b.desc,
        image: b.image ? `${siteUrl}${b.image}` : undefined,
        url: `${siteUrl}/resources`, // Step 2 will replace this with /resources/<slug>
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ResourcesClient />
    </>
  );
}
