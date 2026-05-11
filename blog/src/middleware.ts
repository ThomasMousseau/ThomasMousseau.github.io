import type { MiddlewareHandler } from 'astro';

/**
 * Astro injects `src="/@vite/client"` etc. as root-relative URLs. Through Angular’s proxy
 * (`http://localhost:4200/blog/...`) those resolve to Angular’s dev server, so the wrong
 * Vite HMR client loads and blog edits never refresh. Rewrite dev asset URLs to the real
 * Astro origin (see `vite.server.origin` + `BLOG_DEV_PORT` in `astro.config.mjs`).
 */
export const onRequest: MiddlewareHandler = async (_context, next) => {
  const response = await next();
  const origin = __ASTRO_DEV_ASSET_ORIGIN__;
  if (!import.meta.env.DEV || !origin) {
    return response;
  }
  const ct = response.headers.get('content-type') ?? '';
  if (!ct.includes('text/html')) {
    return response;
  }
  let html = await response.text();
  if (html.includes(`src="${origin}/@vite/`)) {
    return cloneHtmlResponse(response, html);
  }
  html = html
    .replaceAll('src="/@vite/', `src="${origin}/@vite/`)
    .replaceAll('src="/@id/', `src="${origin}/@id/`)
    .replaceAll('src="/src/', `src="${origin}/src/`)
    .replaceAll('src="/node_modules/', `src="${origin}/node_modules/`);
  return cloneHtmlResponse(response, html);
};

function cloneHtmlResponse(source: Response, html: string): Response {
  const headers = new Headers(source.headers);
  headers.delete('content-length');
  return new Response(html, {
    status: source.status,
    statusText: source.statusText,
    headers,
  });
}
