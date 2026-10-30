// Helpers de SEO del blog: URLs absolutas, títulos, miniaturas y datos estructurados (schema.org).
// Los textos y datos viven en src/data/site.json (bloques "seo" y "author").
import site from "../data/site.json";

export const SITE_URL = site.seo.siteUrl.replace(/\/+$/, "");
export const BRAND = site.brand.name;
const author = site.author;

/** URL absoluta a partir de una ruta del sitio */
export const abs = (path = "/") => new URL(path, SITE_URL + "/").href;

/** Normaliza una ruta para la URL canónica: sin barra final (salvo la raíz) */
export const canonicalPath = (pathname = "/") => {
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

/** Título completo: agrega la marca si no la incluye y si no queda demasiado largo */
export const fullTitle = (title) => {
  if (!title || title.includes(BRAND)) return title || BRAND;
  const withBrand = `${title} | ${BRAND}`;
  return withBrand.length <= 65 ? withBrand : title;
};

/** URL de la miniatura generada automáticamente (ver src/pages/og/[kind]/[slug].png.ts) */
// Hoy todas las páginas usan la imagen fija de site.json → seo.ogImage (cuadrada, carga instantánea en WhatsApp).
// Las tarjetas generadas por artículo siguen disponibles en /og/<tipo>/<slug>.png por si se quieren volver a usar.
export const OG_IMAGE = abs(site.seo.ogImage);
export const ogImageUrl = () => OG_IMAGE;
export const generatedOgImageUrl = (kind, slug, version = "") =>
  abs(`/og/${kind}/${encodeURIComponent(slug)}.png${version ? `?v=${encodeURIComponent(version)}` : ""}`);

// ===== Datos estructurados =====
// Elias usa el mismo @id que en evelazquez.dev: así Google une ambos sitios a la misma persona.
export const personRef = { "@id": author.id };

export const personNode = () => ({
  "@type": "Person",
  "@id": author.id,
  name: author.name,
  alternateName: author.alternateNames,
  url: author.website,
  image: abs(author.avatar),
  jobTitle: author.jobTitle,
  description: author.bio,
  address: { "@type": "PostalAddress", addressLocality: author.location, addressCountry: "AR" },
  knowsAbout: author.knowsAbout,
  sameAs: author.sameAs,
});

export const websiteNode = () => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BRAND,
  alternateName: "elingenieroconsciente.com",
  description: site.seo.defaultDescription,
  inLanguage: site.seo.lang,
  publisher: personRef,
  author: personRef,
});

export const blogNode = () => ({
  "@type": "Blog",
  "@id": `${SITE_URL}/#blog`,
  url: abs("/blog"),
  name: `${BRAND} — Blog`,
  description: site.seo.defaultDescription,
  inLanguage: site.seo.lang,
  publisher: personRef,
  author: personRef,
  isPartOf: { "@id": `${SITE_URL}/#website` },
});

/** Migas de pan: [{ name, path }] (el inicio se agrega solo) */
export const breadcrumbNode = (url, items) => ({
  "@type": "BreadcrumbList",
  "@id": `${url}#breadcrumb`,
  itemListElement: [{ name: "Inicio", path: "/" }, ...items].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

/** Página genérica (WebPage, CollectionPage, AboutPage, ProfilePage...) */
export const pageNode = (type, { url, title, description, image, breadcrumb = false, extra = {} }) => ({
  "@type": type,
  "@id": `${url}#webpage`,
  url,
  name: title,
  description,
  inLanguage: site.seo.lang,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
  ...(breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  ...extra,
});

/** Lista de artículos (para páginas de listado) */
export const itemListNode = (url, items) => ({
  "@type": "ItemList",
  "@id": `${url}#list`,
  itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, url: abs(item.path), name: item.name })),
});
