// Feed RSS: artículos y zips. Sirve para lectores de feeds, agregadores y para que los buscadores
// descubran contenido nuevo más rápido.
import type { APIRoute } from "astro";
import site from "../data/site.json";
import { abs } from "../utils/seo.js";
import { CACHE_HEADERS, escapeXml, getFeedData } from "../utils/feeds.js";

export const prerender = false;

export const GET: APIRoute = async () => {
    const { posts = [], zips = [] } = await getFeedData();
    const items = [
        ...posts.map((p) => ({ ...p, path: `/blog/${p.slug}`, section: "Blog" })),
        ...zips.map((z) => ({ ...z, path: `/blog/zips/${z.slug}`, section: "Zips" })),
    ]
        .filter((d) => d.publishedAt)
        .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
        .slice(0, 50);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(site.brand.name)}</title>
    <link>${abs("/")}</link>
    <atom:link href="${abs("/rss.xml")}" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(site.seo.defaultDescription)}</description>
    <language>es</language>
    <managingEditor>elias@evelazquez.dev (${escapeXml(site.author.name)})</managingEditor>
    <image><url>${abs("/web-app-manifest-512x512.png")}</url><title>${escapeXml(site.brand.name)}</title><link>${abs("/")}</link></image>
    ${items[0] ? `<lastBuildDate>${new Date(items[0]._updatedAt || items[0].publishedAt).toUTCString()}</lastBuildDate>` : ""}
${items
    .map(
        (i) => `    <item>
      <title>${escapeXml(i.title)}</title>
      <link>${abs(i.path)}</link>
      <guid isPermaLink="true">${abs(i.path)}</guid>
      <pubDate>${new Date(i.publishedAt).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(site.author.name)}</dc:creator>
      <category>${i.section}</category>
${(i.tags ?? []).filter(Boolean).map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
      ${i.excerpt ? `<description>${escapeXml(i.excerpt)}</description>` : ""}
    </item>`,
    )
    .join("\n")}
  </channel>
</rss>`;
    return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", ...CACHE_HEADERS } });
};
