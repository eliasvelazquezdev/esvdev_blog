// Miniaturas automáticas para redes sociales: /og/<tipo>/<slug>.png
//   page → páginas fijas (home, blog, zips, tags, about)
//   post / zip → artículos de Sanity (título, tags y fecha)
//   tag → páginas de cada tag
// Las imágenes se cachean en la CDN; el parámetro ?v= (fecha de edición) fuerza una nueva al editar.
import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";
import { renderOgImage } from "../../../utils/og.js";
import home from "../../../data/home.json";
import blog from "../../../data/blog.json";
import about from "../../../data/about.json";

export const prerender = false;

const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : undefined;

const PAGES: Record<string, { kicker: string; title: string; subtitle?: string }> = {
    home: { kicker: home.seo.ogKicker, title: `${home.hero.title} ${home.hero.titleAccent}`, subtitle: "Data Engineering, AWS y carrera en tecnología." },
    blog: { kicker: "Blog técnico", title: blog.blogIndex.seo.title, subtitle: "Artículos prácticos de Data Engineering, Python, SQL y AWS." },
    zips: { kicker: "Zips", title: blog.zips.seo.title, subtitle: "Lecturas técnicas de menos de 5 minutos." },
    tags: { kicker: "Temas", title: blog.tags.seo.title, subtitle: "Explorá el contenido por tema." },
    about: { kicker: "Sobre el autor", title: about.seo.title, subtitle: "Autor de El Ingeniero Consciente y fundador de ShareIT." },
};

async function cardFor(kind: string, slug: string) {
    if (kind === "page") return PAGES[slug] ?? null;

    if (kind === "post" || kind === "zip") {
        const doc = await sanityClient.fetch(
            `*[contentType == $kind && slug.current == $slug][0]{ title, publishedAt, "tags": tags[]->name }`,
            { kind, slug },
        );
        if (!doc?.title) return null;
        return {
            kicker: kind === "zip" ? blog.article.ogKickerZip : blog.article.ogKickerPost,
            title: doc.title,
            tags: (doc.tags ?? []).filter(Boolean),
            meta: formatDate(doc.publishedAt),
        };
    }

    if (kind === "tag") {
        const tag = await sanityClient.fetch(
            `*[_type == "tag" && slug.current == $slug][0]{ name, description, "count": count(*[_type == "post" && references(^._id)]) }`,
            { slug },
        );
        if (!tag?.name) return null;
        return {
            kicker: `Tema · ${tag.count} ${tag.count === 1 ? "artículo" : "artículos"}`,
            title: `#${tag.name}`,
            subtitle: tag.description || undefined,
        };
    }
    return null;
}

export const GET: APIRoute = async ({ params, url }) => {
    const kind = String(params.kind);
    const slug = decodeURIComponent(String(params.slug));
    try {
        const card = await cardFor(kind, slug);
        if (!card) return new Response("Not found", { status: 404 });
        const png = await renderOgImage(card, url.origin);
        return new Response(png, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
                "Netlify-CDN-Cache-Control": "public, durable, s-maxage=2592000, stale-while-revalidate=604800",
            },
        });
    } catch (err) {
        console.error("[og] error generando miniatura", kind, slug, err);
        return new Response("Error generating image", { status: 500 });
    }
};
