// Every word on the site comes from this file. The page templates read `hub` and `packages` and hide any section
// whose field is empty, so a package can go live with only its slug, name, category, tagline and links.

export type Category = 'Web QA' | 'AI agents' | 'Documents' | 'Localization' | 'Maps and GPS' | 'Desktop apps';

export interface CodeSample {
  title?: string;
  lang: 'ts' | 'js' | 'sh' | 'json' | 'html' | 'text';
  code: string;
}

export interface HubCopy {
  title: string;
  description: string;
  h1: string;
  intro: string[];
}

export interface PackagePage {
  slug: string; // npm name and URL path
  name: string;
  category: Category;
  title: string; // <title>, at most 60 characters
  description: string; // meta description, 140 to 160 characters
  h1: string;
  tagline: string; // one sentence under the H1, also the card text on the hub
  intro: string[]; // 1 to 3 paragraphs
  install: string;
  examples: CodeSample[];
  features: { title: string; body: string }[];
  cli?: { usage: string; options: { flag: string; meaning: string }[] };
  limits: string[];
  faq: { q: string; a: string }[];
  keywords: string[]; // target search terms; not rendered as meta keywords
  related: string[]; // slugs
  npm: string; // https://www.npmjs.com/package/<slug>
  github: string; // https://github.com/saimulft/<slug>
}

export const hub: HubCopy = {
  title: 'Open-source npm packages: web QA, MCP, PDF, GPX',
  description:
    'Nine MIT-licensed TypeScript packages by Saimul Islam for web QA, MCP server security, HTML to PDF, translation checks, GPX privacy and time tracking.',
  h1: 'Open-source npm packages for web QA, MCP servers, PDF and more',
  intro: [
    'Nine small TypeScript packages, each published on npm under the MIT licence. They cover web QA (security headers, redirects, broken links, responsive layout), MCP servers that let AI agents change data, HTML to PDF, i18n checks on translations, GPX privacy and time tracking from the active window.',
    'siteprobe runs the free security scanner on DeveloperLook, and safe-html-pdf renders the quotation PDFs in the Bundlewise CRM.',
    'Every package ships typed exports, documents its limits and runs on Node 20 or newer. Eight of the nine have no runtime dependencies.',
  ],
};

const links = (slug: string) => ({
  npm: `https://www.npmjs.com/package/${slug}`,
  github: `https://github.com/saimulft/${slug}`,
});

