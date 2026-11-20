import Link from 'next/link';
import { author, categories, packagesIn, pagePath } from '@/lib/site';
import { Mark } from './icons';

export function SiteFooter() {
  return (
    <footer className="shell box mt-4 mb-3 bg-mist sm:mb-4 lg:mb-6">
      <div className="pad grid gap-10 py-12 md:grid-cols-[1.1fr_2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 rounded-lg font-bold">
            <Mark size={32} />
            Saimul Islam / open source
          </Link>
          <p className="mt-4 mb-0 max-w-[26em] text-base text-slate">
            MIT-licensed npm packages for web QA, AI agents, documents, localization, maps and desktop apps.
          </p>
        </div>
        <nav aria-label="Packages" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {categories.map((category) => (
            <div key={category}>
              <p className="lbl m-0 text-slate">{category}</p>
              <ul className="mt-3 mb-0 list-none space-y-1.5 p-0">
                {packagesIn(category).map((p) => (
                  <li key={p.slug}>
                    <Link href={pagePath(p.slug)} className="text-link text-[0.9375rem] font-medium">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="pad flex flex-wrap items-center gap-x-6 gap-y-2 border-t-[1.5px] border-line py-5 text-[0.9375rem] text-slate">
        <p className="m-0">
          © {new Date().getFullYear()} {author.name}. Every package is MIT licensed.
        </p>
        <a href={author.url} className="text-link">
          saimulislam.com
        </a>
        <a href={author.github} className="text-link">
          GitHub
        </a>
        <a href="#top" className="text-link ml-auto">
          Back to top
        </a>
      </div>
    </footer>
  );
}
