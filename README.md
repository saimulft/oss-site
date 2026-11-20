# oss.saimulislam.com

The hub for Saimul Islam's open-source npm packages: one page that lists all nine, and one page per package. A static Next.js site, exported to plain HTML and served by Cloudflare Pages.

## Layout

| Path                               | What it is                                                                                                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `client/`                          | The Next.js app (App Router, TypeScript strict, Tailwind v4)                                                                            |
| `client/src/content/packages.ts`   | Every word on the site: `hub` and one `PackagePage` per package. Empty fields hide their section                                        |
| `client/src/app/`                  | Routes: `/` (hub), `/[slug]/` (package pages), the 404 page, `sitemap.xml`, `robots.txt`, the manifest and `og/<slug>.png` share images |
| `client/public/_headers`           | Cloudflare Pages headers template (HSTS, nosniff, frame and referrer policy, caching)                                                   |
| `client/scripts/write-headers.mjs` | Runs after `next build`: adds a per-page Content-Security-Policy with hashes of each page's inline scripts to `out/_headers`            |
| `client/scripts/serve-out.mjs`     | Serves `out/` locally the way Cloudflare Pages does, `_headers` included                                                                |
| `docs/`                            | Planning notes (keywords and copy)                                                                                                      |

## Run it

Node 20 or newer.

```sh
cd client
npm install
npm run dev        # http://localhost:3000
```

## Checks

```sh
npm run lint          # ESLint and ls-lint (file names)
npm run typecheck     # next typegen, then tsc
npm run format:check  # Prettier
npm test              # content rules: title and description lengths, related slugs, no dashes
```

## Build and preview

```sh
npm run build   # writes out/ and out/_headers
npm start       # serves out/ at http://localhost:4321 with the real headers
```

`npm start -- --no-csp` serves the same files without the Content-Security-Policy, for QA scripts that inject code into the page.

Set `NEXT_PUBLIC_SITE_URL` to build canonical URLs, the sitemap and share images for another host. It defaults to `https://oss.saimulislam.com`.

## Deploy

Cloudflare Pages, connected to the GitHub repo:

| Setting                | Value                                                         |
| ---------------------- | ------------------------------------------------------------- |
| Root directory         | `client`                                                      |
| Build command          | `npm run build`                                               |
| Build output directory | `out`                                                         |
| Environment variable   | `NODE_VERSION=20` or newer (optional: `NEXT_PUBLIC_SITE_URL`) |

Then add the custom domain `oss.saimulislam.com` to the Pages project.

The Content-Security-Policy allows each page's inline scripts by hash, so it is rebuilt on every build. Never edit `out/_headers` by hand; change `public/_headers` or `scripts/write-headers.mjs`.

## Editing content

Change `client/src/content/packages.ts` and keep its types. `npm test` checks the SEO limits: titles of at most 60 characters and descriptions of 140 to 160. A package with an empty `title`, `description` or `h1` falls back to its name and tagline.
