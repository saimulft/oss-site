'use client';

import { useRef, useState } from 'react';
import { Check, Copy } from './icons';

/** Copies the code of the block it sits in. The only client component on the site. */
export function CopyButton({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy(event: React.MouseEvent<HTMLButtonElement>) {
    const code = event.currentTarget.closest('figure')?.querySelector('code')?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border-[1.5px] border-ink bg-white px-3 text-sm font-semibold text-ink transition-colors duration-250 hover:bg-mist active:translate-y-px"
    >
      {copied ? <Check width={16} height={16} /> : <Copy width={16} height={16} />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
