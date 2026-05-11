import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import FullReload from 'vite-plugin-full-reload';

const blogDevPort = Number(process.env.BLOG_DEV_PORT || 4321);
const blogOrigin = `http://localhost:${blogDevPort}`;
const devAssetOriginForDefine =
  process.env.NODE_ENV === 'production' ? '' : blogOrigin;

// Build into a temp folder; root `npm run copy:blog` merges into Angular's `browser/` output.
export default defineConfig({
  site: 'https://thomasmousseau.github.io',
  outDir: '../dist/blog-site',
  server: {
    port: blogDevPort,
    strictPort: true,
  },
  // Avoid Vite watching Astro’s content cache under `.astro/` (incl. `data-store.json.tmp`).
  // Otherwise rapid MDX saves can race: rename tmp → final fails with ENOENT (withastro/astro#15671).
  //
  // When the Angular dev server proxies /blog from :4200, relative /@vite/... URLs would load
  // from :4200 and HMR never attaches. Point dev asset + HMR base at Astro so the browser
  // loads modules + websocket from :4321 while the tab URL stays :4200.
  vite: {
    define: {
      __ASTRO_DEV_ASSET_ORIGIN__: JSON.stringify(devAssetOriginForDefine),
    },
    plugins: [
      // Content collections re-parse MDX on save but often do not trigger fine-grained HMR;
      // force a full browser reload so Cmd+S matches the “always see latest” Angular dev feel.
      FullReload(
        [
          'src/content/**/*.{md,mdx}',
          'src/content.config.ts',
          'src/layouts/**/*.{astro,md,mdx}',
          'src/pages/**/*.{astro,md,mdx}',
          'src/styles/**/*.{css,scss}',
        ],
        // Debounce so rapid Cmd+S does not overlap Astro content-store writes (rename
        // `.astro/data-store.json.tmp` → `.astro/data-store.json` can ENOENT under load).
        { delay: 220 },
      ),
    ],
    server: {
      origin: blogOrigin,
      // Tab may be on :4200 (Angular) while Vite runs on BLOG_DEV_PORT; pin HMR to the blog dev server.
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: blogDevPort,
        clientPort: blogDevPort,
      },
      watch: {
        ignored: ['**/.astro/**', '.astro/**'],
        awaitWriteFinish: {
          stabilityThreshold: 200,
          pollInterval: 50,
        },
      },
    },
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  ],
});
