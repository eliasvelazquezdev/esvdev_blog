import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify/functions";

import sanity from "@sanity/astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig(
  {
    integrations: [
      tailwind(), 
      sanity({
        projectId: "y9uq1het",
        dataset: "production",
        useCdn: false,
        apiVersion: '2025-08-24',
      }), 
      react()
    ],
    output: "server",
    adapter: netlify(),
    vite: {
      resolve: {
        alias: [
          {
            find: /@babel\/runtime\/helpers\/(?!esm\/)(.*)/,
            replacement: '@babel/runtime/helpers/esm/$1'
          },
          {
            find: '@babel/runtime/regenerator',
            replacement: '@babel/runtime/helpers/esm/regeneratorRuntime'
          }
        ]
      },
      ssr: {
        noExternal: ['react-syntax-highlighter', 'refractor', '@babel/runtime']
      }
    }
  }
);