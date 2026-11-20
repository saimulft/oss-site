import { JsonLd } from '@/components/json-ld';
import { ArrowRight, Github } from '@/components/icons';
import { PackageCard } from '@/components/package-card';
import { PageHero } from '@/components/page-hero';
import { pageMetadata } from '@/lib/metadata';
import { absolute, author, categories, hub, ogImagePath, packages, packagesIn, pagePath, seoFor } from '@/lib/site';

export const metadata = pageMetadata({
  title: hub.title,
  description: hub.description,
  path: '/',
  image: ogImagePath('home'),
  imageAlt: hub.h1,
});

const facts = [
  { value: String(packages.length), label: 'npm packages' },
  { value: 'MIT', label: 'licence on every one' },
  { value: 'TypeScript', label: 'types included' },
  { value: 'Node 20+', label: 'and edge runtimes' },
];

/** Splits the H1 at its first " for " so the words after it get the peach marker. */
function Headline({ text }: { text: string }) {
  const at = text.indexOf(' for ');
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at + 5)}
      <span className="hl">{text.slice(at + 5)}</span>
    </>
  );
}

export default function HubPage() {
  const webQa = packagesIn('Web QA');
  const others = categories.filter((c) => c !== 'Web QA').flatMap((c) => packagesIn(c));
  const person = {
    '@type': 'Person',
    '@id': `${author.url}/#person`,
    name: author.name,
    url: author.url,
    sameAs: [author.github],
  };

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name: hub.title,
              description: hub.description,
              url: absolute('/'),
              author: { '@id': person['@id'] },
              mainEntity: {
                '@type': 'ItemList',
                numberOfItems: packages.length,
                itemListElement: packages.map((p, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  name: p.name,
                  description: seoFor(p).description,
                  url: absolute(pagePath(p.slug)),
                })),
              },
            },
            person,
          ],
        }}
      />
      <PageHero>
        <div className="max-w-[60rem] pt-10 sm:pt-16 lg:pt-20">
          <p className="lbl lbl-dot hero-rise m-0 text-slate">Open source on npm</p>
          <h1 className="hero-rise mt-6 mb-0 text-[clamp(2.75rem,6.2vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.045em] text-balance">
            <Headline text={hub.h1} />
          </h1>
          <div className="hero-rise-2 mt-8 flex max-w-[40rem] flex-col gap-4">
            {hub.intro.map((para, i) => (
              <p
                key={i}
                className={`m-0 text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-relaxed ${i === 0 ? 'text-ink' : 'text-slate'}`}
              >
                {para}
              </p>
            ))}
          </div>
          <div className="hero-rise-3 mt-10 flex flex-wrap gap-3">
            <a href="#packages" className="btn btn-primary">
              <span className="btn-face">
                Browse the packages
                <ArrowRight width={18} height={18} />
              </span>
            </a>
            <a href={author.github} className="btn">
              <span className="btn-face">
                <Github width={18} height={18} />
                Source on GitHub
              </span>
            </a>
          </div>
        </div>
        <dl className="hero-rise-3 mt-14 mb-0 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border-[1.5px] border-ink bg-ink sm:mt-16 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1 bg-white px-5 py-5 sm:px-6">
              <dt className="order-2 text-[0.9375rem] text-slate">{f.label}</dt>
              <dd className="order-1 m-0 text-[clamp(1.5rem,2.4vw,2.125rem)] leading-none font-bold tracking-[-0.03em] tabular-nums">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <main id="main" tabIndex={-1} className="outline-none">
        <section id="packages" aria-labelledby="packages-title" className="shell pad pt-20 sm:pt-28">
          <div className="max-w-[46rem]">
            <p className="lbl lbl-dot m-0 text-slate">Packages</p>
            <h2
              id="packages-title"
              className="mt-5 mb-0 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-none font-bold tracking-[-0.035em] text-balance"
            >
              Nine packages, grouped by the job they do
            </h2>
          </div>

          <div className="mt-12 border-t-[1.5px] border-line pt-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="m-0 text-[1.75rem] font-bold tracking-[-0.025em]">Web QA</h3>
              <p className="m-0 text-base text-slate">Scan, lint and preflight a site before and after it ships.</p>
            </div>
            <ul className="mt-6 grid list-none gap-5 p-0 sm:grid-cols-2 xl:grid-cols-4">
              {webQa.map((p) => (
                <li key={p.slug} className="reveal">
                  <PackageCard pkg={p} headingLevel={4} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 border-t-[1.5px] border-line pt-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="m-0 text-[1.75rem] font-bold tracking-[-0.025em]">AI agents, documents and more</h3>
              <p className="m-0 text-base text-slate">One focused package per category.</p>
            </div>
            <ul className="mt-6 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-6">
              {others.map((p, i) => (
                <li
                  key={p.slug}
                  className={`reveal ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === others.length - 1 ? 'sm:col-span-2' : ''}`}
                >
                  <PackageCard pkg={p} headingLevel={4} showCategory />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
