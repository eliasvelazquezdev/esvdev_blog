// Convierte las marcas simples de los textos de src/data/*.json a HTML.
// La guía completa de las marcas está en src/data/README.md.
//
//   **texto**      → negrita
//   ^^texto^^      → color naranja de la marca
//   __texto__      → subrayado naranja (palabra clave)
//   ==texto==      → resaltado tipo marcador
//   ~~texto~~      → texto atenuado (gris)
//   ~texto~        → peso normal (para la parte "liviana" de los títulos)
//   [texto](url)   → link (los externos abren en otra pestaña)
//   \~ \* \^ ...   → muestra el carácter tal cual

const DEFAULT_LINK_CLASS =
  "font-bold text-orange-secondary underline decoration-orange-secondary/40 decoration-2 underline-offset-[5px] transition-colors hover:text-orange-primary";

const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * @param {string} text Texto con marcas
 * @param {{ linkClass?: string }} [options]
 * @returns {string} HTML listo para usar con set:html
 */
export function rich(text, options = {}) {
  if (!text) return "";
  const linkClass = options.linkClass ?? DEFAULT_LINK_CLASS;

  // Caracteres escapados con barra invertida: se protegen antes de procesar
  const escaped = [];
  let html = escapeHtml(String(text)).replace(/\\([~*^_=[\]\\])/g, (_, ch) => {
    escaped.push(ch);
    return `\u0000${escaped.length - 1}\u0000`;
  });

  html = html
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      const external = /^(https?:)?\/\//.test(href);
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${attrs} class="${linkClass}">${label}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\^\^(.+?)\^\^/g, '<span class="text-orange-secondary">$1</span>')
    .replace(/__(.+?)__/g, '<span class="hl">$1</span>')
    .replace(/==(.+?)==/g, '<span class="mark">$1</span>')
    .replace(/~~(.+?)~~/g, '<span class="text-gray-primary/45">$1</span>')
    .replace(/~([^~\s](?:[^~]*[^~\s])?)~/g, '<span class="font-normal">$1</span>');

  return html.replace(/\u0000(\d+)\u0000/g, (_, i) => escaped[Number(i)]);
}

/**
 * Reemplaza {variables} en un texto. Ej: fmt("Página {page}", { page: 2 }) → "Página 2"
 * @param {string} text
 * @param {Record<string, string | number>} vars
 */
export function fmt(text, vars = {}) {
  return String(text ?? "").replace(/\{(\w+)\}/g, (m, key) => (key in vars ? String(vars[key]) : m));
}
