import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import { PageHero } from '@/components/page-hero';
import { packages, pagePath } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | Saimul Islam open source' },
  description: 'This page does not exist. Browse the nine open-source npm packages by Saimul Islam instead.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero>
        <main id="main" tabIndex={-1} className="max-w-[46rem] pt-12 outline-none sm:pt-20">
          <p className="lbl lbl-dot m-0 text-slate">Error 404</p>
          <h1 className="mt-6 mb-0 text-[clamp(2.75rem,6vw,5rem)] leading-none font-bold tracking-[-0.045em] text-balance">
            This page does not exist
          </h1>
          <p className="mt-6 mb-0 text-[1.1875rem] leading-relaxed">
            The address may be mistyped, or the page has moved. Every package has its own page at its npm name.
          </p>
          <div className="mt-9">
            <Link href="/" className="btn btn-primary">
              <span className="btn-face">
                Go to all packages
                <ArrowRight width={18} height={18} />
              </span>
            </Link>
          </div>
          <ul className="mt-10 mb-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
            {packages.map((p) => (
              <li key={p.slug}>
                <Link href={pagePath(p.slug)} className="text-link font-mono text-[0.9375rem]">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </PageHero>
    </>
  );
}
