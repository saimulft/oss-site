import type { NextConfig } from 'next';

// A static export: `npm run build` writes the whole site to `out/`, which Cloudflare Pages serves as is.
// `scripts/write-headers.mjs` runs after the build and writes `out/_headers` with a per-page CSP.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    // Pin the root to this app; a stray lockfile higher up the disk would otherwise be picked.
    root: import.meta.dirname,
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
