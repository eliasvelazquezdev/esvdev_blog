import { createSlug } from "../utils/slugify.js";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import blog from "../data/blog.json";

function extractText(children) {
  if (!children) return "";

  if (typeof children === "string") return children;

  if (Array.isArray(children)) {
    return children.map((child) => extractText(child)).join("");
  }

  if (children.props && children.props.value) {
    const value = children.props.value;
    return String(value);
  }

  if (children.props) {
    if (typeof children.props.children === "string") {
      return children.props.children;
    }
    if (children.props.children) {
      return extractText(children.props.children);
    }
  }

  if (children.text) {
    return children.text;
  }

  return "";
}

const LANGUAGE_LABELS = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  py: "Python",
  python: "Python",
  sql: "SQL",
  sh: "Shell",
  bash: "Bash",
  shell: "Shell",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  html: "HTML",
  css: "CSS",
  text: "Texto",
};

export const components = {
  block: {
    h1: ({ children }) => {
      const slug = createSlug(extractText(children));
      return (
        <h1 id={slug} className="mb-6 mt-16 scroll-mt-32 text-4xl font-extrabold leading-tight tracking-tight text-gray-primary lg:text-5xl">
          {children}
        </h1>
      );
    },

    h2: ({ children }) => {
      const slug = createSlug(extractText(children));
      return (
        <h2
          id={slug}
          className="group relative mb-5 mt-16 scroll-mt-32 border-l-4 border-orange-primary pl-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-primary lg:text-4xl"
        >
          <a href={`#${slug}`} className="!no-underline" aria-hidden="true" tabIndex={-1}>
            <span className="absolute -left-10 top-1/2 hidden -translate-y-1/2 text-xl font-bold text-orange-secondary/0 transition-colors group-hover:text-orange-secondary/70 xl:block">
              #
            </span>
          </a>
          {children}
        </h2>
      );
    },

    h3: ({ children }) => {
      const slug = createSlug(extractText(children));
      return (
        <h3 id={slug} className="mb-4 mt-12 scroll-mt-32 text-2xl font-bold tracking-tight text-orange-secondary lg:text-[1.65rem]">
          {children}
        </h3>
      );
    },

    h4: ({ children }) => {
      const slug = createSlug(extractText(children));
      return (
        <h4 id={slug} className="mb-3 mt-10 scroll-mt-32 text-xl font-bold tracking-tight text-gray-primary">
          {children}
        </h4>
      );
    },

    normal: ({ children }) => <p className="mb-7 text-lg leading-[1.85] text-gray-primary/85 lg:text-[1.1875rem]">{children}</p>,

    blockquote: ({ children }) => (
      <blockquote className="relative my-12 overflow-hidden rounded-2xl border border-orange-secondary/40 bg-blue-secondary/40 px-7 py-7 lg:px-10 lg:py-8">
        <span
          className="pointer-events-none absolute -top-6 right-5 select-none font-serif text-[9rem] leading-none text-orange-secondary/10"
          aria-hidden="true"
        >
          ”
        </span>
        <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-orange-secondary to-orange-primary" aria-hidden="true" />
        <div className="relative text-xl font-semibold leading-relaxed tracking-tight text-gray-primary lg:text-2xl">{children}</div>
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="mb-8 space-y-3">{children}</ul>,
    number: ({ children }) => <ol className="mb-8 space-y-3 [counter-reset:item]">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4 text-lg leading-[1.75] text-gray-primary/85">
        <span className="mt-[0.85em] h-[2px] w-4 shrink-0 rounded-full bg-orange-primary" aria-hidden="true" />
        <span className="min-w-0 flex-1">{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="flex items-start gap-4 text-lg leading-[1.75] text-gray-primary/85 [counter-increment:item]">
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-orange-secondary text-xs font-bold tabular-nums text-orange-secondary before:content-[counter(item)]"
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1">{children}</span>
      </li>
    ),
  },

  mark: {
    strong: ({ children }) => <strong className="font-bold text-gray-secondary">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-primary">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md border border-orange-secondary/25 bg-blue-secondary/70 px-1.5 py-0.5 font-mono text-[0.88em] text-orange-secondary">
        {children}
      </code>
    ),
    link: ({ node, children }) => {
      const href = node?.markDef?.href || "";
      const isExternal = href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="font-semibold text-orange-secondary underline decoration-orange-secondary/40 decoration-2 underline-offset-[5px] transition-colors hover:text-orange-primary hover:decoration-orange-primary"
        >
          {children}
        </a>
      );
    },
  },

  type: {
    customImage: (props) => {
      const { src, alt, width, height } = props.node || {};
      return (
        <figure className="my-12">
          <div className="overflow-hidden rounded-2xl border-2 border-orange-primary/70 bg-blue-secondary shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
            <img src={src} alt={alt || ""} width={width} height={height} className="h-auto w-full" loading="lazy" />
          </div>
          {alt && <figcaption className="mt-3 text-center text-sm text-gray-primary/50">{alt}</figcaption>}
        </figure>
      );
    },
    code: (props) => {
      const { code, language, filename } = props.node || {};
      const lang = (language || "text").toLowerCase();
      const label = LANGUAGE_LABELS[lang] || lang.toUpperCase();

      return (
        <div className="code-block group/code my-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1626] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-blue-secondary/60 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
              </span>
              {filename && <span className="truncate font-mono text-sm text-gray-primary/75">{filename}</span>}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-secondary/80">{label}</span>
              <button
                type="button"
                data-code-copy
                data-copy-label={blog.ui.copy}
                data-copied-label={blog.ui.copied}
                className="flex h-8 items-center gap-1.5 rounded-md border border-white/10 px-2.5 text-xs font-semibold text-gray-primary/70 transition-colors hover:border-orange-secondary hover:text-orange-secondary"
                aria-label={blog.ui.copy}
              >
                <i className="fa-regular fa-copy" aria-hidden="true" />
                <span data-code-copy-label>{blog.ui.copy}</span>
              </button>
            </div>
          </div>
          <SyntaxHighlighter
            language={lang}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1.25rem 1.25rem 1.4rem",
              borderRadius: 0,
              background: "transparent",
              fontSize: "0.9rem",
              lineHeight: "1.7",
            }}
            codeTagProps={{ style: { fontFamily: '"JetBrains Mono", ui-monospace, monospace', background: "transparent" } }}
            lineNumberStyle={{ color: "rgba(229,229,229,0.25)", minWidth: "2.5em" }}
            showLineNumbers={true}
            wrapLines={true}
          >
            {code || ""}
          </SyntaxHighlighter>
        </div>
      );
    },
  },

  // Fallback for unknown types
  unknownType: (props) => {
    console.log("Unknown type encountered:", props);
    return <div>Unknown content type: {props._type}</div>;
  },
};
