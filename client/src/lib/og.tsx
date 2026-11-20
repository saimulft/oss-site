import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

// Static OFL fonts for the share images (the site itself loads its fonts through next/font).
const fontDir = join(process.cwd(), 'src/assets/fonts');

export const ogSize = { width: 1200, height: 630 };

/** A 1200x630 share image on the midnight ground with the dot grid: the mark, a label, the title and one line. */
export async function renderOgImage({
  label,
  title,
  line,
  command,
}: {
  label: string;
  title: string;
  line: string;
  command: string;
}) {
  const [display, mono] = await Promise.all([
    readFile(join(fontDir, 'bricolage-grotesque-bold.ttf')),
    readFile(join(fontDir, 'geist-mono-medium.ttf')),
  ]);
  const size = title.length > 34 ? 68 : title.length > 22 ? 84 : 104;
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '60px 72px',
        background: '#213343',
        backgroundImage: 'radial-gradient(rgba(217,226,234,0.16) 1.6px, transparent 1.6px)',
        backgroundSize: '28px 28px',
        color: '#ffffff',
        fontFamily: 'Bricolage Grotesque',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width="56" height="56" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="8" fill="#ffffff" />
          <path
            d="M12 10.5 6.5 16l5.5 5.5M20 10.5l5.5 5.5-5.5 5.5"
            fill="none"
            stroke="#213343"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="2.4" fill="#f2502a" />
        </svg>
        <span style={{ fontSize: 32, letterSpacing: '-0.01em' }}>Saimul Islam</span>
        <span style={{ fontFamily: 'Geist Mono', fontSize: 24, color: '#d9e2ea' }}>/ open source</span>
        <span
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'Geist Mono',
            fontSize: 20,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#d9e2ea',
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: 12, background: '#f2502a' }} />
          {label}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
        <div style={{ display: 'flex', fontSize: size, lineHeight: 1, letterSpacing: '-0.045em' }}>{title}</div>
        <div
          style={{ display: 'flex', marginTop: 26, fontSize: 30, lineHeight: 1.35, color: '#d9e2ea', maxWidth: 1000 }}
        >
          {line}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 40, gap: 20 }}>
          <div
            style={{
              display: 'flex',
              padding: '14px 24px',
              borderRadius: 14,
              background: '#ffffff',
              color: '#1b2633',
              fontFamily: 'Geist Mono',
              fontSize: 26,
            }}
          >
            {command}
          </div>
          <span style={{ fontFamily: 'Geist Mono', fontSize: 22, color: '#d9e2ea' }}>oss.saimulislam.com</span>
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: 'Bricolage Grotesque', data: display, weight: 700, style: 'normal' },
        { name: 'Geist Mono', data: mono, weight: 500, style: 'normal' },
      ],
    },
  );
}
