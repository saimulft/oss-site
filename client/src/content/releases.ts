/**
 * The latest npm release of each package. Update the entry when a package ships: the sitemap's lastmod and
 * llms.txt read it, so search engines and AI assistants see when a page last changed.
 */
export const releases: Record<string, { version: string; date: string }> = {
  siteprobe: { version: '0.1.2', date: '2026-11-28' },
  'redirect-lint': { version: '0.1.2', date: '2026-11-28' },
  'static-preflight': { version: '0.1.2', date: '2026-11-28' },
  'translation-facts': { version: '0.1.2', date: '2026-11-28' },
  'gpx-privacy': { version: '0.1.2', date: '2026-11-28' },
  'mcp-guardrails': { version: '0.1.2', date: '2026-11-28' },
  'safe-html-pdf': { version: '0.1.2', date: '2026-11-28' },
  'viewport-qa': { version: '0.1.2', date: '2026-11-28' },
  'active-window-sessions': { version: '0.1.2', date: '2026-11-28' },
  'bug-finder': { version: '0.1.1', date: '2026-11-28' },
};
