// components/PortableTextComponents.jsx
export const components = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-6 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-medium mt-3 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="leading-8 mb-8">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 text-lg border-gray-400 pl-4 italic text-gray-400 my-6">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside  mb-4">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 rounded">{children}</code>
    ),
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

  types: {
    customImage: ({ value }) => {
      const { src, alt, width, height } = value || {};
      return (
        <div className="my-6 flex justify-center">
          <img
            src={src}
            alt={alt || ""}
            width={width}
            height={height}
            className="rounded-lg shadow-md max-w-full h-auto"
            loading="lazy"
          />
        </div>
      );
    },
  },
};
