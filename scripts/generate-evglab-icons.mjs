import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = path.join(root, "public", "icon.svg");
const svg = readFileSync(svgPath);

const outputs = [
  { file: "public/icon.png", size: 512 },
  { file: "src/app/icon.png", size: 512 },
  { file: "public/icon-192.png", size: 192 },
  { file: "public/icon-512.png", size: 512 },
  { file: "src/app/apple-icon.png", size: 180 },
];

for (const { file, size } of outputs) {
  const out = path.join(root, file);
  await sharp(svg, { density: 300 }).resize(size, size).png().toFile(out);
  console.log(`wrote ${file} (${size}x${size})`);
}

const icoSizes = [16, 32, 48];
const icoBuffers = await Promise.all(
  icoSizes.map((size) => sharp(svg, { density: 300 }).resize(size, size).png().toBuffer()),
);

/** Einmalig: npm install --save-dev to-ico */
const { default: toIco } = await import("to-ico");
const ico = await toIco(icoBuffers);
for (const file of ["src/app/favicon.ico", "public/favicon.ico"]) {
  writeFileSync(path.join(root, file), ico);
  console.log(`wrote ${file}`);
}
