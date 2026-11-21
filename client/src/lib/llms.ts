// llms.txt and llms-full.txt (https://llmstxt.org): the site's content as plain Markdown, so AI assistants and
// answer engines can read every guide without parsing the HTML. Built from the same content as the pages.
import type { PackagePage } from '@/content/packages';
import {
  absolute,
  author,
  categories,
  hub,
  packages,
  packagesIn,
  pagePath,
  releaseOf,
  seoFor,
  siteName,
} from '@/lib/site';

const release = (p: PackagePage) => {
  const r = releaseOf(p.slug);
  return r ? `Latest version ${r.version}, released ${r.date}.` : '';
};

const fence = (lang: string, code: string) => `\`\`\`${lang}\n${code.trimEnd()}\n\`\`\``;

export function llmsTxt(): string {
  const sections = categories
    .map((c) => {
      const list = packagesIn(c)
        .map(
          (p) =>
            `- [${p.name}](${absolute(pagePath(p.slug))}): ${p.tagline} ${release(p)} npm: ${p.npm}. Source: ${p.github}.`,
        )
        .join('\n');
      return list ? `## ${c}\n\n${list}` : '';
    })
    .filter(Boolean);

  return (
    [
      `# ${siteName}`,
      `> ${hub.description}`,
      ...hub.intro,
      `Each package has a guide page with install steps, examples, options, limits and an FAQ. The full text of every guide is at ${absolute('/llms-full.txt')}.`,
      ...sections,
      `## Author\n\n- [${author.name}](${author.url}): ${author.role}. GitHub: ${author.github}. LinkedIn: ${author.linkedin}. npm: ${author.npm}.`,
    ].join('\n\n') + '\n'
  );
}

function packageMarkdown(p: PackagePage): string {
  const seo = seoFor(p);
  const parts = [
    `## ${p.name}`,
    `${seo.h1}.`,
    p.tagline,
    `Guide: ${absolute(pagePath(p.slug))}. npm: ${p.npm}. Source: ${p.github}. License: MIT. ${release(p)}`,
    ...p.intro,
    `### Install\n\n${fence('sh', seo.install)}`,
  ];
  if (p.examples.length > 0) {
    parts.push(
      `### Examples\n\n${p.examples.map((e) => [e.title && `${e.title}:`, fence(e.lang, e.code)].filter(Boolean).join('\n\n')).join('\n\n')}`,
    );
  }
  if (p.features.length > 0) {
    parts.push(`### Features\n\n${p.features.map((f) => `- ${f.title}: ${f.body}`).join('\n')}`);
  }
  if (p.cli) {
    parts.push(
      `### Command line\n\n${fence('sh', p.cli.usage)}\n\n${p.cli.options.map((o) => `- \`${o.flag}\`: ${o.meaning}`).join('\n')}`,
    );
  }
  if (p.limits.length > 0) parts.push(`### Limits\n\n${p.limits.map((l) => `- ${l}`).join('\n')}`);
  if (p.faq.length > 0) parts.push(`### FAQ\n\n${p.faq.map((f) => `**${f.q}**\n\n${f.a}`).join('\n\n')}`);
  return parts.join('\n\n');
}

export function llmsFullTxt(): string {
  const ordered = categories.flatMap((c) => packagesIn(c));
  return (
    [
      `# ${siteName}`,
      `> ${hub.description}`,
      ...hub.intro,
      `${packages.length} packages by ${author.name} (${author.url}), ${author.role}.`,
      ...ordered.map(packageMarkdown),
    ].join('\n\n') + '\n'
  );
}
