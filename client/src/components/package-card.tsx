import Link from 'next/link';
import type { PackagePage } from '@/content/packages';
import { pagePath, shotPath } from '@/lib/site';
import { ArrowRight, Github, PackageIcon } from './icons';

/** A whole-card link to a package page, with its npm and GitHub links layered above the card link. */
export function PackageCard({
  pkg,
  showCategory = false,
  headingLevel = 3,
}: {
  pkg: PackagePage;
  showCategory?: boolean;
  headingLevel?: 2 | 3 | 4;
}) {
  const Heading = `h${headingLevel}` as 'h3';
  const lead = pkg.shots?.[0];
  return (
    <article className="card h-full p-6">
      {lead && (
        <div className="card-shot mb-5 overflow-hidden rounded-xl border-[1.5px] border-ink bg-mist">
          {/* Decorative here: the card link names the package, and the package page describes the picture.
              Plain img: the site is a static export with no image optimiser. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shotPath(pkg.slug, lead.still ?? lead.file)}
            alt=""
            width={lead.width}
            height={lead.height}
            loading="lazy"
            decoding="async"
            className="block aspect-[16/10] h-auto w-full object-cover object-top"
          />
        </div>
      )}
      {showCategory && <p className="lbl lbl-dot mb-4 text-slate">{pkg.category}</p>}
      <Heading className="m-0 flex items-start gap-3 text-[1.5rem] leading-tight font-bold tracking-[-0.025em]">
        <Link href={pagePath(pkg.slug)} className="card-link min-w-0 flex-1 break-words">
          <span className="card-title">{pkg.name}</span>
        </Link>
        <span className="card-arrow mt-1 flex size-8 flex-none items-center justify-center rounded-full bg-ink text-white">
          <ArrowRight width={18} height={18} />
        </span>
      </Heading>
      <p className="mt-3 mb-6 text-base leading-relaxed text-slate">{pkg.tagline}</p>
      <ul className="mt-auto flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[0.9375rem] font-semibold">
        <li>
          <a
            href={pkg.npm}
            className="card-sub inline-flex items-center gap-1.5 py-1 underline"
            aria-label={`${pkg.name} on npm`}
          >
            <PackageIcon width={17} height={17} />
            npm
          </a>
        </li>
        <li>
          <a
            href={pkg.github}
            className="card-sub inline-flex items-center gap-1.5 py-1 underline"
            aria-label={`${pkg.name} on GitHub`}
          >
            <Github width={17} height={17} />
            GitHub
          </a>
        </li>
      </ul>
    </article>
  );
}
