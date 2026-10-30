// Consultas compartidas por sitemap.xml, rss.xml y llms.txt
import { sanityClient } from "sanity:client";

export const FEED_QUERY = `{
  "posts": *[contentType == "post" && defined(slug.current)] | order(publishedAt desc) {
    title, "slug": slug.current, excerpt, publishedAt, _updatedAt, "tags": tags[]->name
  },
  "zips": *[contentType == "zip" && defined(slug.current)] | order(publishedAt desc) {
    title, "slug": slug.current, excerpt, publishedAt, _updatedAt, "tags": tags[]->name
  },
  "tags": *[_type == "tag" && count(*[_type == "post" && references(^._id)]) > 0] {
    name, "slug": slug.current, _updatedAt
  }
}`;

export const getFeedData = () => sanityClient.fetch(FEED_QUERY);

export const escapeXml = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=3600",
  "Netlify-CDN-Cache-Control": "public, durable, s-maxage=3600, stale-while-revalidate=86400",
};
