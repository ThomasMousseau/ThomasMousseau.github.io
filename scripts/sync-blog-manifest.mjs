/**
 * Copies Astro-built /blog/posts.json into public/ so `ng serve` can load the
 * home page blog list without a full build:site. Run via npm run sync:blog-manifest.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'dist', 'blog-site', 'blog', 'posts.json');
const destDir = path.join(root, 'public', 'blog');
const dest = path.join(destDir, 'posts.json');

if (!fs.existsSync(src)) {
  console.error('[sync-blog-manifest] Missing', src, '\nRun: npm run build --prefix blog');
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log('[sync-blog-manifest] Wrote', dest);
