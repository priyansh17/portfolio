import { beforeEach, describe, expect, it } from 'vitest';
import { legacyTarget, normalizeLegacyHash } from './navigation.js';

describe('legacy entry points', () => {
  it.each([
    ['/portfolio/', '', '/'],
    ['/portfolio/', '#/projects', '/#projects'],
    ['/portfolio/', '#/career', '/#experience'],
    ['/projects/', '', '/#projects'],
    ['/portfolio/skills/', '', '/#skills'],
    ['/mainPage', '', '/'],
    ['/', '#/education', '/#education'],
    ['/certificates/', '', '/#certifications'],
    ['/portfolio/', '#project-healthifyme', '/#project-healthifyme'],
    ['/portfolio/', '#https://example.com', '/'],
    ['/portfolio/', '#constructor', '/'],
    ['/portfolio/', '#__proto__', '/'],
  ])('maps %s %s to a same-origin destination', (path, hash, expected) => {
    expect(legacyTarget(path, hash)).toBe(expected);
  });

  beforeEach(() => window.history.replaceState(null, '', '/'));

  it('replaces an old hash route without leaving the custom-domain root', () => {
    window.history.replaceState(null, '', '/#/career');
    normalizeLegacyHash();
    expect(window.location.pathname).toBe('/');
    expect(window.location.hash).toBe('#experience');
  });

  it('preserves new section and project links', () => {
    window.history.replaceState(null, '', '/#project-dear-diary');
    normalizeLegacyHash();
    expect(window.location.hash).toBe('#project-dear-diary');
  });
});
