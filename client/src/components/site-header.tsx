import Link from 'next/link';
import { author } from '@/lib/site';
import { Github, Mark } from './icons';

/** The header row at the top of every hero box: the mark, the site name and three links. */
export function SiteHeader() {
  return (
    <header className="flex items-center gap-4 py-5 sm:py-6">
      <Link href="/" className="group flex min-w-0 items-center gap-3 rounded-lg">
        <Mark size={36} />
        <span className="flex min-w-0 items-baseline gap-2 leading-tight whitespace-nowrap">
          <span className="text-[1.0625rem] font-bold tracking-[-0.01em]">Saimul Islam</span>
          <span className="hidden font-mono text-[0.8125rem] text-slate sm:inline">/ open source</span>
        </span>
      </Link>
      <nav aria-label="Main" className="ml-auto">
        <ul className="m-0 flex list-none items-center gap-1 p-0 sm:gap-2">
          <li>
            <Link
              href="/#packages"
              className="rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-250 hover:bg-white"
            >
              Packages
            </Link>
          </li>
          <li className="hidden sm:block">
            <a
              href={author.url}
              className="rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-250 hover:bg-white"
            >
              About Saimul
            </a>
          </li>
          <li>
            <a
              href={author.github}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-250 hover:bg-white"
            >
              <Github width={18} height={18} />
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
