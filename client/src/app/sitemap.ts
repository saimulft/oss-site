import type { MetadataRoute } from 'next';
import { absolute, lastRelease, packages, pagePath, releaseOf } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absolute('/'), lastModified: lastRelease, priority: 1 },
    ...packages.map((p) => ({
      url: absolute(pagePath(p.slug)),
      lastModified: releaseOf(p.slug)?.date,
      priority: p.intro.length > 0 ? 0.9 : 0.6,
    })),
  ];
}
