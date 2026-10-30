// Generador de miniaturas para redes sociales (Open Graph, 1200×630 PNG).
// satori dibuja la tarjeta (HTML/CSS → SVG) y resvg la convierte a PNG. Ambos son JS/WASM puros.
// Los recursos (fuentes, wasm, foto y logo) se sirven desde /public y se cargan una sola vez.
import satori from "satori";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import site from "../data/site.json";

const C = {
  bg1: "#14213d",
  bg2: "#0f1d38",
  bg3: "#0a1830",
  orange: "#F4A518",
  orangeStrong: "#f97316",
  text: "#fafafa",
  muted: "rgba(229,229,229,0.72)",
};

let assetsPromise = null;

const toDataUri = async (res, mime) => {
  const buf = Buffer.from(await res.arrayBuffer());
  return `data:${mime};base64,${buf.toString("base64")}`;
};

/** Carga (una vez por instancia) fuentes, wasm e imágenes desde el propio sitio */
function loadAssets(origin) {
  if (!assetsPromise) {
    const get = (path) =>
      fetch(new URL(path, origin)).then((r) => {
        if (!r.ok) throw new Error(`No se pudo cargar ${path} (${r.status})`);
        return r;
      });
    assetsPromise = (async () => {
      const [wasm, f500, f700, f800, avatar, logo] = await Promise.all([
        get("/og-assets/resvg.wasm"),
        get("/og-assets/manrope-latin-500-normal.woff"),
        get("/og-assets/manrope-latin-700-normal.woff"),
        get("/og-assets/manrope-latin-800-normal.woff"),
        get(site.author.avatar),
        get("/web-app-manifest-512x512.png"),
      ]);
      // El wasm se inicializa una sola vez por proceso (sobrevive a recargas del módulo)
      if (!globalThis.__resvgReady) {
        try {
          await initWasm(wasm);
        } catch (err) {
          if (!String(err?.message).includes("Already initialized")) throw err;
        }
        globalThis.__resvgReady = true;
      }
      return {
        fonts: [
          { name: "Manrope", data: await f500.arrayBuffer(), weight: 500, style: "normal" },
          { name: "Manrope", data: await f700.arrayBuffer(), weight: 700, style: "normal" },
          { name: "Manrope", data: await f800.arrayBuffer(), weight: 800, style: "normal" },
        ],
        avatar: await toDataUri(avatar, "image/jpeg"),
        logo: await toDataUri(logo, "image/png"),
      };
    })().catch((err) => {
      assetsPromise = null; // reintentar en la próxima solicitud
      throw err;
    });
  }
  return assetsPromise;
}

// Mini "JSX" para satori
const h = (type, style = {}, children = [], props = {}) => {
  // satori: un único hijo va sin array (si no, lo cuenta como varios)
  const kids = Array.isArray(children) ? (children.length === 1 ? children[0] : children.length ? children : undefined) : children;
  return { type, props: { style, children: kids, ...props } };
};

/** Tamaño del título según su largo, para que siempre entre en 3 líneas */
const titleSize = (title) => {
  const n = title.length;
  if (n <= 32) return 76;
  if (n <= 55) return 64;
  if (n <= 80) return 54;
  if (n <= 110) return 46;
  return 40;
};

/**
 * @param {{ kicker: string, title: string, subtitle?: string, tags?: string[], meta?: string }} card
 * @param {string} origin URL base del sitio (para cargar recursos)
 * @returns {Promise<Uint8Array>} PNG
 */
/** La fuente no tiene emojis ni símbolos especiales: se quitan para que no aparezcan como cuadrados */
const clean = (text = "") =>
  String(text)
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{20E3}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();

