// app/tools/page.tsx — SEO-Optimized Server Component (Next.js 15+ Style)
import ToolsClient from './client'; // Your interactive client wrapper

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

// No dynamic params → generateMetadata is sync/static
export function generateMetadata() {
  const title = "Free Study Abroad Tools | Eligibility Checker, Cost Calculator, SOP Generator & More";
  const description =
    "AI-powered tools to plan your international education: Check visa eligibility, estimate study & living costs, generate SOP drafts, convert GPA, and search universities — all free, no login required.";

  const canonical = "/tools";
  const ogImage = "/ogs/og-tools.jpg"; // Create this 1200x630 image (hero screenshot + text)

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${canonical}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonical}`,
      siteName: "EduSoft",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Study Abroad Tools Dashboard",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: "index, follow",
    keywords:
      "study abroad tools, visa eligibility checker, education cost calculator, SOP generator, GPA converter, university finder, free international student tools",
  };
}

// Optional: Structured Data (JSON-LD)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Study Abroad Tools",
  description:
    "Free AI-powered tools for international students: eligibility checker, cost calculator, SOP generator, GPA converter, and university finder.",
  url: `${siteUrl}/tools`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
      },
    ],
  },
};

export default function ToolsPage() {
  return (
    <>
      {/* Structured Data for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Interactive Client Content */}
      <ToolsClient />
    </>
  );
}