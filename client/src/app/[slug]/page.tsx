import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CodeBlock } from '@/components/code-block';
import { ArrowRight, ArrowUpRight, Github, PackageIcon, Plus } from '@/components/icons';
import { JsonLd } from '@/components/json-ld';
import { PackageCard } from '@/components/package-card';
import { PageHero } from '@/components/page-hero';
import { pageMetadata } from '@/lib/metadata';
import { absolute, author, getPackage, ogImagePath, packages, pagePath, seoFor } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/[slug]'>): Promise<Metadata> {
  const pkg = getPackage((await params).slug);
  if (!pkg) return {};
  const seo = seoFor(pkg);
  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: pagePath(pkg.slug),
    image: ogImagePath(pkg.slug),
    imageAlt: seo.h1,
  });
}

function SectionHead({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="m-0 text-[clamp(1.875rem,3vw,2.5rem)] leading-tight font-bold tracking-[-0.03em]">
      {children}
    </h2>
  );
}

const sectionClass = 'border-t-[1.5px] border-line pt-10 mt-14 first:mt-0 first:border-t-0 first:pt-0';

export default async function PackagePageView({ params }: PageProps<'/[slug]'>) {
  const pkg = getPackage((await params).slug);
  if (!pkg) notFound();
  const seo = seoFor(pkg);
  const url = absolute(pagePath(pkg.slug));
  const related = pkg.related.map(getPackage).filter((p) => p !== undefined);
  const readme = `${pkg.github}#readme`;

  const sections = [
    { id: 'overview', label: 'Overview', show: pkg.intro.length > 0 },
    { id: 'examples', label: 'Examples', show: pkg.examples.length > 0 },
    { id: 'features', label: 'Features', show: pkg.features.length > 0 },
    { id: 'cli', label: 'CLI', show: !!pkg.cli && pkg.cli.usage.length > 0 },
    { id: 'limits', label: 'Limits', show: pkg.limits.length > 0 },
    { id: 'faq', label: 'FAQ', show: pkg.faq.length > 0 },
    { id: 'links', label: 'Links', show: true },
    { id: 'related', label: 'Related packages', show: related.length > 0 },
  ].filter((s) => s.show);

  const graph: object[] = [
    {
      '@type': 'SoftwareSourceCode',
      name: pkg.name,
      description: seo.description,
      url,
      codeRepository: pkg.github,
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'Node.js',
      license: 'https://opensource.org/licenses/MIT',
      author: { '@type': 'Person', name: author.name, url: author.url, sameAs: [author.github] },
      sameAs: [pkg.npm],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Open-source packages', item: absolute('/') },
        { '@type': 'ListItem', position: 2, name: pkg.name, item: url },
      ],
    },
  ];
  if (pkg.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: pkg.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': graph }} />
      <PageHero>
        <nav aria-label="Breadcrumb" className="hero-rise pt-6 sm:pt-10">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-[0.9375rem] text-slate">
            <li>
              <Link href="/" className="text-link">
                Open-source packages
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{pkg.category}</li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-ink">
              {pkg.name}
            </li>
          </ol>
        </nav>
        <div className="grid gap-10 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-end lg:gap-14">
          <div>
            <h1 className="hero-rise m-0 text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1] font-bold tracking-[-0.045em] text-balance break-words">
              {seo.h1}
            </h1>
            <p className="hero-rise-2 mt-6 mb-0 max-w-[38rem] text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-relaxed text-ink">
              {pkg.tagline}
            </p>
            <div className="hero-rise-3 mt-9 flex flex-wrap gap-3">
              <a href={pkg.npm} className="btn btn-primary">
                <span className="btn-face">
                  <PackageIcon width={18} height={18} />
                  {pkg.name} on npm
                </span>
              </a>
              <a href={pkg.github} className="btn">
                <span className="btn-face">
                  <Github width={18} height={18} />
                  Source on GitHub
                </span>
              </a>
            </div>
          </div>
          <CodeBlock className="hero-rise-3" sample={{ title: 'Install', lang: 'sh', code: seo.install }} />
        </div>
      </PageHero>

      <div className="shell pad grid gap-12 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_16rem]">
        <main id="main" tabIndex={-1} className="min-w-0 outline-none">
          {pkg.intro.length > 0 && (
            <section aria-labelledby="overview" className={sectionClass}>
              <SectionHead id="overview">Overview</SectionHead>
              <div className="mt-6 flex max-w-[44rem] flex-col gap-5">
                {pkg.intro.map((para, i) => (
                  <p key={i} className="m-0 text-[1.125rem] leading-[1.7]">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          )}

          {pkg.examples.length > 0 && (
            <section aria-labelledby="examples" className={sectionClass}>
              <SectionHead id="examples">Examples</SectionHead>
              <div className="mt-8 flex flex-col gap-8">
                {pkg.examples.map((sample, i) => (
                  <CodeBlock key={i} sample={sample} />
                ))}
              </div>
            </section>
          )}

          {pkg.features.length > 0 && (
            <section aria-labelledby="features" className={sectionClass}>
              <SectionHead id="features">Features</SectionHead>
              <dl className="mt-8 mb-0 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {pkg.features.map((f, i) => (
                  <div key={f.title} className="reveal border-l-[3px] border-peach pl-5 sm:last:odd:col-span-2">
                    <dt className="flex items-baseline gap-3 text-[1.1875rem] font-bold tracking-[-0.015em]">
                      <span className="font-mono text-sm font-medium text-ember tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {f.title}
                    </dt>
                    <dd className="m-0 mt-2 text-base leading-relaxed text-slate">{f.body}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {pkg.cli && pkg.cli.usage && (
            <section aria-labelledby="cli" className={sectionClass}>
              <SectionHead id="cli">CLI usage</SectionHead>
              <CodeBlock className="mt-8" sample={{ title: 'Usage', lang: 'text', code: pkg.cli.usage }} />
              {pkg.cli.options.length > 0 && (
                <dl className="mt-8 mb-0 divide-y-[1.5px] divide-line overflow-hidden rounded-2xl border-[1.5px] border-ink">
                  {pkg.cli.options.map((o) => (
                    <div key={o.flag} className="grid gap-1 px-5 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                      <dt className="font-mono text-[0.9375rem] font-medium break-words">{o.flag}</dt>
                      <dd className="m-0 text-base leading-relaxed text-slate">{o.meaning}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          )}

          {pkg.limits.length > 0 && (
            <section aria-labelledby="limits" className={sectionClass}>
              <SectionHead id="limits">Limits</SectionHead>
              <ul className="mt-6 mb-0 max-w-[46rem] list-none space-y-4 p-0">
                {pkg.limits.map((l) => (
                  <li key={l} className="relative pl-7 text-[1.0625rem] leading-relaxed">
                    <span aria-hidden="true" className="absolute top-[0.6em] left-0 size-2.5 rounded-[3px] bg-ink" />
                    {l}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {pkg.faq.length > 0 && (
            <section aria-labelledby="faq" className={`faq ${sectionClass}`}>
              <SectionHead id="faq">Frequently asked questions</SectionHead>
              <div className="mt-6 border-t-[1.5px] border-ink">
                {pkg.faq.map((f) => (
                  <details key={f.q} className="border-b-[1.5px] border-ink">
                    <summary className="flex items-center gap-4 py-5">
                      <h3 className="q m-0 flex-1 text-[1.1875rem] leading-snug font-semibold tracking-[-0.01em]">
                        {f.q}
                      </h3>
                      <span className="plus flex size-9 flex-none items-center justify-center rounded-full border-[1.5px] border-ink">
                        <Plus width={18} height={18} />
                      </span>
                    </summary>
                    <p className="m-0 max-w-[44rem] pr-12 pb-6 text-[1.0625rem] leading-relaxed text-slate">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="links" className={sectionClass}>
            <SectionHead id="links">Links</SectionHead>
            <ul className="mt-6 mb-0 grid list-none gap-3 p-0 sm:grid-cols-3">
              {[
                { href: pkg.npm, label: `${pkg.name} on npm`, icon: <PackageIcon /> },
                { href: pkg.github, label: `${pkg.name} source on GitHub`, icon: <Github /> },
                { href: readme, label: `Full ${pkg.name} README`, icon: <ArrowUpRight /> },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group flex h-full items-center gap-3 rounded-xl border-[1.5px] border-ink bg-white px-4 py-4 font-semibold transition-colors duration-250 hover:bg-mist"
                  >
                    <span className="flex size-9 flex-none items-center justify-center rounded-lg bg-midnight text-white">
                      {l.icon}
                    </span>
                    <span className="min-w-0 flex-1 break-words">{l.label}</span>
                    <ArrowRight
                      width={18}
                      height={18}
                      className="flex-none transition-transform duration-400 ease-out-soft group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="related" className={sectionClass}>
              <SectionHead id="related">Related packages</SectionHead>
              <ul
                className={`mt-8 mb-0 grid list-none gap-5 p-0 ${related.length === 2 ? 'sm:grid-cols-2' : 'lg:grid-cols-3'}`}
              >
                {related.map((p) => (
                  <li key={p.slug} className="reveal">
                    <PackageCard pkg={p} showCategory headingLevel={3} />
                  </li>
                ))}
              </ul>
              <p className="mt-8 mb-0">
                <Link href="/#packages" className="text-link font-semibold">
                  See all {packages.length} open-source packages
                </Link>
              </p>
            </section>
          )}
        </main>

        <aside aria-label="On this page" className="toc hidden lg:block">
          <div className="sticky top-8">
            <p className="lbl m-0 text-slate">On this page</p>
            <ul className="mt-4 mb-0 list-none border-l-[1.5px] border-line p-0">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-[1.5px] block border-l-[1.5px] border-transparent py-1.5 pl-4 text-[0.9375rem] text-slate hover:border-ink hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