export async function renderOgImage(rawCard, origin) {
  const { fonts, avatar, logo } = await loadAssets(origin);
  const card = {
    ...rawCard,
    kicker: clean(rawCard.kicker),
    title: clean(rawCard.title) || site.brand.name,
    subtitle: rawCard.subtitle ? clean(rawCard.subtitle) : undefined,
    tags: (rawCard.tags ?? []).map(clean).filter(Boolean),
  };
  const title = card.title.length > 140 ? `${card.title.slice(0, 137).trimEnd()}…` : card.title;

  const tree = h(
    "div",
    {
      width: 1200,
      height: 630,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      fontFamily: "Manrope",
      color: C.text,
      backgroundColor: C.bg2,
      backgroundImage: `linear-gradient(150deg, ${C.bg1} 0%, ${C.bg2} 55%, ${C.bg3} 100%)`,
      padding: "56px 72px 66px",
    },
    [
      // Brillo cálido arriba a la derecha
      h("div", {
        position: "absolute",
        top: -260,
        right: -200,
        width: 760,
        height: 760,
        borderRadius: 9999,
        backgroundImage: "radial-gradient(circle, rgba(70,120,200,0.30) 0%, rgba(70,120,200,0) 65%)",
      }),
      // Trama de puntos abajo a la izquierda (como el sitio)
      h("div", {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: 520,
        height: 300,
        opacity: 0.35,
        backgroundImage: "radial-gradient(circle, rgba(120,155,215,0.9) 1.4px, rgba(0,0,0,0) 1.8px)",
        backgroundSize: "16px 16px",
      }),
      // Fila superior: etiqueta + logo
      h("div", { display: "flex", alignItems: "center", justifyContent: "space-between" }, [
        h(
          "div",
          {
            display: "flex",
            alignItems: "center",
            border: `2px solid ${C.orange}`,
            borderRadius: 999,
            padding: "8px 22px",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: C.orange,
            backgroundColor: "rgba(1,22,30,0.45)",
          },
          [card.kicker],
        ),
        h("img", { width: 92, height: 92 }, [], { src: logo, width: 92, height: 92 }),
      ]),
      // Título
      h(
        "div",
        {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
          paddingRight: 40,
        },
        [
          h(
            "div",
            {
              fontSize: titleSize(title),
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: C.text,
              display: "block",
              lineClamp: 3,
            },
            [title],
          ),
          card.subtitle
            ? h("div", { marginTop: 22, fontSize: 28, fontWeight: 500, color: C.muted, lineHeight: 1.35, display: "block", lineClamp: 2 }, [card.subtitle])
            : null,
          card.tags?.length
            ? h(
                "div",
                { display: "flex", gap: 12, marginTop: 26 },
                card.tags.slice(0, 4).map((t) =>
                  h(
                    "div",
                    {
                      display: "flex",
                      border: "2px solid rgba(244,165,24,0.55)",
                      backgroundColor: "rgba(244,165,24,0.08)",
                      borderRadius: 999,
                      padding: "6px 18px",
                      fontSize: 22,
                      fontWeight: 700,
                      color: C.text,
                    },
                    [`#${t}`],
                  ),
                ),
              )
            : null,
        ].filter(Boolean),
      ),
      // Pie: autor + dominio
      h("div", { display: "flex", alignItems: "center", justifyContent: "space-between" }, [
        h("div", { display: "flex", alignItems: "center", gap: 18 }, [
          h("img", { width: 68, height: 68, borderRadius: 999, border: `4px solid ${C.orange}`, objectFit: "cover" }, [], {
            src: avatar,
            width: 68,
            height: 68,
          }),
          h("div", { display: "flex", flexDirection: "column" }, [
            h("div", { fontSize: 26, fontWeight: 800, color: C.text }, [site.author.name]),
            h("div", { fontSize: 20, fontWeight: 500, color: C.muted }, [card.meta || site.author.role]),
          ]),
        ]),
        h("div", { fontSize: 26, fontWeight: 800, color: C.orange }, [new URL(site.seo.siteUrl).host]),
      ]),
      // Línea de marca inferior
      h("div", { position: "absolute", left: 0, right: 0, bottom: 0, height: 10, backgroundColor: C.orangeStrong }),
    ],
  );

  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
