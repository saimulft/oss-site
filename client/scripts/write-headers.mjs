// After `next build`: give every HTML page a Content-Security-Policy that allows exactly its own inline scripts.
// A static export inlines the React Server Components payload as <script> tags, so the policy lists their SHA-256
// hashes instead of 'unsafe-inline'. Pages get a rule each in out/_headers. Cloudflare serves 404.html for any
// unknown path, which no path rule can target, so 404.html carries its policy in a <meta> tag instead.
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const out = join(import.meta.dirname, '..', 'out');

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) =>
      e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [],
    ),
  );
  return files.flat();
}

/** Hashes of the inline scripts the browser runs. JSON-LD and other data blocks never run, so they need none. */
function scriptHashes(html) {
  const hashes = new Set();
  for (const [, attrs, body] of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi)) {
    if (/\ssrc=/i.test(attrs ?? '')) continue;
    const type = /\stype=["']?([^"'\s>]+)/i.exec(attrs ?? '')?.[1]?.toLowerCase();
    if (type && type !== 'text/javascript' && type !== 'module') continue;
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }
  return [...hashes];
}

function policy(hashes, { meta = false } = {}) {
  return [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(' ')}`.trim(),
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    // frame-ancestors and upgrade-insecure-requests are ignored in a <meta> policy.
    ...(meta ? [] : ["frame-ancestors 'none'", 'upgrade-insecure-requests']),
  ].join('; ');
}

const rules = [];
for (const file of (await htmlFiles(out)).sort()) {
  const rel = relative(out, file).split(sep).join('/');
  let html = await readFile(file, 'utf8');
  const hashes = scriptHashes(html);
  if (rel === '404.html' || rel === '_not-found.html' || rel.startsWith('_not-found/')) {
    const tag = `<meta http-equiv="Content-Security-Policy" content="${policy(hashes, { meta: true })}">`;
    if (!html.includes('http-equiv="Content-Security-Policy"')) {
      html = html.replace(/<head>/i, `<head>${tag}`);
      await writeFile(file, html);
    }
    continue;
  }
  // index.html serves both /dir/ and /dir/index.html; Cloudflare redirects the second to the first.
  const path = '/' + rel.replace(/index\.html$/, '');
  rules.push(`${path}\n  Content-Security-Policy: ${policy(hashes)}`);
}

const template = await readFile(join(out, '_headers'), 'utf8');
await writeFile(
  join(out, '_headers'),
  `${template.trimEnd()}\n\n# Per-page policies, written by scripts/write-headers.mjs\n${rules.join('\n')}\n`,
);
console.log(`write-headers: ${rules.length} page policies, 404 policy in a meta tag`);
