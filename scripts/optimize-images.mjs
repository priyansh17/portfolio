import { mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const output = new URL('../public/generated/', import.meta.url);
await mkdir(output, { recursive: true });

const images = {
  portrait: 'myImage.png',
  diary: 'dearDiaryProject.jpg',
  chatbot: 'chatbotsHealthcare.png',
  fintech: 'b2b react app.png',
  'hand-control': 'hand-tracking.png',
  'pg-life': 'pgLife.png',
  restaurant: 'restaurant_app.jpg',
};

for (const [name, file] of Object.entries(images)) {
  const source = new URL(`../src/media/${file}`, import.meta.url);
  for (const width of name === 'portrait' ? [160, 400] : [480, 960]) {
    const destination = new URL(`${name}-${width}.webp`, output);
    const fresh = await stat(destination).catch(() => null);
    if (fresh && fresh.mtimeMs >= (await stat(source)).mtimeMs) continue;
    await sharp(fileURLToPath(source)).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(fileURLToPath(destination));
  }
}

const social = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<rect width="1200" height="630" fill="#111715"/>
<circle cx="1080" cy="90" r="250" fill="none" stroke="#2d473c" stroke-width="2"/>
<circle cx="1080" cy="90" r="200" fill="none" stroke="#2d473c" stroke-width="2"/>
<text x="90" y="130" fill="#bce9a0" font-family="sans-serif" font-size="26">PRIYANSH CHOUDHARY / SOFTWARE ENGINEER</text>
<text x="90" y="300" fill="#f3f5ef" font-family="sans-serif" font-size="78" font-weight="bold">Building systems.</text>
<text x="90" y="400" fill="#bce9a0" font-family="sans-serif" font-size="78" font-weight="bold">Making an impact.</text>
<text x="90" y="545" fill="#a9b5ae" font-family="sans-serif" font-size="26">priyanshc.com</text></svg>`;
await sharp(Buffer.from(social)).png().toFile(fileURLToPath(new URL('social.png', output)));
console.log('Responsive images and social preview ready.');
