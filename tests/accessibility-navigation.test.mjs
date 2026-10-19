import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

test('display settings expose three text sizes and three appearance modes', () => {
  for (const label of ['Default', 'Large', 'Extra Large', 'Light', 'Dark', 'System']) assert.ok(app.includes(label), `missing ${label} display option`);
  assert.ok(app.includes('nexwave-text-size'));
  assert.ok(app.includes('nexwave-appearance'));
  assert.ok(app.includes('prefers-color-scheme: dark'));
  assert.ok(css.includes('data-text-size="large"'));
  assert.ok(css.includes('data-text-size="extra-large"'));
});

test('internal pages provide labelled breadcrumbs and contextual return links', () => {
  assert.ok(app.includes('aria-label="Breadcrumb"'));
  assert.ok(app.includes('aria-current="page"'));
  assert.ok(app.includes('← Back to Services'));
  assert.ok(app.includes('window.history.back()'));
  assert.ok(app.includes('servicePages[serviceRoute]'));
});

test('keyboard focus and reduced motion protections remain present', () => {
  assert.ok(css.includes(':focus-visible'));
  assert.ok(css.includes('prefers-reduced-motion: reduce'));
  assert.ok(app.includes('aria-controls="primary-navigation"'));
});
