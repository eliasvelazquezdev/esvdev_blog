// robots.txt: todo indexable, incluidos los buscadores con IA (ChatGPT, Perplexity, Claude, Gemini)
import type { APIRoute } from "astro";
import { abs } from "../utils/seo.js";

export const prerender = false;

export const GET: APIRoute = () =>
    new Response(
        `User-agent: *
Allow: /

# Buscadores y asistentes con IA: se permiten para que puedan citar el contenido
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${abs("/sitemap.xml")}
Sitemap: https://www.evelazquez.dev/sitemap.xml
`,
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
