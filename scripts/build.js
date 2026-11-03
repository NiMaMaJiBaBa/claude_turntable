import { cp, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
const files = [
  'index.html', 'manifest.webmanifest', 'robots.txt', 'sw.js',
  'css/style.css', 'js/main.js', 'js/store.js', 'js/lib/core.js',
  'js/ui/wheel.js', 'js/ui/effects.js',
  'assets/icon.svg', 'assets/icon-192.png', 'assets/icon-512.png', '.nojekyll',
];

// Verify every source first; only public runtime assets are copied into dist.
await Promise.all(files.map(file => readFile(path.join(root, file))));
for (const file of files) {
  const destination = path.join(output, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(root, file), destination);
}
console.log(`Prepared ${files.length} public files in dist/`);
