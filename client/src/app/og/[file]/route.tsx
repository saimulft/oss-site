import { notFound } from 'next/navigation';
import { renderOgImage } from '@/lib/og';
import { getPackage, hub, packages } from '@/lib/site';

// One share image per page, written to out/og/<slug>.png at build time.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ file: 'home.png' }, ...packages.map((p) => ({ file: `${p.slug}.png` }))];
}

const clip = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).replace(/[\s,.;:]+\S*$/, '')}…` : text;

export async function GET(_request: Request, { params }: RouteContext<'/og/[file]'>) {
  const slug = (await params).file.replace(/\.png$/, '');
  if (slug === 'home') {
    return renderOgImage({
      label: `${packages.length} npm packages`,
      title: 'Open-source npm packages',
      line: clip(hub.h1.replace(/^Open-source npm packages /, 'Small, typed TypeScript packages '), 110),
      command: 'MIT licensed · Node 20+',
    });
  }
  const pkg = getPackage(slug);
  if (!pkg) notFound();
  return renderOgImage({
    label: pkg.category,
    title: pkg.name,
    line: clip(pkg.tagline, 120),
    command: `npm install ${pkg.slug}`,
  });
}
