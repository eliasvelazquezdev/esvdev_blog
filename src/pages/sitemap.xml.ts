// Sitemap dinámico: páginas fijas + artículos, zips y tags de Sanity (con fecha de última edición)
import type { APIRoute } from "astro";
import { abs } from "../utils/seo.js";
import { CACHE_HEADERS, escapeXml, getFeedData } from "../utils/feeds.js";

export const prerender = false;

export const GET: APIRoute = async () => {
    const { posts = [], zips = [], tags = [] } = await getFeedData();
    const latest = [...posts, ...zips].map((d) => d._updatedAt || d.publishedAt).sort().at(-1);
    const day = (d?: string) => (d ? new Date(d).toISOString().slice(0, 10) : undefined);

    const entries: { loc: string; lastmod?: string; changefreq: string; priority: string }[] = [
        { loc: abs("/"), lastmod: day(latest), changefreq: "weekly", priority: "1.0" },
        { loc: abs("/blog"), lastmod: day(latest), changefreq: "weekly", priority: "0.9" },
        { loc: abs("/blog/zips"), lastmod: day(zips[0]?._updatedAt), changefreq: "weekly", priority: "0.7" },
        { loc: abs("/blog/tags"), changefreq: "monthly", priority: "0.5" },
        { loc: abs("/about"), changefreq: "monthly", priority: "0.7" },
        ...posts.map((p) => ({ loc: abs(`/blog/${p.slug}`), lastmod: day(p._updatedAt || p.publishedAt), changefreq: "monthly", priority: "0.8" })),
        ...zips.map((z) => ({ loc: abs(`/blog/zips/${z.slug}`), lastmod: day(z._updatedAt || z.publishedAt), changefreq: "monthly", priority: "0.6" })),
        ...tags.map((t) => ({ loc: abs(`/blog/tags/${t.slug}/page1`), lastmod: day(t._updatedAt), changefreq: "weekly", priority: "0.4" })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
    .map(
        (e) =>
            `  <url><loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}<changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
    )
    .join("\n")}
</urlset>`;
    return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", ...CACHE_HEADERS } });
};