export const packages: PackagePage[] = [
  {
    slug: 'siteprobe',
    name: 'siteprobe',
    category: 'Web QA',
    title: 'Security headers checker and website scanner: siteprobe',
    description:
      'siteprobe is a security headers checker and website scanner. It runs about 100 security, SEO and speed checks with only fetch, as a zero-dependency npm CLI.',
    h1: 'siteprobe: a security headers checker that also scans SEO and speed',
    tagline:
      'A fetch-only security headers checker and website scanner: about a hundred security, SEO and speed checks, with a score and a fix hint for each finding.',
    intro: [
      'siteprobe is a security headers checker you run from the command line or from code. It fetches a page and the few files around it (robots.txt, sitemap.xml, security.txt and a sample of its CSS and JS), runs about a hundred security, SEO and speed checks, and returns a score, a grade and findings with evidence and a fix hint for each.',
      'It has no dependencies and no headless browser, so it runs anywhere fetch does: Node 20+, Cloudflare Workers, Deno and Bun. Lighthouse needs a headless Chrome and measures a rendered page, and Mozilla HTTP Observatory only looks at security headers. siteprobe reads the HTML and headers the server sends and covers security, SEO and speed in one pass.',
      'It powers the free security scanner at developerlook.com.',
    ],
    install: 'npm install siteprobe',
    examples: [
      { title: 'Scan a site without installing', lang: 'sh', code: 'npx siteprobe https://example.com' },
      {
        title: 'Sample output',
        lang: 'text',
        code: `siteprobe https://example.com

security   53/100  F  2 high, 4 medium, 4 low, 4 info, 13 passed

HIGH (2)
  [security] Content-Security-Policy header missing (missing-csp)
      Fix: Add a Content-Security-Policy header. Minimum: Content-Security-Policy: default-src 'self'
  [security] HSTS (HTTP Strict-Transport-Security) not configured (missing-hsts)
      Fix: Add: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`,
      },
      {
        title: 'Fail a CI build on medium findings or worse',
        lang: 'sh',
        code: 'npx siteprobe https://staging.example.com --fail-on medium',
      },
      {
        title: 'Run one scan from code',
        lang: 'ts',
        code: `import { scanSecurity } from 'siteprobe';

const result = await scanSecurity('https://example.com');
console.log(result.score, result.grade); // 53 'F'
for (const finding of result.findings) {
  console.log(finding.severity, finding.id, finding.remediation);
}`,
      },
      {
        title: 'Run several scans at once',
        lang: 'ts',
        code: `import { scan } from 'siteprobe';

const report = await scan('https://example.com', { checks: ['security', 'seo'], timeoutMs: 8000 });
console.log(report.results.security?.score, report.results.seo?.metrics.word_count);
console.log(report.errors); // a scan that fails lands here and the others still run`,
      },
      {
        title: 'Scan from a Cloudflare Worker',
        lang: 'ts',
        code: `import { scanSecurity } from 'siteprobe';

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url).searchParams.get('url') ?? '';
    const result = await scanSecurity(url, { ownHost: new URL(request.url).hostname });
    return Response.json(result);
  },
};`,
      },
    ],
    features: [
      {
        title: 'Security headers and more',
        body: 'Content-Security-Policy (missing, unsafe-inline, unsafe-eval), HSTS (missing, short max-age, no subdomains), clickjacking, Referrer-Policy, Permissions-Policy and cross-origin headers, plus cookies, CORS, HTTP methods, exposed files such as .env and .git/HEAD, leaked keys in the page source and open redirects.',
      },
      {
        title: 'SEO checks',
        body: 'Title and meta description, headings, noindex and robots.txt rules, canonical URL, Open Graph and Twitter tags, image alt text, lang, JSON-LD, hreflang, landmarks, the sitemap and a sample of internal links.',
      },
      {
        title: 'Speed checks',
        body: 'Time to first byte, HTML size, compression, caching, redirect chains, render-blocking assets, third-party hosts, lazy images, font-display and a sample of linked CSS and JS files.',
      },
      {
        title: 'Scores with evidence',
        body: 'Each scan returns a 0 to 100 score, a grade from A to F and findings sorted by severity. Every finding has a stable id, what the scan saw and how to fix it.',
      },
      {
        title: 'Zero dependencies',
        body: 'Only fetch, Headers, URL and TextDecoder, so the same code runs on Node 20+, Cloudflare Workers, Deno and Bun without a headless browser.',
      },
      {
        title: 'Passive mode',
        body: 'With --no-active (or active: false) it sends only ordinary GET requests and skips the probes for sensitive files, CORS reflection and redirect parameters.',
      },
    ],
    cli: {
      usage:
        'siteprobe <url> [--only security,seo,speed] [--json] [--fail-on high|medium|low|none] [--no-active] [--timeout ms]',
      options: [
        { flag: '--only <list>', meaning: 'Scans to run, comma-separated: security, seo, speed. Default: all three.' },
        { flag: '--json', meaning: 'Print the full report as JSON.' },
        {
          flag: '--fail-on <level>',
          meaning:
            'Exit 1 if a finding is at or above critical, high (default), medium or low. none never fails on findings.',
        },
        { flag: '--no-active', meaning: 'Send only ordinary GET requests.' },
        { flag: '--max-body <bytes>', meaning: 'Most bytes to read from any response. Default: 5242880 (5 MiB).' },
        {
          flag: '--timeout <ms>',
          meaning: 'Timeout for each request. Default: 3 to 15 seconds, depending on the request.',
        },
        { flag: '--allow-private', meaning: 'Allow localhost and private network addresses (refused by default).' },
        { flag: '--verbose', meaning: 'Also list info-level findings, which are advisory and never lower the score.' },
      ],
    },
    limits: [
      'It reads the HTML the server sends and runs no JavaScript, so a page that builds its content in the browser looks thin to it, as it does to many crawlers.',
      'The speed scan does not measure Core Web Vitals (LCP, CLS, INP). Timings come from wherever the scan runs and are one sample, not a median.',
      'It looks at one page. Broken-link and asset checks are samples: 6 links and 10 assets by default.',
      'Checks are heuristics tuned to avoid false alarms. It is not a vulnerability scanner or a penetration test, and it does not check TLS certificates, DNS or email security.',
      'Firewall and bot-protection pages are not scored: the scan throws a ScanError with the code not-a-page instead.',
      'The private-address check applies to the URL you pass in, not to where a redirect leads. If you accept URLs from untrusted users, add your own network-level protection.',
    ],
    faq: [
      {
        q: 'How do I check security headers from the command line?',
        a: 'Run npx siteprobe https://example.com --only security. It prints a score, a grade and each finding with the header to add or change. Add --json for the full report, or --fail-on medium to make the command exit 1 in CI.',
      },
      {
        q: 'Is siteprobe a CSP checker and HSTS checker?',
        a: 'It checks both as part of the security scan. For Content-Security-Policy it reports a missing header, unsafe-inline and unsafe-eval. For HSTS it reports a missing header, a short max-age and no includeSubDomains. Each finding has a fix hint. It does not check TLS certificates, DNS or email security.',
      },
      {
        q: 'How is siteprobe different from Lighthouse?',
        a: 'Lighthouse loads the page in a headless Chrome and measures the rendered result. siteprobe uses only fetch: it reads the headers and HTML the server sends, so it runs in places a browser cannot, such as a Cloudflare Worker, and it covers security headers that Lighthouse does not.',
      },
      {
        q: 'Can I scan a site I do not own?',
        a: 'Scan only sites you own or are allowed to test. By default siteprobe also requests well-known sensitive paths such as /.env and /admin, which can trip alarms. Use --no-active to send only ordinary GET requests.',
      },
      {
        q: 'Can I use it in CI?',
        a: 'Yes. The CLI exits 1 when a finding is at or above the --fail-on level (high by default), so npx siteprobe https://staging.example.com --fail-on medium fails the build on anything medium or worse. Staging servers on a private network need --allow-private.',
      },
    ],
    keywords: [
      'security headers checker',
      'check security headers',
      'csp checker',
      'hsts checker',
      'http security headers',
      'website security scanner',
      'lighthouse alternative without chrome',
    ],
    related: ['static-preflight', 'viewport-qa', 'redirect-lint'],
    ...links('siteprobe'),
  },
  {
    slug: 'redirect-lint',
    name: 'redirect-lint',
    category: 'Web QA',
    title: 'Redirect chain checker for _redirects files: redirect-lint',
    description:
      'redirect-lint is a redirect chain checker for _redirects, CSV and JSON rules. It finds loops, chains and clashes, then flattens each chain to one hop.',
    h1: 'redirect-lint: a redirect chain checker for _redirects, CSV and JSON',
    tagline:
      'Find redirect chains, loops and clashes in a whole rule set, then flatten every chain to one hop before you ship.',
    intro: [
      'redirect-lint is a redirect chain checker that reads the whole list at once. Give it a Netlify or Cloudflare Pages _redirects file, a CSV (including a WordPress Redirection export) or a JSON array, and it reports loops, chains, duplicates, rules that an earlier rule hides, and redirects that shadow pages you actually have.',
      "It can also collapse chains into one hop and write the result back out in any of the three formats. Netlify's @netlify/redirect-parser parses rules but does not check a rule set for loops, chains or clashes; that is the part this package does. It has no dependencies.",
    ],
    install: 'npm install redirect-lint',
    examples: [
      {
        title: 'Check a _redirects file against your built site',
        lang: 'sh',
        code: 'npx redirect-lint _redirects --pages dist',
      },
      {
        title: 'Sample output',
        lang: 'text',
        code: `_redirects (redirects, 10 rules)

Errors (1)
  line 6  loop  /team → /about/team → /team is a loop, so none of them is served.

Warnings (8)
  line 2   chain        /pricing-old → /pricing-2025 → /pricing. Served as /pricing-old → /pricing.
  line 4   clash        /blog/* covers 3 live pages, such as /blog/hello.
  line 5   shadowed     /blog/hello is never reached: /blog/* (line 4) matches the same paths first on hosts that use the first match.
  line 5   clash        /blog/hello is a live page. The redirect hides it on hosts that apply redirects first.
  line 10  unsupported  /search?q=shoes: Query strings in the From are not supported. Matching on query parameters needs the host.
  line 11  clash        /contact is a live page. The redirect hides it on hosts that apply redirects first.
  line 12  unsupported  /api/*: 200 rewrites and proxies are not redirects, so they are not checked.
  line 13  chain        /old-contact → /contact → /contact-us. Served as /old-contact → /contact-us.

1 error, 8 warnings in 10 rules.`,
      },
      {
        title: 'Flatten chains and write the cleaned rules',
        lang: 'sh',
        code: 'npx redirect-lint _redirects --flatten --out dist/_redirects',
      },
      {
        title: 'Use it from code',
        lang: 'ts',
        code: `import { parseRedirects, lint, flatten, toRedirects } from 'redirect-lint';

const { rules, problems: parseProblems } = parseRedirects(text);
const problems = lint(rules, { livePaths: ['/about', '/blog/hello'] });

const { rules: flat } = flatten(rules);
await writeFile('_redirects', toRedirects(flat));`,
      },
    ],
    features: [
      {
        title: 'Loops and chains',
        body: 'A loop is an error and exits 1. A chain, where a target redirects again, is a warning that shows the path it takes and the single hop that flattening gives.',
      },
      {
        title: 'Flatten to one hop',
        body: 'Chains collapse to their final target, a chain into a 410 becomes a 410, and loops, malformed rules and repeated Froms are left out. Exact paths come first, then placeholders, then wildcards with the longest prefix first.',
      },
      {
        title: 'Duplicates and shadowed rules',
        body: 'Two rules with the same From, or a wildcard that matches everything a later rule does on hosts that take the first match, are reported with their line numbers.',
      },
      {
        title: 'Clashes with live pages',
        body: 'Point --pages at a built site folder and redirects that hide a page you actually have are reported, including wildcards that cover live pages.',
      },
      {
        title: 'CSV, _redirects and JSON',
        body: 'Read and write all three. Converting a WordPress Redirection export to a _redirects file is one command: redirect-lint wordpress-export.csv --flatten --out _redirects.',
      },
      {
        title: 'Import planning',
        body: 'planImport() compares an incoming rule list with the rules you already have and returns which rows are adds, updates or skips, plus the loops and clashes the import would cause.',
      },
    ],
    cli: {
      usage: 'redirect-lint <file> [--format csv|redirects|json] [--pages <dir>] [--flatten [--out <file>]] [--json]',
      options: [
        {
          flag: '-f, --format <type>',
          meaning: 'csv, redirects or json. Default: from the file name (_redirects, .csv, .json), then content.',
        },
        {
          flag: '--pages <dir>',
          meaning: 'A built site folder. Each .html file is a live page; redirects that hide one are reported.',
        },
        {
          flag: '--flatten',
          meaning: "Collapse chains and print the final rules in the file's format. The report goes to stderr.",
        },
        {
          flag: '--out <file>',
          meaning: 'With --flatten, write the rules to a file. A .csv, .json or _redirects name sets the format.',
        },
        { flag: '--max-rows <n>', meaning: 'Most rows a CSV file may have. Default: 5000.' },
        { flag: '--json', meaning: 'Print the result as JSON instead of text.' },
      ],
    },
    limits: [
      'It reads paths. Query matching, conditions, host-specific rules, regex rules and 200 rewrites are reported as unsupported and left out of the checks and out of anything flatten writes.',
      'A wildcard is a trailing /* and matches paths below the prefix, not the prefix itself: /blog/* matches /blog/post and not /blog. Check how your host treats the edge cases.',
      'Paths are case-sensitive and a trailing slash is ignored.',
      'Where two rules only partly overlap, it does not guess which one a request reaches.',
      'A 410 in a _redirects file loses the page it names, so toRedirects writes /410.html by default. Check that your host supports 410 rules.',
      'It never fetches anything. It cannot tell whether a target exists unless the page is in livePaths.',
    ],
    faq: [
      {
        q: 'How do I check a redirect chain before I deploy?',
        a: 'Run npx redirect-lint _redirects. Every chain is reported with the path it takes and the single hop it could be, and a loop is an error that makes the command exit 1. Add --flatten --out to write the cleaned-up rules.',
      },
      {
        q: 'Can it check a bulk list of redirects from a CSV?',
        a: 'Yes. It reads CSV as from,to,status[,note], with or without a header, semicolon or tab delimited, or a WordPress Redirection export. A CSV file may have 5000 rows by default; change that with --max-rows.',
      },
      {
        q: 'Does it work with Netlify and Cloudflare Pages _redirects files?',
        a: 'Yes. It parses the _redirects format, including wildcards (/blog/*), placeholders (/shop/:slug) and 410s, and writes it back out. Query-string rules and 200 rewrites are reported as unsupported.',
      },
      {
        q: 'Does it request my URLs to find redirect chains?',
        a: 'No. It reads your rules, not your live site, so it makes no network requests. That is why it can check a rule set before you deploy it, but it also cannot tell whether a target page exists unless you pass --pages.',
      },
    ],
    keywords: [
      'redirect chain checker',
      'bulk redirect checker',
      'netlify redirects',
      '_redirects file',
      '301 redirect checker',
      'redirect loop detection',
      'wordpress redirection export',
    ],
    related: ['static-preflight', 'siteprobe'],
    ...links('redirect-lint'),
  },
  {
    slug: 'static-preflight',
    name: 'static-preflight',
    category: 'Web QA',
    title: 'Broken link checker for static sites: static-preflight',
    description:
      'static-preflight is a broken link checker for static site builds. It also checks SEO basics, share cards, icons, JSON-LD and redirects in one pass.',
    h1: 'static-preflight: a broken link checker for your static site build',
    tagline:
      'A broken link checker and launch checklist for a static site build: SEO basics, links and assets, redirects, share cards, icons, JSON-LD and old-URL coverage.',
    intro: [
      'static-preflight is a broken link checker that runs on the HTML your build wrote, before you deploy. It works with Next.js (output: export), Astro, Eleventy, Hugo, or anything else that writes HTML files, and fails the build when a launch would go wrong: a page without a title or description, a broken internal link or image, a share card pointing at a missing file, an old URL that no longer lands anywhere.',
      'Link checkers such as linkinator look at links only, and html-validate looks at markup; neither knows about SEO basics, share cards, icons, JSON-LD or _redirects. This one does, in a single zero-dependency pass over a folder. It started as the pre-launch check run on every static site DeveloperLook ships.',
    ],
    install: 'npm install -D static-preflight',
    examples: [
      {
        title: 'Run it after the build',
        lang: 'json',
        code: `{
  "scripts": {
    "build": "next build",
    "postbuild": "static-preflight out"
  }
}`,
      },
      {
        title: 'Or run it once without installing',
        lang: 'sh',
        code: 'npx static-preflight out',
      },
      {
        title: 'A launch check for a site that replaces an old one',
        lang: 'sh',
        code: "static-preflight out --forbid-noindex --legacy-urls old-urls.txt --require-jsonld 'Product=/products/*'",
      },
      {
        title: 'Sample output',
        lang: 'text',
        code: `description (1)
  /contact/index.html: no meta description

alt (1)
  /menu/index.html: image without alt: /img/loaf.jpg

links (1)
  /contact/index.html: broken link /old-contact

anchors (1)
  /menu/index.html: anchor #pastries has no target

srcset (1)
  /products/sourdough/index.html: missing srcset image: /img/loaf@2x.jpg

stylesheets (1)
  /assets/site.css: missing file in url(): /img/bg.png

noindex (1)
  /contact/index.html: has a noindex robots tag

share-card (4)
  /contact/index.html: no og:title
  /contact/index.html: no og:description
  /contact/index.html: no og:image
  /contact/index.html: no twitter:card

jsonld (1)
  /products/sourdough/index.html: no Product JSON-LD

redirects (1)
  redirect /menu hides the page /menu

legacy-urls (2)
  old URL /product/rye-bread/ has no page and no redirect
  old URL /about-us/ has no page and no redirect

15 problems found. Checked 5 pages and 3 old URLs.`,
      },
      {
        title: 'Use it from code',
        lang: 'ts',
        code: `import { preflight } from 'static-preflight';

const { pages, problems } = preflight('out', {
  noindex: 'forbid',
  requireJsonLd: [{ type: 'Product', pattern: '/products/*' }],
});

for (const { check, page, message } of problems) console.log(\`\${check} \${page ?? ''} \${message}\`);
if (problems.length) process.exitCode = 1;`,
      },
    ],
    features: [
      {
        title: 'Internal link checker',
        body: 'Internal links must resolve to a built page, a file or a _redirects source, including splats and placeholders. Relative links and base href are followed, and #fragment links must point at an id or anchor on the same page.',
      },
      {
        title: 'Images, media and assets',
        body: 'img src, srcset candidates, video and audio files, linked stylesheets and the files their url() and @import point at, and script src files must exist in the folder.',
      },
      {
        title: 'SEO basics on every page',
        body: 'A non-empty title and meta description, exactly one h1, and an alt attribute on every image.',
      },
      {
        title: 'Share cards and icons',
        body: 'og:title, og:description, og:image and twitter:card are set, the image is a JPG or PNG that exists, and a favicon and an apple-touch-icon are linked and present.',
      },
      {
        title: 'JSON-LD',
        body: 'Every JSON-LD block must parse, and pages that match a path pattern must carry the type you require, such as Product on /products/*.',
      },
      {
        title: 'Redirects and old URLs',
        body: 'Redirect destinations must be built pages, no redirect may hide a page that exists, and every URL in a legacy list must still land on a page or a redirect.',
      },
      {
        title: 'noindex guard',
        body: '--forbid-noindex catches a noindex tag left on at launch (404 pages are exempt). --expect-noindex does the reverse for a site hidden before launch.',
      },
    ],
    cli: {
      usage:
        'static-preflight [dir] [--expect-noindex | --forbid-noindex] [--legacy-urls file] [--require-jsonld Type=/pattern/*] [--skip check,check] [--json]',
      options: [
        { flag: '[dir]', meaning: 'The built folder. Default: out.' },
        { flag: '--forbid-noindex', meaning: 'No page may carry a noindex robots tag, except 404 pages.' },
        { flag: '--expect-noindex', meaning: 'Every page must carry a noindex robots tag.' },
        {
          flag: '--legacy-urls <file>',
          meaning:
            'Old URLs that must still land somewhere: a JSON array, or a text file with one URL or path per line.',
        },
        {
          flag: '--require-jsonld <T=/p/*>',
          meaning: 'Pages matching the path pattern must carry JSON-LD of type T. Repeatable.',
        },
        { flag: '--skip <check,check>', meaning: 'Turn checks off. Repeatable.' },
        { flag: '--ignore <pattern>', meaning: 'Leave pages matching a URL path pattern out of every check.' },
        { flag: '--trailing-slash <rule>', meaning: 'forbid or require a trailing slash on links to pages.' },
        {
          flag: '--config <file>',
          meaning: 'Config file. Default: static-preflight.config.json in the working directory.',
        },
        { flag: '--json', meaning: 'Print the result as JSON instead of text.' },
      ],
    },
    limits: [
      'It reads the HTML your build wrote, not what a browser renders. A link, heading or meta tag added by JavaScript at runtime is invisible to it.',
      'External URLs are never fetched. It does not check that https://other.example is alive.',
      'Only a Netlify or Cloudflare Pages style _redirects file is read. Rules in vercel.json, netlify.toml, _headers or server config are not.',
      'A site served from a sub-path (a Next.js basePath, a GitHub Pages project site) is not supported.',
      'Only #fragment links within the same page are checked, not /other-page#section.',
      'The share image is judged by its extension and existence, not by its bytes or dimensions.',
      'It does not validate markup, measure title length or judge content. Use an HTML validator for markup.',
    ],
    faq: [
      {
        q: 'How do I find broken links on a static site before I deploy?',
        a: 'Build the site, then run npx static-preflight out (or the folder your build writes). Every broken internal link, image, stylesheet and script is listed with the page it is on, and the command exits 1 so a CI build fails.',
      },
      {
        q: 'Does it check external links?',
        a: 'No. It is an internal link checker: external URLs are never fetched, so a build does not fail because another site was down. It checks that internal links, anchors and files resolve inside the built folder.',
      },
      {
        q: 'What belongs on a website launch checklist for a static site?',
        a: 'The checks cover the usual ones: a title, description and single h1 on every page, alt text, working links and assets, share card tags and image, icons, valid JSON-LD, redirects that land on real pages, old URLs that still resolve, and no noindex left on at launch.',
      },
      {
        q: 'Which static site generators does it work with?',
        a: 'Any that write HTML files to a folder: Next.js with output: export, Astro, Eleventy and Hugo are the ones the README names. It needs Node 20 or later and has no runtime dependencies.',
      },
    ],
    keywords: [
      'broken link checker',
      'find broken links on website',
      'internal link checker',
      'website launch checklist',
      'static site seo',
      'static site checker',
      'check broken links before deploy',
    ],
    related: ['siteprobe', 'redirect-lint', 'viewport-qa'],
    ...links('static-preflight'),
  },
  {
    slug: 'viewport-qa',
    name: 'viewport-qa',
    category: 'Web QA',
    title: 'Responsive design testing from 390 to 3840: viewport-qa',
    description:
      'viewport-qa is a responsive design testing CLI. It loads a page in Chromium at each width and measures overflow, clipping, layout shift and image resolution.',
    h1: 'viewport-qa: responsive design testing with numbers, from 390 to 3840',
    tagline:
      'Responsive design testing that measures the layout at every viewport width: overflow, clipping, inconsistent insets and radii, low-resolution images and layout shift.',
    intro: [
      'viewport-qa loads a page in Chromium at each viewport width and measures the layout: horizontal overflow, clipped text, elements off-screen, images shown above their resolution, repeated images, layout shift, edge-touching bands, inconsistent insets and radii, and orphan grid rows.',
      'Every finding comes with a check id, a severity, a selector, the width and the numbers that triggered it. axe and Lighthouse check accessibility and performance, and visual-regression tools compare screenshots; none of them measures whether a layout stays consistent from phone to 4K. It runs on Playwright, from the command line or inside your own tests.',
    ],
    install: 'npm install viewport-qa playwright\nnpx playwright install chromium',
    examples: [
      {
        title: 'Test a page at two widths',
        lang: 'sh',
        code: 'viewport-qa overflow.html --widths 390,1440',
      },
      {
        title: 'Sample output',
        lang: 'text',
        code: `viewport-qa  overflow.html

390x844 @2x  1 error, 2 warnings
  error    horizontal-overflow  html
           Page scrolls sideways: scrollWidth 924px against a 390px viewport (534px too wide).
  warning  offscreen-element  div.wide
           Element runs 534px past the right edge (left 24, right 924, viewport 390).
  warning  edge-touching  div.wide
           Box (#fee2e2) touches the right edge of the viewport: left 24px, right -534px.

1440x900 @2x  no problems

1 error, 2 warnings across 2 widths.`,
      },
      {
        title: 'Check a URL from code',
        lang: 'ts',
        code: `import { checkUrl, hasProblems } from 'viewport-qa';

const result = await checkUrl('http://localhost:3000/pricing', {
  widths: [390, 1024, 1440],
  wait: { selector: 'main' },
  rules: ['pointer-cursor'],
});

for (const problem of result.problems) {
  console.log(problem.width, problem.check, problem.selector, problem.details);
}
if (hasProblems(result)) process.exitCode = 1;`,
      },
      {
        title: 'Use it inside a Playwright test',
        lang: 'ts',
        code: `import { test, expect } from '@playwright/test';
import { checkPage } from 'viewport-qa';

test('pricing layout holds', async ({ page }) => {
  await page.goto('/pricing');
  const result = await checkPage(page, { widths: [390, 1440] });
  expect(result.problems.filter((p) => p.severity === 'error')).toEqual([]);
});`,
      },
    ],
    features: [
      {
        title: 'Seven widths by default',
        body: 'It tests 390, 768, 1024, 1440, 1920, 2560 and 3840 pixels, or any widths you list. Widths below 768px are emulated as a phone, and the page is loaded fresh at every width.',
      },
      {
        title: 'Overflow and clipping',
        body: 'Horizontal overflow, elements crossing the left or right edge, and text cut off by overflow: hidden or a fixed-height parent with no ellipsis or line clamp.',
      },
      {
        title: 'Image resolution',
        body: 'Broken images, files chosen from srcset that are smaller than the rendered size times the device pixel ratio, and the same image file used more than once.',
      },
      {
        title: 'Layout shift',
        body: 'Cumulative layout shift since navigation, with a default threshold of 0.1.',
      },
      {
        title: 'Consistency checks',
        body: 'Edge-touching bands, panels that use more than one left and right inset or corner radius, and grids of equal items whose last row is partly filled.',
      },
      {
        title: 'Opt-in house rules',
        body: 'Rules such as pointer-cursor and no-native-select are off until you name them, so they encode your design style without surprising anyone else.',
      },
      {
        title: 'Thresholds you can change',
        body: 'Every number is a threshold. Override one with --threshold layoutShift=0.05, or print all of them with viewport-qa --list.',
      },
    ],
    cli: {
      usage: 'viewport-qa <url|file.html> [options]',
      options: [
        {
          flag: '-w, --widths <list>',
          meaning:
            'Viewport widths, comma separated. Add a height as 1440x900. Default: 390,768,1024,1440,1920,2560,3840.',
        },
        { flag: '--checks <list>', meaning: 'Objective checks to run, or none. Default: all.' },
        { flag: '--rules <list>', meaning: 'Opt-in house rules to run. Default: none.' },
        {
          flag: '--wait <selector|ms>',
          meaning: 'Wait for a selector to be visible, or for a number of milliseconds.',
        },
        { flag: '--threshold <n=v>', meaning: 'Override a threshold, for example layoutShift=0.05. Repeatable.' },
        { flag: '--fail-on <level>', meaning: 'Exit 1 on error (default) or on any warning.' },
        { flag: '--screenshots <dir>', meaning: 'Save one PNG per width. Add --full-page to capture the whole page.' },
        { flag: '--json', meaning: 'Print the result as JSON.' },
        { flag: '--list', meaning: 'List every check, rule and threshold.' },
      ],
    },
    limits: [
      'The checks are heuristics on numbers, not a judgment of design. Intentional choices are flagged too, such as full-bleed sections under edge-touching. Switch off the checks that do not fit.',
      'One state per width. Nothing is hovered, clicked or scrolled, so open menus, modals and content revealed on scroll are not measured.',
      'Only img and picture resolution is checked, not CSS background-image. SVG images are skipped.',
      'Layout shift counts every shift from navigation to measurement, including input-driven ones, and does not see shifts after the measurement.',
      'Shadow DOM and iframes are not entered. Colour and contrast are out of scope; use axe for contrast.',
      'Chromium only, through Playwright. Only Playwright 1.63 is tested.',
    ],
    faq: [
      {
        q: 'How do I test a website on different screen sizes?',
        a: 'Run viewport-qa with a URL or a local .html file. It loads the page at 390, 768, 1024, 1440, 1920, 2560 and 3840 pixels by default and prints what overflows, clips or shifts at each width. Pass --widths to choose your own.',
      },
      {
        q: 'Is it a visual regression testing tool?',
        a: 'No. Visual-regression tools compare screenshots against a baseline. viewport-qa has no baseline: it measures the layout of one page at each width and reports numbers. You can save a PNG per width with --screenshots, but it does not compare them.',
      },
      {
        q: 'Can it measure cumulative layout shift?',
        a: 'Yes. The layout-shift check reports cumulative layout shift since navigation and warns above 0.1 by default. It counts every shift up to the measurement, including input-driven ones, so treat it as a lab number.',
      },
      {
        q: 'How do I use it for Playwright responsive testing?',
        a: 'Call checkPage(page, { widths }) inside a Playwright test. It resizes and reloads the page for each width, runs the checks, then restores the page. Playwright 1.40 or newer is a peer dependency.',
      },
    ],
    keywords: [
      'responsive design testing',
      'responsive testing tool',
      'test website on different screen sizes',
      'playwright responsive testing',
      'cumulative layout shift',
      'visual regression testing alternative',
      'horizontal overflow checker',
    ],
    related: ['siteprobe', 'static-preflight'],
    ...links('viewport-qa'),
  },
  {
    slug: 'mcp-guardrails',
    name: 'mcp-guardrails',
    category: 'AI agents',
    title: 'MCP security guardrails for AI agents: mcp-guardrails',
    description:
      'mcp-guardrails adds MCP security to servers that let AI agents change data: dry run and confirm, signed preview tokens, version checks and undo, in TypeScript.',
    h1: 'mcp-guardrails: MCP security for servers that let AI agents change data',
    tagline:
      'AI agent guardrails for MCP servers: dry run and confirm, signed preview tokens, optimistic concurrency, revision undo and errors that teach the agent.',
    intro: [
      'An agent with write tools behaves like a fast, confident new hire. It retries calls that already succeeded, guesses field names, edits a record it read ten minutes ago, and runs a delete on the first try because nothing asked it to look first. The official MCP SDKs give you tool annotations, which are hints, but no dry-run and confirm flow, no preview tokens, no version checks and no undo.',
      'mcp-guardrails is that layer for MCP security, extracted from production servers. You define each tool once with a kind of read, write or destructive, and the package sets the MCP annotations and enforces the guard. It works with the official MCP TypeScript SDK through an optional entry point, and the same guardrails protect the MCP servers of Sitessa and the Bundlewise CRM.',
      'The core has no runtime dependencies and uses WebCrypto, so it runs on Node 20+ and on edge runtimes such as Cloudflare Workers.',
    ],
    install:
      'npm install mcp-guardrails\n# for the official SDK integration:\nnpm install @modelcontextprotocol/sdk zod',
    examples: [
      {
        title: 'A delete tool that needs a dry run and a preview token',
        lang: 'ts',
        code: `import { z } from 'zod';
import { createPreviewTokens, deleteIfUnchanged, notFound } from 'mcp-guardrails';
import { defineTool } from 'mcp-guardrails/sdk';

const tokens = createPreviewTokens({ secret: process.env.MCP_PREVIEW_SECRET! }); // 32+ bytes

const notesDelete = defineTool({
  name: 'notes_delete',
  kind: 'destructive', // with tokens: dryRun → previewToken → confirm
  idempotent: true,
  description: "Delete a note. Needs a dry run and the user's confirmation.",
  input: { id: z.string() },
  version: true, // adds a required expectedVersion argument
  tokens,
  actor,
  async plan({ id }) {
    const note = await notes.get(id);
    if (!note) throw notFound('note', id);
    return { deletes: { id, title: note.value.title, version: note.version } };
  },
  async run({ id }, extra, guard) {
    const deleted = await deleteIfUnchanged(notes, { id, expectedVersion: guard.expectedVersion });
    return { deleted: id, revisionId: deleted.revisionId };
  },
});`,
      },
      {
        title: 'What the agent sees: a delete without confirmation is refused',
        lang: 'text',
        code: `→ notes_delete { "id": "n1", "expectedVersion": 1 }
← isError: { "error": { "code": "confirmation_required",
    "message": "notes_delete needs confirm: true. Call notes_delete with dryRun: true first, show the user the plan, then call it again with the same arguments plus previewToken and confirm: true." } }`,
      },
      {
        title: 'A stale version is refused with the current one',
        lang: 'text',
        code: `→ notes_update { "id": "n3", "expectedVersion": 4, "patch": { "title": "New" } }
← isError: { "error": { "code": "version_conflict", "currentVersion": 6, "expectedVersion": 4,
    "message": "note \\"n3\\" was changed since you read it (current version 6, you sent 4). Read it again, redo your change on the current data, and pass the new version." } }`,
      },
    ],
    features: [
      {
        title: 'One definition per tool',
        body: "kind: 'read' | 'write' | 'destructive' sets the MCP annotations and the guard, so the hints and the enforcement cannot drift apart.",
      },
      {
        title: 'Dry run, then confirm',
        body: 'Destructive tools return a plan first and only act on confirm: true. The error for a missing confirmation tells the agent what to call next.',
      },
      {
        title: 'Signed preview tokens',
        body: 'The confirm call must carry an HMAC-SHA-256 token bound to the same action, resource, actor and arguments. Tokens expire after 15 minutes by default.',
      },
      {
        title: 'Optimistic concurrency',
        body: 'An expectedVersion argument is checked with an atomic compare-and-set, and a conflict error carries the current version so the agent can read again and retry.',
      },
      {
        title: 'Revisions with undo',
        body: 'A snapshot is saved before each change, history is capped at 30 per resource, secret fields are redacted on output, and revisions_list and revisions_restore give the agent an undo.',
      },
      {
        title: 'Errors that teach',
        body: 'Unknown fields and invalid options come back with the valid ones and a did-you-mean, and every refusal says what to do next.',
      },
      {
        title: 'Generated instructions',
        body: 'instructions() writes the rules for the agent from the tools you defined, so the text always matches what the server enforces.',
      },
    ],
    limits: [
      'The in-memory stores are references. They lose everything on restart and work within one process, so implement VersionedStore and RevisionStore on your database for production.',
      'Tokens are only as safe as the secret. Use at least 32 random bytes, keep it out of the repository, and rotate it by passing [newSecret, oldSecret].',
      'Tokens are not single-use. A token can confirm the same call more than once until it expires, so make the action idempotent or refuse repeats.',
      'Token claims are signed, not encrypted. The arguments are stored only as a hash.',
      'Version checks need an atomic write. The guarantee comes from your compareAndSet being atomic.',
      'Snapshots are stored unredacted so restore works. Encrypt secrets at rest in your RevisionStore.',
      'Annotations are hints. Clients may ignore destructiveHint; the guard is what refuses the call.',
    ],
    faq: [
      {
        q: 'How do I secure an MCP server that can change or delete data?',
        a: "Define each tool with mcp-guardrails. Mark deletes as kind: 'destructive' with preview tokens so they need a dry run and a signed token, add expectedVersion so stale edits are refused, and record revisions so a change can be undone. The agent gets an error that says what to do next.",
      },
      {
        q: 'What are guardrails for an AI agent that uses tools?',
        a: 'Checks that run on the server, outside the model, so they hold even when the agent guesses wrong. Here that means a dry run before a destructive call, a signed token tied to the previewed arguments, a version check on every update, and an undo log.',
      },
      {
        q: 'Does it work with the MCP TypeScript SDK?',
        a: 'Yes, through mcp-guardrails/sdk, which wraps registerTool for McpServer. It needs @modelcontextprotocol/sdk 1.32 or later and zod 4 as optional peer dependencies. The core package needs neither.',
      },
      {
        q: 'How does it keep a human in the loop for an agent?',
        a: 'A destructive tool refuses to act on the first call and returns a plan and a previewToken. The agent is told to show the plan to the user and call again with the same arguments, the token and confirm: true. The server enforces the two steps; showing the plan to a person is up to your client.',
      },
    ],
    keywords: [
      'mcp security',
      'llm guardrails',
      'ai agent guardrails',
      'mcp server typescript',
      'mcp typescript sdk',
      'human in the loop ai agent',
      'model context protocol',
    ],
    related: ['safe-html-pdf', 'translation-facts'],
    ...links('mcp-guardrails'),
  },
  {
    slug: 'safe-html-pdf',
    name: 'safe-html-pdf',
    category: 'Documents',
    title: 'Playwright PDF from untrusted HTML: safe-html-pdf',
    description:
      'safe-html-pdf turns untrusted or AI-written HTML into a PDF with Playwright. JavaScript and network off, hard limits, and a lint for overflow and broken images.',
    h1: 'safe-html-pdf: Playwright PDF rendering for untrusted or AI-written HTML',
    tagline:
      'Print HTML to PDF with Playwright and headless Chromium, with JavaScript and the network turned off, hard limits, and a layout lint for overflow and broken images.',
    intro: [
      'safe-html-pdf is a Playwright PDF renderer for HTML you do not fully trust. It prints HTML to a PDF in headless Chromium with JavaScript turned off and every network request refused. The page can only load the files you hand it through a resolveAsset callback.',
      'While the page is open it also checks the layout, per page or per slide, and reports overflow, text drawn outside the page and images that failed to load, so a bad document is caught before anyone opens it.',
      'html-pdf-node and puppeteer-html-pdf also print HTML to PDF, but they leave JavaScript and the network on and say nothing about the layout. That is fine for HTML you wrote yourself and the wrong default for HTML written by a model or a user. safe-html-pdf renders the quotation PDFs in the Bundlewise CRM.',
    ],
    install: 'npm install safe-html-pdf playwright\nnpx playwright install chromium',
    examples: [
      {
        title: 'Render a slide deck from code',
        lang: 'ts',
        code: `import { writeFile } from 'node:fs/promises';
import { createRenderer } from 'safe-html-pdf';

const renderer = createRenderer({ concurrency: 4 });

const { pdf, pages, warnings } = await renderer.render(html, {
  format: 'slides',
  pageSelector: 'section.slide',
});
await writeFile('deck.pdf', pdf);

for (const warning of warnings) console.warn(warning.message);
await renderer.close();`,
      },
      {
        title: 'One-shot render',
        lang: 'ts',
        code: `import { renderPdf } from 'safe-html-pdf';

const { pdf } = await renderPdf('<h1>Invoice</h1>', { format: 'Letter', margin: '15mm' });`,
      },
      {
        title: 'Serve only the files you choose',
        lang: 'ts',
        code: `const renderer = createRenderer({
  resolveAsset: (url) => (url.pathname === '/logo.png' ? { body: logoBytes, contentType: 'image/png' } : null),
});`,
      },
      {
        title: 'Render from the command line',
        lang: 'sh',
        code: 'safe-html-pdf proposal.html -o proposal.pdf --format slides --page-selector section.slide --assets assets',
      },
      {
        title: 'Sample output',
        lang: 'text',
        code: `Wrote proposal.pdf (3 pages, 15.1 KB)

5 warnings
  page 2  overflow          Page 2 overflows its 1280 x 720 area: div.card
  page 3  broken-image      Page 3: image failed to load: /team.png
  page 3  broken-image      Page 3: image failed to load: https://cdn.example.com/photo.jpg
  -       missing-asset     No file was served for the image request to http://document.invalid/team.png
  -       blocked-request   Blocked image request to https://cdn.example.com/photo.jpg`,
      },
    ],
    features: [
      {
        title: 'JavaScript off',
        body: 'JavaScript is disabled for the whole browser context: inline scripts, event handlers and javascript: URLs do not run, and noscript content is shown.',
      },
      {
        title: 'Network off',
        body: 'Only the page and the files resolveAsset returns are served. Every other request, whatever its type, scheme or port, is aborted and reported as blocked-request. file:// is never served.',
      },
      {
        title: 'Layout lint',
        body: 'After fonts and images load, with print styles applied, it reports overflow, text drawn outside the page and broken images, per page or per slide.',
      },
      {
        title: 'Hard limits',
        body: 'A per-render timeout closes the browser context, at most concurrency renders run at once, and at most queueLimit wait. Beyond that, render() rejects at once with QueueFullError.',
      },
      {
        title: 'Shared, self-healing browser',
        body: 'One Chromium starts on first use and starts again after it closes or crashes. Every render gets a fresh context, so cookies, cache and storage never carry over.',
      },
      {
        title: 'Typed errors',
        body: 'Every error the package throws on purpose extends SafeHtmlPdfError and has a code, such as RENDER_TIMEOUT, QUEUE_FULL or BROWSER_NOT_INSTALLED.',
      },
    ],
    cli: {
      usage: 'safe-html-pdf <input.html> [-o out.pdf] [options]',
      options: [
        { flag: '-o, --output <file>', meaning: 'PDF to write. Default: the input name with .pdf.' },
        {
          flag: '--format <format>',
          meaning: 'A4 (default), Letter, slides (1280x720) or WIDTHxHEIGHT, for example 1280x720 or 210mmx297mm.',
        },
        { flag: '--page-selector <css>', meaning: 'Elements that are the pages of a deck, for example section.slide.' },
        { flag: '--assets <dir>', meaning: "Serve the page's images, fonts and styles from this folder." },
        { flag: '--strict', meaning: 'Exit 1 when there are any warnings. The PDF is still written.' },
        { flag: '--json', meaning: 'Print the result as JSON.' },
        { flag: '--timeout <ms>', meaning: 'Stop a render that takes longer. Default: 30000.' },
      ],
    },
    limits: [
      'It is not an operating-system sandbox. For untrusted input, run it as an unprivileged user in a container.',
      'Time is the only per-render resource limit. There is no cap on HTML size, page count or memory, so put those in front of it if you need them.',
      'Pages that need JavaScript to show their content, such as charts and client-side frameworks, print empty.',
      'Web fonts from the network are never loaded. Text uses the fonts on the machine plus the ones you serve through resolveAsset.',
      'The lint only looks inside img elements. Background images and fonts that fail to load show up only as missing-asset or blocked-request.',
      'The queue and the concurrency limit belong to one renderer. Two renderers, or two processes, each have their own.',
    ],
    faq: [
      {
        q: 'How do I generate a PDF from HTML in Node with Playwright?',
        a: 'Install safe-html-pdf and playwright, run npx playwright install chromium, then call renderPdf(html) from code or run safe-html-pdf input.html from the command line. You get the PDF bytes, the page count and a list of layout warnings.',
      },
      {
        q: 'Why turn JavaScript off to make a PDF?',
        a: 'HTML written by a model or a user can contain scripts that read local files, call out to the network or change the page after you check it. With JavaScript and the network off, the PDF shows only the markup and the files you chose to serve.',
      },
      {
        q: 'Is it a Puppeteer HTML to PDF alternative?',
        a: 'It does the same job on Playwright. html-pdf-node and puppeteer-html-pdf leave JavaScript and the network on and report nothing about the layout. safe-html-pdf turns both off, limits time and concurrency, and lints each page or slide.',
      },
      {
        q: 'How do I add images and fonts to the PDF?',
        a: 'Serve them through resolveAsset, or point the CLI at a folder with --assets. A path that tries to leave the folder, through .. or a symbolic link, is refused and counts as a missing file. Playwright 1.40 or newer is a peer dependency.',
      },
      {
        q: 'Does it run in Docker?',
        a: 'Yes. In a container, or as root, Chromium may refuse to start with its sandbox on. Pass launch: { chromiumSandbox: false } and isolate the container yourself; the package never turns the sandbox off for you.',
      },
    ],
    keywords: [
      'playwright pdf',
      'html to pdf node',
      'puppeteer html to pdf',
      'generate pdf from html',
      'render untrusted html',
      'ai generated html to pdf',
      'pdf layout overflow check',
    ],
    related: ['mcp-guardrails', 'viewport-qa', 'static-preflight'],
    ...links('safe-html-pdf'),
  },
  {
    slug: 'translation-facts',
    name: 'translation-facts',
    category: 'Localization',
    title: 'Translation quality assurance for JSON: translation-facts',
    description:
      'translation-facts is translation quality assurance for i18n JSON files. It checks that numbers, prices, URLs and placeholders survive machine translation.',
    h1: 'translation-facts: translation quality assurance for numbers, prices and placeholders',
    tagline:
      'Translation quality assurance for the facts in a string: check that numbers, prices, percentages, URLs, emails and {placeholders} survive translation.',
    intro: [
      'A machine or AI translation can read fine and still change $49.99 to $59.99, drop 20%, translate {name} to {nom} or point a link at the wrong page. translation-facts is a translation checker for exactly that. It pulls the facts out of each source string (numbers, prices, percentages, URLs, emails, {placeholders} and terms you want kept) and checks that every one of them is still in the translation.',
      'Tools such as i18next-cli and i18n-check compare keys and placeholders, but not whether the numbers, prices and links inside the text survived. translation-facts has no dependencies and works on JSON message files (flat or nested, i18next and next-intl style) or on single strings, so it fits localization QA in CI.',
    ],
    install: 'npm install translation-facts',
    examples: [
      {
        title: 'Compare translation files with a source file',
        lang: 'sh',
        code: 'npx translation-facts en.json de.json fr.json --keep Acme',
      },
      {
        title: 'Sample output',
        lang: 'text',
        code: `de.json: 6 problems
  pricing.title: missing Acme (term)
  pricing.standard: changed $49.99 -> 49,99 € (price)
  pricing.discount: missing 20% (percent)
  pricing.contact: changed https://acme.example/pricing -> https://acme.example/preise (url)
  pricing.contact: changed sales@acme.example -> vertrieb@acme.example (email)
  cart.greeting: changed {name} -> {nom} (token)
fr.json: ok (6 keys checked)

6 problems in 1 of 2 files.`,
      },
      {
        title: 'Check one string',
        lang: 'ts',
        code: `import { compareFacts } from 'translation-facts';

compareFacts('Only $7 for 2 seats, save 20%', 'Nur $8 für 2 Plätze');
// {
//   missing: [{ kind: 'percent', value: '20%', key: 'percent:20%' }],
//   changed: [{ kind: 'price', from: { value: '$7', ... }, to: { value: '$8', ... } }],
//   extra: [],
// }`,
      },
      {
        title: 'Check a whole file from code',
        lang: 'ts',
        code: `import { readFileSync } from 'node:fs';
import { checkTranslations } from 'translation-facts';

const source = JSON.parse(readFileSync('en.json', 'utf8'));
const target = JSON.parse(readFileSync('de.json', 'utf8'));

const { ok, problems } = checkTranslations(source, target, { keepTerms: ['Acme'] });`,
      },
    ],
    features: [
      {
        title: 'Numbers in any notation',
        body: '1,000, 1.000, 1 000 and 1000 are one fact, and so are 7.50 and 7,5. Bengali, Thai, Devanagari and Arabic-Indic digits are read as Latin ones.',
      },
      {
        title: 'Prices with currency',
        body: 'A symbol or ISO code before or after the amount, so $49.99, 49,99 $ and 49.99 USD are one fact. The currency is part of the fact, so a silent conversion shows up as a change.',
      },
      {
        title: 'Percentages, URLs and emails',
        body: '20%, 20 % and 12,5% are percentages. URLs compare by host, path, query and hash, and emails compare case-insensitively.',
      },
      {
        title: 'Placeholders',
        body: '{name}, {{name}}, { name } and {{ user.name }} compare by bare name, so a translated placeholder such as {nom} is caught.',
      },
      {
        title: 'Terms to keep',
        body: 'Pass product names with --keep. They must appear unchanged, matched as whole words in any script. keepTermsFrom() reads them from a style guide line such as Keep in English: Acme, Free.',
      },
      {
        title: 'JSON message files',
        body: 'Flat and nested files can be mixed, and each target file is checked key by key against the source. The exit code is 1 when there are problems, so it fits CI.',
      },
    ],
    cli: {
      usage: 'translation-facts <source.json> <target.json> [more targets...] [--keep term,term] [--extra] [--json]',
      options: [
        {
          flag: '--keep <terms>',
          meaning: 'Terms that must appear unchanged, such as product names. Comma separated, can be repeated.',
        },
        { flag: '--extra', meaning: 'Also report facts a translation adds that the source does not have.' },
        { flag: '--json', meaning: 'Print the result as JSON instead of text.' },
        { flag: '-v, --version', meaning: 'Print the version.' },
        { flag: '-h, --help', meaning: 'Print the usage.' },
      ],
    },
    limits: [
      'It checks facts, not meaning or grammar. A translation can pass and still be wrong.',
      'Facts are compared as a set. How often a fact appears and where are not checked.',
      'A last group of exactly three digits after a separator reads as grouping, so 3.141 is read as 3141.',
      'Prices are recognised by symbol or ISO code only. Currency words and abbreviations such as kr or zł are not, so 49,99 zł is read as the number 49.99.',
      'Only {name} and {{name}} style placeholders are recognised. %s, %d, {0} and ICU message syntax are not parsed.',
      'Dates, times and phone numbers have no special handling, so a reformatted date such as 2026-11-20 to 20.11.2026 is reported as a problem.',
      'The CLI reads JSON files only. For other formats, parse them yourself and call checkTranslations.',
    ],
    faq: [
      {
        q: 'How do I check that a machine translation kept my prices and numbers?',
        a: 'Run npx translation-facts en.json de.json. For every key it compares the numbers, prices, percentages, URLs, emails and placeholders in the source string with the translation, and lists what is missing or changed.',
      },
      {
        q: 'Does it find missing translations?',
        a: 'No. Keys that are missing or empty in a target file are skipped, because that is a question for a key-parity tool. translation-facts checks the facts inside the strings that are there.',
      },
      {
        q: 'Can I use it for localization QA in CI?',
        a: 'Yes. The CLI exits 0 when there are no problems, 1 when it finds any and 2 for a usage or file error, and --json prints the problems in a structured form. It works on i18next and next-intl style JSON files.',
      },
      {
        q: 'Does it work as i18n testing for AI translations?',
        a: 'Yes, that is the use case it was built for: it was extracted from Sitessa, where it checks translations before they are saved. It does not judge fluency or meaning, so keep a human review for that.',
      },
    ],
    keywords: [
      'translation quality assurance',
      'localization qa',
      'translation checker',
      'localization testing',
      'i18n testing',
      'missing translations',
      'ai translation check',
    ],
    related: ['static-preflight', 'mcp-guardrails'],
    ...links('translation-facts'),
  },
  {
    slug: 'gpx-privacy',
    name: 'gpx-privacy',
    category: 'Maps and GPS',
    title: 'Edit a GPX file to trim and hide your start: gpx-privacy',
    description:
      'gpx-privacy edits a GPX file so you can share it: trim the first and last 500 m, simplify the track, compute distance and climb, and write a clean GPX file.',
    h1: 'gpx-privacy: edit a GPX file to trim your start and end before you share it',
    tagline:
      'Make GPX tracks safe to share: trim the start and end, simplify the track, compute distance and climb, and write a minimal clean GPX file.',
    intro: [
      'A recorded ride or run starts and ends at your front door. gpx-privacy edits a GPX file to fix that: it hides the first and last 500 m of the track (wherever along the track they recur), simplifies what is left, works out the distance, climb and duration, and writes a minimal GPX file with nothing but positions, heights and times.',
      'It is a library and a command-line tool with one runtime dependency. @tmcw/togeojson and gpxparser read GPX into GeoJSON or plain objects and leave the privacy step to you. gpx-privacy starts where they stop: it trims the ends, thins the line, and returns a clean file you can publish.',
    ],
    install: 'npm install gpx-privacy',
    examples: [
      {
        title: 'Trim a ride and write the public copy',
        lang: 'sh',
        code: 'npx gpx-privacy ride.gpx -o ride-public.gpx',
      },
      {
        title: 'Sample output',
        lang: 'text',
        code: `gpx-privacy: ride.gpx -> ride-public.gpx
  Trimmed   500 m from the start and the end
  Points    2,001 -> 500
  Distance  43.98 km
  Climb     343 m
  Descent   344 m
  Duration  1:40:00`,
      },
      {
        title: 'Trim, thin the line and drop timestamps',
        lang: 'sh',
        code: 'gpx-privacy ride.gpx -o ride-public.gpx --trim 300 --max-points 300 --drop-times',
      },
      {
        title: 'Use it from code',
        lang: 'ts',
        code: `import { makeShareable } from 'gpx-privacy';

const { gpx, stats, shared, points } = makeShareable(xml, { trim: 500, maxPoints: 500 });
// gpx: the clean document, stats.distance: metres of the whole ride, points: { input: 2001, output: 500 }`,
      },
    ],
    features: [
      {
        title: 'Trim the start and end',
        body: 'Every point within 500 m (or the radius you choose) of the first or last point is removed, anywhere on the track, so a long wait at home or a pass by the door halfway through never shows it.',
      },
      {
        title: 'Simplify the track',
        body: 'Douglas-Peucker ranks points by how much of the line shape they hold and keeps the best 500 by default, in order, plus the ends of every segment.',
      },
      {
        title: 'Distance, climb and duration',
        body: 'Stats for the whole track and for the file you share. Climb uses a 5 m hysteresis so GPS noise adds nothing, and a real hill does.',
      },
      {
        title: 'A rebuilt, minimal file',
        body: 'The GPX is written from the kept points, so waypoints, author, device and extension data from the original cannot carry over. Timestamps can be dropped with --drop-times.',
      },
      {
        title: 'Safe parsing',
        body: 'The XML parser runs with entity processing off, so a DOCTYPE cannot expand entities. Files over 10 MiB are refused before parsing.',
      },
      {
        title: 'Library and CLI',
        body: 'The library uses no Node APIs, so it also runs in browsers; only the CLI reads and writes files. The CLI never overwrites its input.',
      },
    ],
    cli: {
      usage: 'gpx-privacy <in.gpx> [-o out.gpx] [--trim 500] [--max-points N] [--drop-times] [--stats] [--json]',
      options: [
        { flag: '-o, --output <file>', meaning: 'Write the GPX to this file instead of stdout.' },
        {
          flag: '--trim <metres>',
          meaning: 'Hide this far around the start and the end. 0 hides nothing. Default: 500.',
        },
        { flag: '--max-points <n>', meaning: 'Keep at most this many points. Default: 500.' },
        { flag: '--drop-times', meaning: 'Leave the timestamps out of the GPX.' },
        { flag: '--stats', meaning: 'Print distance, climb, descent and duration to stderr.' },
        { flag: '--json', meaning: 'Print the stats as JSON to stderr (implies --stats).' },
      ],
    },
    limits: [
      "A trim hides where a ride starts and ends. It does not hide a workplace or a friend's house you pass, and a track that leaves 500 m from your door still shows the direction and the neighbourhood. It is not anonymisation.",
      'Heights and times are kept unless you ask otherwise. Times show when you leave and arrive; use --drop-times to leave them out. Heights are always kept.',
      'The stats of the whole track include the part that was hidden, so they reveal the true length of the ride. Use the shared figures for the file you publish.',
      '500 points is coarse for a long ride. Raise --max-points when you want more detail.',
      'Distance is flat 2D haversine, within roughly 0.5% of an ellipsoidal figure, so climb and descent will not match a given app or watch.',
      'Tracks and routes only: waypoints are ignored. GPX in, GPX out; TCX, FIT and KML are not read.',
    ],
    faq: [
      {
        q: 'How do I trim a GPX file?',
        a: 'Run npx gpx-privacy ride.gpx -o ride-public.gpx. It removes every point within 500 m of the start and the end, simplifies the rest to at most 500 points and writes a new GPX file. Change the radius with --trim.',
      },
      {
        q: 'Can I hide my home address on Strava or other sites?',
        a: 'It does the same job as a privacy zone, on the file itself: trim the track before you upload it. A trim hides where the ride starts and ends, not the neighbourhood, so choose a larger --trim if that matters. It is not anonymisation.',
      },
      {
        q: 'Is there a web editor for GPX files?',
        a: 'No. gpx-privacy is a command-line tool and a library. The library uses no Node APIs, so you can run it in a browser page of your own.',
      },
      {
        q: 'Can it convert GPX to GeoJSON?',
        a: 'No: GPX in, GPX out. parseGpx() returns the points and segments, so you can convert them yourself, or use @tmcw/togeojson, which reads GPX into GeoJSON.',
      },
    ],
    keywords: [
      'edit gpx file',
      'trim gpx file',
      'strava privacy zones',
      'gpx parser',
      'gpx simplify',
      'hide home location gpx',
      'remove timestamps from gpx',
    ],
    related: ['active-window-sessions', 'translation-facts'],
    ...links('gpx-privacy'),
  },
  {
    slug: 'active-window-sessions',
    name: 'active-window-sessions',
    category: 'Desktop apps',
    title: 'active-win time tracking: sessions per app and site',
    description:
      'active-window-sessions turns active-win and get-windows readings into clean time segments per app and website: it merges gaps, drops blips and respects idle.',
    h1: 'active-window-sessions: turn active-win readings into time per app and website',
    tagline:
      'Turn active-win style polling into clean time segments per app and per website: merges short gaps, drops blips, respects idle time, ignores system UI and totals each app.',
    intro: [
      'get-windows and active-win tell you which window is in front at one moment. Turning a stream of those readings into reliable time segments is left to you: gaps when the window flickers, blips from a notification, time the user was away, and system UI that is not an app. active-window-sessions does that part, so you can build time tracking and app usage tracking on top of an active-win reading.',
      'It merges short gaps, drops blips, cuts a segment at the last input when the user goes idle, ignores system UI, and adds up the totals per app and per website. The core has no dependencies and takes any sample function. It started as the app-tracking core of the Staffic desktop app.',
    ],
    install: 'npm install active-window-sessions get-windows',
    examples: [
      {
        title: 'Track an Electron app and total it by app and by site',
        lang: 'ts',
        code: `import { app, powerMonitor } from 'electron';
import { aggregate, createTracker, getWindowsSampler } from 'active-window-sessions';
import type { Segment } from 'active-window-sessions';

const segments: Segment[] = [];

const tracker = createTracker({
  sample: getWindowsSampler(),
  getIdleSeconds: () => powerMonitor.getSystemIdleTime(),
  onSegments: (batch) => segments.push(...batch),
});

app.whenReady().then(() => tracker.start());
app.on('before-quit', () => tracker.stop());

// Later, for example for today:
const startOfDay = new Date().setHours(0, 0, 0, 0);
console.log(aggregate(segments, { by: 'app', from: startOfDay }));
console.log(aggregate(segments, { by: 'host', from: startOfDay }));`,
      },
      {
        title: 'Run the same rules over samples you already have',
        lang: 'js',
        code: `import { aggregate, sessionize } from 'active-window-sessions';

const t0 = Date.parse('2026-03-02T09:00:00Z');
const at = (seconds, window, idleSeconds) => ({ at: t0 + seconds * 1000, window, idleSeconds });

const code = { app: 'Code', appId: 'com.microsoft.VSCode' };
const chrome = (url) => ({ app: 'Google Chrome', appId: 'com.google.Chrome', url });

const samples = [
  at(0, code),
  at(2, code),
  at(8, chrome('https://github.com/acme/app/pulls')),
  at(19, chrome('https://github.com/acme/app/issues'), 0),
  at(70, chrome('https://github.com/acme/app/issues'), 51), // idle for 51 s: the last input was at 19 s
];

const segments = sessionize(samples);
console.log(aggregate(segments, { by: 'host' }));
// [ { key: 'github.com', name: 'github.com', durationMs: 11000, segmentCount: 1 } ]`,
      },
    ],
    features: [
      {
        title: 'Merges short gaps',
        body: 'Segments of the same target closer together than 2 seconds become one, so a flicker does not split your time.',
      },
      {
        title: 'Drops blips',
        body: 'A segment shorter than 1 second is dropped, and a blip between two stretches of the same target does not stop them merging.',
      },
      {
        title: 'Respects idle time',
        body: 'When idle time reaches 50 seconds the open segment is cut at the last input, not when idle was noticed. A sleeping laptop does not log an hour in the front app.',
      },
      {
        title: 'Ignores system UI',
        body: 'Notification centers and similar macOS system windows do not end a segment. The default ignore list covers macOS system UI, and you can extend it.',
      },
      {
        title: 'Per app and per website',
        body: 'The target is the app plus, for browsers, the host. aggregate() totals by app or by host, largest first, for any time range.',
      },
      {
        title: 'macOS permission helpers',
        body: 'Helpers for Accessibility, Screen Recording and per-browser Automation, in active-window-sessions/macos. They take Electron objects as arguments, so nothing runs until you call it.',
      },
    ],
    limits: [
      'It is polling. Segment edges are only as accurate as the interval (2 seconds by default), and a window that comes and goes between two polls is not seen.',
      'Only the front window counts. Background tabs, a second monitor, and audio or meeting activity are not detected.',
      'Browser URLs come from get-windows, which reads them on macOS only, for the browsers it supports, and only with Accessibility and per-browser Automation granted.',
      'Linux works on X11 with xprop and xwininfo installed. Wayland has no active-window API.',
      'Idle time comes from the function you pass. Without getIdleSeconds, a user who walks away is counted as active until the window changes or goes stale.',
      "The default ignore list covers macOS system UI only. get-windows is never called by this package's tests, so check the adapter on a real machine before you rely on it.",
    ],
    faq: [
      {
        q: 'How do I get the active window in Node.js and track time on it?',
        a: 'Reading the window is get-windows, or active-win. This package starts after that: getWindowsSampler() wraps get-windows, createTracker() polls it every 2 seconds, and your onSegments callback receives finished time segments. toWindowInfo() converts an active-win result if you call it yourself.',
      },
      {
        q: 'How do I track time spent on apps and websites?',
        a: 'Call aggregate(segments, { by: "app" }) or { by: "host" }. You get a total in milliseconds and a segment count for each app or site, largest first. Hosts need a browser that get-windows can read, which means macOS with Accessibility and Automation granted.',
      },
      {
        q: 'What does it store, and is it an app usage tracker?',
        a: 'It is a library for building an app usage tracker, not an app. A segment holds the app name, an app identifier, the host of a browser URL and start and end times. Paths and query strings are dropped, window titles are never stored, and the library makes no network requests.',
      },
      {
        q: 'Does it work on Windows and Linux?',
        a: 'The segmenting core is plain JavaScript and runs anywhere. Window reading depends on get-windows: Linux needs X11 with xprop and xwininfo, and Wayland has no active-window API. The macOS permission helpers do nothing off macOS.',
      },
    ],
    keywords: [
      'active-win',
      'get active window nodejs',
      'app usage tracker',
      'track time spent on apps',
      'screen time tracker mac',
      'electron time tracking',
      'get-windows',
    ],
    related: ['gpx-privacy', 'mcp-guardrails'],
    ...links('active-window-sessions'),
  },
];
