import Hero1 from "@/components/Hero-Comp/Hero1";
import Hero2 from "@/components/Hero-Comp/Hero2";
import DestinationsCluster from "@/components/DestinationsCluster";
import Hero3 from "@/components/Hero-Comp/Hero3";
import ServicesEditorial from "@/components/ServicesEditorial";
import Founder from "@/components/Founder";
import Stats from "@/components/Stats";
import ContactSection from "@/components/Contact";
import TestimonialsCarousel from "@/components/Testimonials";
import LogoMarquee from "@/components/Marquee";

// Domain-safe base (works now on vercel.app, later on custom domain)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

// ✅ Home-specific metadata (overrides global defaults from layout)
export const metadata = {
  title: "Education Consultancy in Kathmandu | Study Abroad Guidance",
  description:
    "Study abroad consultancy in Kathmandu helping students with university selection, admissions, scholarships, SOP guidance, and visa support for UK, USA, Canada, Australia, Germany, Japan and more.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Education Consultancy in Kathmandu | Study Abroad Guidance",
    description:
      "Admissions, scholarships, SOP guidance, and visa support for top destinations like UK, USA, Canada, Australia, Germany, Japan and more.",
    url: siteUrl,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Study Abroad Consultancy" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Consultancy in Kathmandu",
    description:
      "Study abroad guidance, admissions support, scholarships, SOP help and visa assistance.",
    images: ["/og.jpg"],
  },
};

export default function Home() {
  // ✅ Schema: Organization + Website (safe defaults)
  // You can later add address/phone/social links when you have them.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Your Consultancy Name",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`, // add /public/logo.png (or change path)
    sameAs: [], // add social URLs later (optional)
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Your Consultancy Name",
    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />

      <Hero1 />

      <div className="block md:hidden w-100vw relative left-1/2 -translate-x-1/2 my-10 bg-white">
        <LogoMarquee originalColor={true} />
      </div>

      <Hero2 />
      <DestinationsCluster />
      <Hero3 />
      <ServicesEditorial />
      <Founder />
      <Stats />
      <TestimonialsCarousel />
      <ContactSection />
    </>
  );
}
