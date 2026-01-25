import React from 'react';
import { notFound } from 'next/navigation';
import { countriesData } from '@/app/data/countriesData'; 
import CountryView from './View';

// 1. Mark component as async to await params
export default async function CountryPage({ params }) {
  
  // 2. Await the params (Crucial for Next.js 15+)
  const { slug } = await params;

  // 3. Find the specific country data
  const country = countriesData.find((c) => c.slug === slug);

  // 4. If slug doesn't match any country, show 404 page
  if (!country) {
    return notFound();
  }

  // 5. Pass the clean data object to the Client Component
  return <CountryView country={country} />;
}

// Optional: Pre-render these pages at build time for instant speed
export async function generateStaticParams() {
  return countriesData.map((country) => ({
    slug: country.slug,
  }));
}