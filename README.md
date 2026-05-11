# ThomasMousseau.github.io

Personal site: Angular shell (home, publications) plus a static **Astro + MDX** technical blog with KaTeX math, merged into one GitHub Pages deploy.

## Prerequisites

- Node.js LTS and npm
- Angular CLI is invoked via `npx ng` / npm scripts (local `@angular/cli`)

## Commands

### Quick reference (the three you use most)

1. **Write a blog** — clears Astro’s local content cache (helps avoid stuck `data-store` errors), then runs the combined Angular + Astro dev servers. Open **`http://localhost:4200`**.

   ```bash
   rm -rf blog/.astro && npm run dev:write
   ```

2. **Write the website** — Angular shell only (home, publications, routing) at **`http://localhost:4200`**.

   ```bash
   npm start
   ```

3. **Deploy** — production build of the site + blog, then publish to the **`gh-pages`** branch (GitHub Pages).

   ```bash
   npm run deploy
   ```

### Other npm scripts

| Script | Description |
|--------|--------------|
| `npm run dev:blog` | Astro only: MDX + KaTeX at `http://localhost:4321` (blog in isolation). |
| `npm run dev:write` | Same as the **write a blog** command above, without deleting `blog/.astro` first. |
| `npm run build:site` | Production Angular build, Astro build, copy blog into `dist/website/browser` (also run by `deploy`). |
| `npm run deploy` | Same as **Deploy** above. |

### Technical blog (Astro) locally

From the repo root (first time in `blog/`):

```bash
cd blog && npm install
```

**Live preview while editing MDX**

- **Full site + instant MDX:** from the repo root run **`npm run dev:write`**, wait until both processes show “ready”, then use **`http://localhost:4200`**. Edit files under `blog/src/content/posts/`, save, and Astro’s dev server rebuilds; the browser updates without running a production build.
- If the blog dev server ever throws **`UnknownFilesystemError` / `rename … data-store.json.tmp`**, stop it, delete the folder **`blog/.astro`**, and start **`npm run dev:write`** again. The blog dev setup also **debounces** full reloads and uses **`awaitWriteFinish`** on the file watcher to reduce that race; clearing **`blog/.astro`** still fixes a stuck cache if errors persist.
- **Overleaf-style split view** is not built into this stack; closest workflow is an editor split (e.g. MDX on the left, **Simple Browser** or a normal browser tab on `http://localhost:4200/blog/...` on the right). If **`npm run dev:write` exits immediately** with “port already in use”, stop any old `ng serve` / `astro dev` (or anything else on 4200 / 4321) and run it again.
- **Blog only (fastest):** `npm run dev:blog` (or `cd blog && npm run dev`) and open **`http://localhost:4321/blog/…`** — same hot reload, but the Angular shell (home, publications) is not in that tab.

The Astro project builds into `dist/blog-site/`; **`npm run copy:blog`** (via `build:site`) copies `/blog` and `/_astro` into the Angular browser bundle so `/blog/...` works on the same origin in production.

### Seeing the blog list while developing Angular only

The home page loads **`/blog/posts.json`**. Plain `npm start` serves the copy under `public/blog/posts.json` when present. For the **live** manifest from Astro while the blog dev server runs, use **`npm run dev:write`** so `/blog/posts.json` is proxied to Astro.

Minimum workflow to preview a **static** production bundle locally:

```bash
npm run build:site
npx http-server dist/website/browser -p 8080 -o
```

## Where things live

### Site-wide look (Angular)

| What | Where |
|------|--------|
| Global typography, background (`--page-bg`, NIXGONM font) | [`src/styles.css`](src/styles.css) |
| Initial loader background | [`src/index.html`](src/index.html) |
| Header (name, social icons, Home / Publications) | [`src/app/header/`](src/app/header/header.component.html) — replace the Scholar URL placeholder `REPLACE_WITH_YOUR_SCHOLAR_ID`. |

### Home page

| What | Where |
|------|--------|
| Bio lines (2–3 sentences) | [`src/app/home/home.component.ts`](src/app/home/home.component.ts) → `bioParagraphs` |
| Profile photo path | Same file → `profileImageSrc` (defaults to `/assets/photos/new_profile_photo.jpg`) |

### Publications

| What | Where |
|------|--------|
| Paper entries (title, abstract, image, external link) | [`src/app/publications/publications.component.ts`](src/app/publications/publications.component.ts) → `publications` array |
| Title & abstract support **Markdown** and **`$...$` / `$$...$$` KaTeX math** | Same strings; rendering uses [`src/app/utils/render-rich-text.ts`](src/app/utils/render-rich-text.ts) |

Cards navigate straight to **arXiv / OpenReview / publisher URLs** (`href`), not to an inner page.

### Technical blog (Astro + MDX)

| What | Where |
|------|--------|
| Astro config (site URL, output dir `dist/blog-site`) | [`blog/astro.config.mjs`](blog/astro.config.mjs) |
| Content schema (frontmatter fields) | [`blog/src/content.config.ts`](blog/src/content.config.ts) |
| Post bodies | [`blog/src/content/posts/*.mdx`](blog/src/content/posts/) |
| Post HTML wrapper (title, date, favicon, nav back to site; images go in MDX) | [`blog/src/layouts/BlogPostLayout.astro`](blog/src/layouts/BlogPostLayout.astro) |
| Blog-specific CSS | [`blog/src/styles/blog.css`](blog/src/styles/blog.css) |
| JSON manifest for the Angular home page | Generated at **`/blog/posts.json`** from [`blog/src/pages/blog/posts.json.ts`](blog/src/pages/blog/posts.json.ts) |

#### New blog post checklist

1. Add `your-post.mdx` under `blog/src/content/posts/`.
2. Frontmatter (required fields match the schema): `title`, `description`, `date`, `slug`, optional `heroImage` (thumbnail on the **home** post list only; not shown at the top of the post page).
3. Put images in `blog/public/` (site paths like `/blog/images/foo.png`).
4. Prefer **`$inline$`** and **`$$ display $$`** for math (MDX can choke on some `\(` `\)` forms).
5. Run **`npm run build:site`** before deploy so the post and `posts.json` are merged into the Angular output.

### Routing note

Angular uses a catch‑all route that sends unknown paths to home. **Links to blog posts must be normal links**, e.g. `<a href="/blog/my-slug/">`, **not** `routerLink`, or the SPA will redirect to `/`.

Legacy **`/about`** and **`/cv`** routes stay available for old bookmarks but are not linked in the header.

## Deploy

1. Commit your changes.
2. Run **`npm run deploy`** (builds everything and pushes to `gh-pages`).
3. GitHub Pages should serve `gh-pages` from the repo settings (user site: `username.github.io`).

Ensure GitHub Pages uses the **`gh-pages`** branch (or adjust your workflow if you use Actions).
