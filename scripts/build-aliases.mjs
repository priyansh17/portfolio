import { mkdir, writeFile } from 'node:fs/promises';
import { legacySections } from '../src/navigation.js';

const root = new URL('../dist/', import.meta.url);
const paths = ['portfolio', ...Object.keys(legacySections), ...Object.keys(legacySections).map(route => `portfolio/${route}`)];
for (const path of paths) {
  const folder = new URL(`${path}/`, root);
  await mkdir(folder, { recursive: true });
  const route = path.split('/').at(-1);
  const fallback = legacySections[route];
  const target = fallback && fallback !== 'home' ? `/#${fallback}` : '/';
  await writeFile(new URL('index.html', folder), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Portfolio has moved</title>
<link rel="canonical" href="https://priyanshc.com${target}">
</head><body><p>This page has moved. <a href="${target}">Continue to the portfolio</a>.</p>
<script>
const routes = ${JSON.stringify(legacySections)};
const fragment = location.hash.replace(/^#\\/?/, '').replace(/\\/$/, '');
const section = Object.hasOwn(routes, fragment) ? routes[fragment] : null;
const target = section ? (section === 'home' ? '/' : '/#' + section)
  : /^project-[a-z0-9-]+$/.test(fragment) ? '/#' + fragment : ${JSON.stringify(target)};
location.replace(target);
</script></body></html>`);
}

await writeFile(new URL('404.html', root), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Page not found | Priyansh Choudhary</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#111715;color:#f3f5ef;font:1.2rem system-ui}main{max-width:34rem;padding:2rem}a{color:#bce9a0}h1{font-size:3rem}</style>
</head><body><main><p>404 / WRONG TURN</p><h1>Not here. But not far.</h1><p>This page doesn't exist. The portfolio now lives on one page.</p><a href="/">Back to the portfolio</a></main></body></html>`);
console.log(`Created ${paths.length} legacy entry points and a genuine 404 page.`);
