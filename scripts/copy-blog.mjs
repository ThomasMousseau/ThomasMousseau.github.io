/**
 * Merges the Astro static build (../dist/blog-site) into the Angular browser output
 * (../dist/website/browser). Run after `ng build` and `npm run build` in ./blog.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const astroOut = path.join(root, 'dist', 'blog-site');
const browser = path.join(root, 'dist', 'website', 'browser');

function rmrf(p) {
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
  }
}

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    const st = fs.statSync(s);
    if (st.isDirectory()) {
      copyRecursive(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

const blogSrc = path.join(astroOut, 'blog');
const astroChunks = path.join(astroOut, '_astro');

if (!fs.existsSync(blogSrc)) {
  console.error(
    '[copy-blog] Missing Astro output:',
    blogSrc,
    '\nRun: cd blog && npm run build',
  );
  process.exit(1);
}

if (!fs.existsSync(browser)) {
  console.error(
    '[copy-blog] Missing Angular browser bundle:',
    browser,
    '\nRun: ng build --configuration production --base-href=/',
  );
  process.exit(1);
}

const blogDest = path.join(browser, 'blog');
rmrf(blogDest);
copyRecursive(blogSrc, blogDest);

if (fs.existsSync(astroChunks)) {
  const chunksDest = path.join(browser, '_astro');
  rmrf(chunksDest);
  copyRecursive(astroChunks, chunksDest);
}

console.log('[copy-blog] Merged blog static assets into', browser);
