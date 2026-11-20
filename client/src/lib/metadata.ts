import type { Metadata } from 'next';
import { siteName } from './site';

/** Full metadata for one page. Next replaces nested objects such as openGraph rather than merging them, so every page sets all of it. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
}): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName, locale: 'en_US', url: path, title, description, images },
    twitter: { card: 'summary_large_image', title, description, images },
  };
}
