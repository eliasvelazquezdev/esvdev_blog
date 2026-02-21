export function formatDate(date) {
  const dateFormatting = {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("es-ES", dateFormatting);
}

export function addTargetBlankToLinks(html) {
  return html.replace(/<a /g, '<a target="_blank" ');
}
