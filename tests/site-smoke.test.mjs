import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const robots = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8');

test('public page routes and titles are defined', () => {
  for (const route of ['/', '/services', '/about', '/our-story', '/contact', '/privacy', '/404']) {
    assert.ok(app.includes(`'${route}'`), `missing route metadata for ${route}`);
  }
});

test('local clock updates and uses 12-hour time', () => {
  assert.match(app, /window\.setInterval\(\(\) => setNow\(new Date\(\)\), 1000\)/);
  assert.match(app, /hour12: true/);
  assert.match(app, /weekday: 'short'/);
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
