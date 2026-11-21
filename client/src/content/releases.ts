/**
 * The latest npm release of each package. Update the entry when a package ships: the sitemap's lastmod and
 * llms.txt read it, so search engines and AI assistants see when a page last changed.
 */
export const releases: Record<string, { version: string; date: string }> = {
  siteprobe: { version: '0.1.1', date: '2026-11-20' },
  'redirect-lint': { version: '0.1.1', date: '2026-11-20' },
  'static-preflight': { version: '0.1.1', date: '2026-11-20' },
  'translation-facts': { version: '0.1.1', date: '2026-11-20' },
  'gpx-privacy': { version: '0.1.1', date: '2026-11-20' },
  'mcp-guardrails': { version: '0.1.1', date: '2026-11-20' },
  'safe-html-pdf': { version: '0.1.1', date: '2026-11-20' },
  'viewport-qa': { version: '0.1.1', date: '2026-11-20' },
  'active-window-sessions': { version: '0.1.1', date: '2026-11-20' },
};
