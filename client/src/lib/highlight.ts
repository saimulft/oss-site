import { codeToTokens, type BundledLanguage } from 'shiki';
import type { CodeSample } from '@/content/packages';

export interface Token {
  content: string;
  tone?: string;
}

// Shiki tokenises at build time with github-light. Each of that theme's colours maps to a class (`.tk-<tone>` in
// globals.css), so the HTML carries no inline styles and the CSP needs no 'unsafe-inline'.
const tones: Record<string, string> = {
  '#d73a49': 'kw',
  '#6f42c1': 'fn',
  '#005cc5': 'const',
  '#032f62': 'str',
  '#6a737d': 'comment',
  '#e36209': 'var',
  '#22863a': 'tag',
  '#b31d28': 'err',
};

const langs: Record<CodeSample['lang'], BundledLanguage | null> = {
  ts: 'ts',
  js: 'js',
  sh: 'shellscript',
  json: 'json',
  html: 'html',
  text: null,
};

export async function highlight(code: string, lang: CodeSample['lang']): Promise<Token[][]> {
  const shikiLang = langs[lang];
  if (!shikiLang) return code.split('\n').map((line) => [{ content: line }]);
  const { tokens } = await codeToTokens(code, { lang: shikiLang, theme: 'github-light' });
  return tokens.map((line) =>
    line.map((t) => ({ content: t.content, tone: t.color ? tones[t.color.toLowerCase()] : undefined })),
  );
}
