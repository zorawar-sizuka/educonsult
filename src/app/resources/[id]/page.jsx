import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resourcesData } from "@/app/data/resourceData";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

function getBlogById(id) {
  const num = Number(id);
  if (!Number.isFinite(num)) return null;
  return resourcesData.blogs.find((b) => b.id === num) || null;
}

export async function generateStaticParams() {
  return (resourcesData.blogs || []).map((b) => ({ id: String(b.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params; // Next 15+ safe
  const blog = getBlogById(id);
  if (!blog) return {};

  const title = blog.title;
  const description = blog.desc;

  return {
    title,
    description,
    alternates: { canonical: `/resources/${blog.id}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/resources/${blog.id}`,
      images: blog.image
        ? [{ url: blog.image, width: 1200, height: 630, alt: blog.title }]
        : [{ url: "/og.jpg", width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blog.image || "/og.jpg"],
    },
  };
}

export default async function ResourceArticlePage({ params }) {
  const { id } = await params;
  const blog = getBlogById(id);

  if (!blog) return notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.desc,
    image: blog.image ? `${siteUrl}${blog.image}` : undefined,
    mainEntityOfPage: `${siteUrl}/resources/${blog.id}`,
    author: {
      "@type": "Organization",
      name: "Your Consultancy Name",
    },
    publisher: {
      "@type": "Organization",
      name: "Your Consultancy Name",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  return (
    <article className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <Link href="/resources" className="text-sm font-bold text-slate-500 hover:text-slate-900">
          ← Back to Resources
        </Link>

        <h1 className="mt-6 text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
          {blog.title}
        </h1>

        <p className="mt-4 text-lg text-slate-500 font-light">
          {blog.desc}
        </p>

        {blog.image && (
          <div className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden mt-10 bg-slate-100">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg prose-slate mx-auto font-serif mt-10"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}
