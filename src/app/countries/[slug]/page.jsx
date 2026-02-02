// import React from 'react';
// import { notFound } from 'next/navigation';
// import { countriesData } from '@/app/data/countriesData'; 
// import CountryView from './View';

// // 1. Mark component as async to await params
// export default async function CountryPage({ params }) {
  
//   // 2. Await the params (Crucial for Next.js 15+)
//   const { slug } = await params;

//   // 3. Find the specific country data
//   const country = countriesData.find((c) => c.slug === slug);

//   // 4. If slug doesn't match any country, show 404 page
//   if (!country) {
//     return notFound();
//   }

//   // 5. Pass the clean data object to the Client Component
//   return <CountryView country={country} />;
// }

// // Optional: Pre-render these pages at build time for instant speed
// export async function generateStaticParams() {
//   return countriesData.map((country) => ({
//     slug: country.slug,
//   }));
// }










import React from "react";
import { notFound } from "next/navigation";
import { countriesData } from "@/app/data/countriesData";
import CountryView from "./View";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

// ✅ Next 15+ safe: params can be a Promise → await it
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const country = countriesData.find((c) => c.slug === slug);
  if (!country) return {};

  const title = `Study in ${country.name}`;
  const description =
    country.tagline ||
    `Explore top universities, entry requirements, costs, scholarships and visa guidance for studying in ${country.name}.`;

  const canonical = `/countries/${country.slug}`;
  const ogImage = country.ogImage || "/ogs/og.png";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonical}`,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: `Study in ${country.name}` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CountryPage({ params }) {
  const { slug } = await params;

  const country = countriesData.find((c) => c.slug === slug);
  if (!country) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Study in ${country.name}`,
    url: `${siteUrl}/countries/${country.slug}`,
    description:
      country.tagline ||
      `Information about studying in ${country.name}, including universities, requirements, and guidance.`,
    isPartOf: {
      "@type": "WebSite",
      name: "E-spot International Education Consultancy",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CountryView country={country} />
    </>
  );
}

export async function generateStaticParams() {
  return countriesData.map((country) => ({ slug: country.slug }));
}
