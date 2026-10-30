// Estadísticas de un artículo de Sanity (Portable Text): palabras y minutos de lectura (~200 ppm)
export function articleStats(body = []) {
  const words = body
    .map((b) => (b._type === "block" ? (b.children ?? []).map((c) => c.text ?? "").join(" ") : b._type === "code" ? b.code ?? "" : ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 200)) };
}
