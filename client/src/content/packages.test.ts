// Content rules from the copy brief. Runs with `npm test` (Node's test runner strips the types).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { hub, packages } from './packages.ts';

const slugs = new Set(packages.map((p) => p.slug));

test('nine packages with unique slugs and matching links', () => {
  assert.equal(packages.length, 9);
  assert.equal(slugs.size, 9);
  for (const p of packages) {
    assert.equal(p.npm, `https://www.npmjs.com/package/${p.slug}`);
    assert.equal(p.github, `https://github.com/saimulft/${p.slug}`);
    assert.ok(p.tagline.length > 0, `${p.slug}: tagline`);
  }
});

test('related slugs exist and never point at the page itself', () => {
  for (const p of packages) {
    for (const r of p.related) {
      assert.ok(slugs.has(r), `${p.slug}: unknown related slug ${r}`);
      assert.notEqual(r, p.slug);
    }
  }
});

test('titles and descriptions fit search results', () => {
  const pages = [{ slug: 'hub', title: hub.title, description: hub.description }, ...packages];
  const titles = new Set<string>();
  for (const p of pages) {
    if (!p.title) continue; // not written yet; the template falls back to name and tagline
    assert.ok(p.title.length <= 60, `${p.slug}: title is ${p.title.length} characters`);
    assert.ok(!titles.has(p.title), `${p.slug}: duplicate title`);
    titles.add(p.title);
    const n = p.description.length;
    assert.ok(n >= 140 && n <= 160, `${p.slug}: description is ${n} characters`);
  }
});

test('copy has no dashes used as punctuation', () => {
  const text = JSON.stringify({ hub, packages });
  assert.ok(!/[–—]/.test(text), 'found an en or em dash');
});
