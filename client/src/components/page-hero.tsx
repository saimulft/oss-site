import type { ReactNode } from 'react';
import { SiteHeader } from './site-header';

/** The boxed hero on the dot-grid desk. The header row sits inside it, aligned to the page column. */
export function PageHero({ children }: { children: ReactNode }) {
  return (
    <div id="top" className="shell box desk mt-3 sm:mt-4 lg:mt-6">
      <div className="pad pb-12 sm:pb-16 lg:pb-20">
        <SiteHeader />
        {children}
      </div>
    </div>
  );
}
