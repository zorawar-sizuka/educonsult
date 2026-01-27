export function GET() {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
  
    const content = `User-agent: *
  Allow: /
  
  Sitemap: ${siteUrl}/sitemap.xml
  `;
  
    return new Response(content, {
      headers: { "Content-Type": "text/plain" },
    });
  }
  