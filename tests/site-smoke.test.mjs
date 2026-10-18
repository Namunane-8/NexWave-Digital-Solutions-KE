import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const robots = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8');

test('public page routes and titles are defined', () => {
  for (const route of ['/', '/services', '/about', '/our-story', '/contact', '/privacy', '/store', '/404']) {
    assert.ok(app.includes(`'${route}'`), `missing route metadata for ${route}`);
  }
});

test('local clock updates and uses 12-hour time', () => {
  assert.match(app, /window\.setInterval\(\(\) => setNow\(new Date\(\)\), 1000\)/);
  assert.match(app, /hour12: true/);
  assert.match(app, /weekday: 'long'/);
  assert.match(app, /month: 'long'/);
  assert.match(app, /year: 'numeric'/);
});

test('contact form explains that automated delivery is not configured', () => {
  assert.match(app, /Automated message delivery is not configured yet/);
  assert.match(app, /type="email"/);
  assert.match(app, /required/);
  assert.match(app, /mailto:nexwavedigitalsolutions@gmail\.com/);
});

test('founder website and direct contact channels are linked', () => {
  assert.match(app, /https:\/\/www\.namunane\.co\.ke\//);
  assert.match(app, /mailto:nexwavedigitalsolutions@gmail\.com/);
  assert.match(app, /https:\/\/wa\.me\/254700670136/);
});

test('SEO entry metadata and sitemap are present', () => {
  assert.match(html, /<title>NexWave Digital Solutions/);
  assert.match(html, /name="description"/);
  assert.match(sitemap, /https:\/\/nexwavedigitalsolutions\.co\.ke\/services/);
  assert.match(robots, /Sitemap: https:\/\/nexwavedigitalsolutions\.co\.ke\/sitemap\.xml/);
});

test('the retired AI Build Lab is not presented in public page content', () => {
  assert.doesNotMatch(app, /AI Build Lab|six speculative AI concepts/i);
});

test('appearance selector supports Light, Dark and System with persistence', () => {
  assert.match(app, /nexwave-appearance/);
  assert.match(app, /value="light">Light/);
  assert.match(app, /value="dark">Dark/);
  assert.match(app, /value="system">System/);
  assert.match(app, /prefers-color-scheme: dark/);
  assert.match(app, /htmlFor="appearance-choice"/);
});

test('back-to-top is labelled, scroll-aware and respects reduced motion', () => {
  assert.match(app, /aria-label="Back to top"/);
  assert.match(app, /window\.scrollY > 360/);
  assert.match(app, /window\.scrollTo\(\{ top: 0, behavior: reduceMotion \? 'auto' : 'smooth' \}\)/);
  assert.match(app, /prefers-reduced-motion: reduce/);
});

test('theme, focus, responsive and reduced-motion styles are defined', () => {
  const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  assert.match(css, /:root\[data-theme="dark"\]/);
  assert.match(css, /\.back-to-top:focus-visible/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /width: 48px/);
});

test('store page hands off purchases to the known official Selar storefront', () => {
  assert.match(app, /function StorePage\(\)/);
  assert.match(app, /href="https:\/\/selar\.com\/m\/nexwave-digital-solutions1952019"/);
  assert.match(app, /payment-card details on this website/);
  assert.match(app, /route === '\/store' \? <StorePage \/>/);
});

test('mobile typography and narrow viewport breakpoints are present', () => {
  const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  assert.match(css, /@media \(max-width: 360px\)/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /font-size: 16px/);
  assert.match(css, /font-size: 18px/);
});
