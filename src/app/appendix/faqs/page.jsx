import FAQClient from "./FAQClient";
import faqData from "@/app/data/faqs";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const metadata = {
  title: "Study Abroad FAQs | Admissions, SOP, Scholarships & Visa",
  description:
    "Frequently asked questions about studying abroad: admissions process, SOP guidance, scholarships, and visa preparation.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Study Abroad FAQs",
    description:
      "Answers to common questions about admissions, SOP, scholarships and visa process.",
    url: `${siteUrl}/faq`,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "FAQs" }],
  },
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient />
    </>
  );
}
