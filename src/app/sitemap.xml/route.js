import { countriesData } from "@/app/data/countriesData";

const staticRoutes = [
  "",
  "/events",
  "/resources",
  "/countries",
  "/tools",
];

function toIso(date) {
  return date.toISOString();
}

function escapeXml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

  const now = new Date();

  // Build URLs
  const urls = [];

  // Static pages
  for (const p of staticRoutes) {
    urls.push({
      loc: `${siteUrl}${p}`,
      lastmod: toIso(now),
    });
  }

  // Country pages (from your data)
  for (const c of countriesData) {
    if (!c?.slug) continue;
    urls.push({
      loc: `${siteUrl}/countries/${c.slug}`,
      lastmod: toIso(now),
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
