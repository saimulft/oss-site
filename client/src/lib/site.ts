import { hub, packages, type Category, type PackagePage } from '@/content/packages';

/** The public origin, for canonical URLs, the sitemap and Open Graph tags. Set NEXT_PUBLIC_SITE_URL to build for another host. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oss.saimulislam.com').replace(/\/$/, '');
export const siteName = 'Saimul Islam Open Source';

export const author = {
  name: 'Saimul Islam',
  url: 'https://saimulislam.com',
  github: 'https://github.com/saimulft',
  role: 'Forward Deployed Engineer and Solutions Architect',
};

/** Category order on the hub and in the footer. */
export const categories: Category[] = [
  'Web QA',
  'AI agents',
  'Documents',
  'Localization',
  'Maps and GPS',
  'Desktop apps',
];

export const absolute = (path: string) => `${siteUrl}${path}`;
export const pagePath = (slug: string) => `/${slug}/`;
export const ogImagePath = (slug: string) => `/og/${slug}.png`;

export function getPackage(slug: string): PackagePage | undefined {
  return packages.find((p) => p.slug === slug);
}

export function packagesIn(category: Category): PackagePage[] {
  return packages.filter((p) => p.category === category);
}

/** Title, description and H1 with fallbacks, so a package with only its tagline still gets unique metadata. */
export function seoFor(p: PackagePage) {
  return {
    title: p.title || `${p.name}: npm package by ${author.name}`,
    description: p.description || p.tagline,
    h1: p.h1 || p.name,
    install: p.install || `npm install ${p.slug}`,
  };
}

export { hub, packages };
