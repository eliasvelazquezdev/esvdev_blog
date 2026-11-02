// Memoria de navegación para el botón "Volver" de los artículos.
// Guarda (por pestaña, en sessionStorage) la última lista de posts o zips que se visitó,
// para que "Volver" lleve a esa misma página (ej. la 4 de 6) y no siempre a la primera.

const LIST = (kind: string) => `ic:nav:list:${kind}`;

const clean = (path: string) => path.replace(/\/+$/, "") || "/";

/** Qué tipo de lista es una ruta: "post", "zip" o ninguna */
const listKinds = (path: string): string[] => {
  if (path === "/blog/zips") return ["zip"];
  if (path === "/blog" || /^\/blog\/page\d+$/.test(path) || /^\/blog\/tags\/[^/]+(\/page\d+)?$/.test(path)) return ["post"];
  return [];
};

const safe = <T>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch {
    return fallback; // modo privado o almacenamiento bloqueado: el botón usa su enlace por defecto
  }
};

/** Registrar la página actual (llamar en cada astro:page-load) */
export function rememberPage() {
  safe(() => {
    const here = clean(location.pathname);
    listKinds(here).forEach((kind) => sessionStorage.setItem(LIST(kind), here));
  }, undefined);
}

/** Última lista visitada para ese tipo de artículo (o null) */
export const lastList = (kind: string): string | null => safe(() => sessionStorage.getItem(LIST(kind)), null);

// ===== Posición del scroll en las listas =====
// Al salir de una página se guarda dónde estaba el scroll; al volver (botón "Volver" o el "atrás" del navegador)
// se restaura, así se sigue leyendo la lista desde el mismo punto.
const SCROLL = (path: string) => `ic:nav:scroll:${path}`;
const RESTORE = "ic:nav:restore";

/** Pedir que la próxima carga de `path` restaure su scroll (lo usa el botón "Volver") */
export const requestRestore = (path: string) => safe(() => sessionStorage.setItem(RESTORE, path), undefined);

export function setupScrollMemory() {
  let traversing = false;

  document.addEventListener("astro:before-preparation", (e: any) => {
    traversing = e.navigationType === "traverse"; // atrás/adelante del navegador
    safe(() => sessionStorage.setItem(SCROLL(clean(e.from.pathname)), String(Math.round(scrollY))), undefined);
  });

  const restore = () => {
    const here = clean(location.pathname);
    const wanted = safe(() => sessionStorage.getItem(RESTORE), null) === here;
    if (!traversing && !wanted) return;
    const y = Number(safe(() => sessionStorage.getItem(SCROLL(here)), null));
    if (y > 0) window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  };

  document.addEventListener("astro:after-swap", restore);
  document.addEventListener("astro:page-load", () => {
    restore();
    traversing = false;
    safe(() => sessionStorage.removeItem(RESTORE), undefined);
  });
}
