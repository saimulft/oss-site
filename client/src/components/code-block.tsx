import type { CodeSample } from '@/content/packages';
import { highlight } from '@/lib/highlight';
import { CopyButton } from './copy-button';

const langNames: Record<CodeSample['lang'], string> = {
  ts: 'TypeScript',
  js: 'JavaScript',
  sh: 'Shell',
  json: 'JSON',
  html: 'HTML',
  text: 'Output',
};

/** A code sample, highlighted at build time. Only the copy button ships JavaScript. */
export async function CodeBlock({ sample, className = '' }: { sample: CodeSample; className?: string }) {
  const lines = await highlight(sample.code, sample.lang);
  const title = sample.title ?? langNames[sample.lang];
  return (
    <figure className={`code ${className}`}>
      <figcaption className="flex min-h-13 items-center gap-3 border-b-[1.5px] border-ink bg-mist py-2 pr-2 pl-5">
        <span className="min-w-0 flex-1 text-[0.9375rem] leading-snug font-semibold">{title}</span>
        <span className="lbl hidden text-slate sm:inline">{langNames[sample.lang]}</span>
        {sample.lang !== 'text' && <CopyButton label={title.toLowerCase()} />}
      </figcaption>
      {/* A scrollable region gets focus so keyboard users can scroll long lines. */}
      <pre tabIndex={0} aria-label={title}>
        <code>
          {lines.map((line, i) => (
            <span key={i}>
              {line.map((t, j) =>
                t.tone ? (
                  <span key={j} className={`tk-${t.tone}`}>
                    {t.content}
                  </span>
                ) : (
                  t.content
                ),
              )}
              {i < lines.length - 1 ? '\n' : ''}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
