import { createSlug } from '../utils/slugify.js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function extractText(children) {
  if (!children) return '';
  
  if (typeof children === 'string') return children;
  
  if (Array.isArray(children)) {
    return children.map(child => extractText(child)).join('');
  }
  
  if (children.props && children.props.value) {
    const value = children.props.value;
    return String(value);
  }
  
  if (children.props) {
    if (typeof children.props.children === 'string') {
      return children.props.children;
    }
    if (children.props.children) {
      return extractText(children.props.children);
    }
  }
  
  if (children.text) {
    return children.text;
  }
  
  return '';
}


export const components = {
  block: {
    h1: ({ children }) => {
      const text = extractText(children);
      const slug = createSlug(text);

      return (
        <h1 id={slug} className="text-6xl font-bold mt-6 mb-4 scroll-mt-20">
          {children}
        </h1>
      );
    },

    h2: ({ children }) => {
      const text = extractText(children);
      const slug = createSlug(text);

      return (
        <h2 id={slug} className="text-4xl font-semibold mt-6 mb-3 scroll-mt-20">
          {children}
        </h2>
      );
    },

    h3: ({ children }) => {
      const text = extractText(children);
      const slug = createSlug(text);

      return (
        <h3 id={slug} className="text-3xl font-medium mt-4 mb-2 scroll-mt-20">
          {children}
        </h3>
      );
    },

    h4: ({ children }) => {
      const text = extractText(children);
      const slug = createSlug(text);

      return (
        <h4 id={slug} className="text-2xl font-medium mt-3 mb-2 scroll-mt-20">
          {children}
        </h4>
      );
    },

    normal: ({ children }) => (
      <p className="leading-8 mb-8 text-lg">{children}</p>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 text-xl  border-gray-400 pl-4 italic text-gray-400 my-10">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4 text-lg">{children}</li>
    ),
    number: ({ children }) => (
      <li className="ml-4 text-lg">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children}
      </a>
    ),
  },

  type: {
    customImage: (props) => {
      const { src, alt, width, height } = props.node || {};
      return (
        <div className="my-10 flex justify-center">
          <img
            src={src}
            alt={alt || ""}
            width={width}
            height={height}
            className="rounded-lg shadow-md max-w-full h-auto mb-6"
            loading="lazy"
          />
        </div>
      );
    },
    code: (props) => {
      const { code, language, filename } = props.node || {};
      
      return (
        <div className="my-8">
          {filename && (
            <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-gray-600">
              📁 {filename}
            </div>
          )}
          <SyntaxHighlighter
            language={language || 'text'}
            style={oneDark}
            customStyle={{
              borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              margin: 0,
            }}
            showLineNumbers={true}
            wrapLines={true}
          >
            {code || ''}
          </SyntaxHighlighter>
        </div>
      );
    },
  },

  // Fallback for unknown types
  unknownType: (props) => {
    console.log('Unknown type encountered:', props);
    return <div>Unknown content type: {props._type}</div>;
  },
};
