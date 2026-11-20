import type { MetadataRoute } from 'next';
import { absolute, packages, pagePath } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absolute('/'), priority: 1 },
    ...packages.map((p) => ({ url: absolute(pagePath(p.slug)), priority: p.intro.length > 0 ? 0.9 : 0.6 })),
  ];
}
