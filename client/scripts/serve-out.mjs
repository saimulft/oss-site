// Serves out/ the way Cloudflare Pages does, for local checks: /dir/ serves dir/index.html, /dir redirects to /dir/,
// unknown paths get 404.html, and the rules in out/_headers are applied (exact paths and trailing * wildcards).
// Usage: npm start [-- --port 4321] [--no-csp]. --no-csp drops the CSP so QA scripts can be injected into the page.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const out = join(import.meta.dirname, '..', 'out');
const port = Number(process.argv[process.argv.indexOf('--port') + 1]) || 4321;
const noCsp = process.argv.includes('--no-csp');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

function parseHeaders(text) {
  const rules = [];
  for (const line of text.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^\s/.test(line)) rules.push({ pattern: line.trim(), headers: [] });
    else if (line.trim().startsWith('!')) {
      // `! Name` removes a header an earlier rule set, as on Cloudflare Pages.
      rules.at(-1)?.headers.push(['!', line.trim().slice(1).trim()]);
    } else {
      const at = line.indexOf(':');
      rules.at(-1)?.headers.push([line.slice(0, at).trim(), line.slice(at + 1).trim()]);
    }
  }
  return rules;
}
const rules = parseHeaders(await readFile(join(out, '_headers'), 'utf8').catch(() => ''));
const matches = (pattern, path) => (pattern.endsWith('*') ? path.startsWith(pattern.slice(0, -1)) : pattern === path);

async function isFile(path) {
  return (await stat(path).catch(() => null))?.isFile() ?? false;
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const path = decodeURIComponent(url.pathname);
  let file = normalize(join(out, path));
  if (!file.startsWith(out)) return res.writeHead(400).end();
  let status = 200;
  if (path.endsWith('/')) file = join(file, 'index.html');
  else if (!(await isFile(file)) && (await isFile(join(file, 'index.html')))) {
    return res.writeHead(308, { Location: `${path}/${url.search}` }).end();
  }
  if (!(await isFile(file))) {
    if (await isFile(`${file}.html`)) file = `${file}.html`;
    else {
      file = join(out, '404.html');
      status = 404;
    }
  }
  const headers = { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' };
  for (const rule of rules) {
    // Cloudflare applies only the wildcard rule to the 404 page.
    const applies = status === 200 ? matches(rule.pattern, path) : rule.pattern === '/*';
    if (!applies) continue;
    for (const [k, v] of rule.headers) {
      if (k === '!') delete headers[v];
      else if (!(noCsp && k === 'Content-Security-Policy')) headers[k] = v;
    }
  }
  res.writeHead(status, headers);
  res.end(req.method === 'HEAD' ? undefined : await readFile(file));
}).listen(port, () => console.log(`Serving out/ at http://localhost:${port}/`));
