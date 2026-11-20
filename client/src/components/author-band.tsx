import { author } from '@/lib/site';
import { ArrowUpRight, Github } from './icons';

/** The author block: a midnight box near the end of every page. Everything on it is white. */
export function AuthorBand() {
  return (
    <section aria-labelledby="author-title" className="shell box mt-20 bg-midnight text-white sm:mt-28">
      <div className="pad grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="lbl lbl-dot mb-5 text-fog">Author</p>
          <h2
            id="author-title"
            className="m-0 text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-bold tracking-[-0.035em] text-balance"
          >
            Built by {author.name}
          </h2>
          <p className="mt-5 mb-0 max-w-[38em] text-[1.125rem] leading-relaxed text-fog">
            {author.name} is a {author.role}. Several of these packages run in production on DeveloperLook, the
            Bundlewise CRM and Sitessa.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={author.url} className="btn btn-primary">
            <span className="btn-face">
              Visit saimulislam.com
              <ArrowUpRight width={18} height={18} />
            </span>
          </a>
          <a href={author.github} className="btn">
            <span className="btn-face">
              <Github width={18} height={18} />
              saimulft on GitHub
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
