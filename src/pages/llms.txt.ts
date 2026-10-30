// llms.txt: resumen en texto plano para asistentes de IA, armado con el contenido real del blog
import type { APIRoute } from "astro";
import site from "../data/site.json";
import { abs } from "../utils/seo.js";
import { CACHE_HEADERS, getFeedData } from "../utils/feeds.js";

export const prerender = false;

export const GET: APIRoute = async () => {
    const { posts = [], zips = [], tags = [] } = await getFeedData();
    const a = site.author;
    const line = (d: { title: string; excerpt?: string }, path: string) => `- [${d.title}](${abs(path)})${d.excerpt ? `: ${d.excerpt}` : ""}`;
    const body = `# ${site.brand.name}

> ${site.seo.defaultDescription}

Blog y newsletter en español de ${a.name} (${a.jobTitle}, ${a.location}). Web personal y portafolio: ${a.website}

## Secciones
- [Inicio](${abs("/")}): qué es la newsletter y para quién es
- [Blog](${abs("/blog")}): artículos técnicos de Data Engineering y AWS
- [Zips](${abs("/blog/zips")}): lecturas técnicas breves
- [Temas](${abs("/blog/tags")}): ${tags.map((t) => t.name).join(", ")}
- [Sobre el autor](${abs("/about")})
- [Newsletter](https://newsletter.elingenieroconsciente.com)

## Artículos
${posts.map((p) => line(p, `/blog/${p.slug}`)).join("\n")}

## Zips
${zips.map((z) => line(z, `/blog/zips/${z.slug}`)).join("\n")}

## Autor
${a.sameAs.map((u) => `- ${u}`).join("\n")}
`;
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", ...CACHE_HEADERS } });
};
