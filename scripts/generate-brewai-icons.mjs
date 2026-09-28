/**
 * Generates favicon / app icons from the BrewAI B-Markenzeichen.
 * Run: node scripts/generate-brewai-icons.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const markPng = path.join(root, "public", "brewai-mark-icon.png");

/** Nur das B (ohne Wordmark) aus brewai-logo-mark.svg — für SVG-Reminder */
function extractMarkPath() {
  const svg = readFileSync(path.join(root, "public", "brewai-logo-mark.svg"), "utf8");
  const match = svg.match(/<path fill-rule="evenodd" d="([^"]+)"/);
  if (!match) throw new Error("B-Mark path not found in brewai-logo-mark.svg");
  return match[1];
}

/**
 * B-Bounds im Source-SVG: x 152..509 (357), y 0..385 (385).
 * Zentriert mit ~14% Padding in 64×64.
 */
function buildMarkGroup(d, fill) {
  // scale so height fills 64 * 0.72
  const scale = (64 * 0.72) / 385;
  const w = 357 * scale;
  const h = 385 * scale;
  const x = (64 - w) / 2;
  const y = (64 - h) / 2;
  return `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(5)}) translate(-152 0)" fill="${fill}">
    <path fill-rule="evenodd" d="${d}"/>
  </g>`;
}

function buildIconSvg(d) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#0a0a0a"/>
  ${buildMarkGroup(d, "#fafafa")}
</svg>
`;
}

function buildReminderSvg(d) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#0a0a0a"/>
  <rect x="1.5" y="1.5" width="61" height="61" rx="12.5" fill="none" stroke="#d46830" stroke-width="3"/>
  ${buildMarkGroup(d, "#fafafa")}
</svg>
`;
}

async function rasterIcon(size) {
  const radius = Math.round(size * 0.22);
  const pad = Math.round(size * 0.14);
  const inner = size - pad * 2;

  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" rx="${radius}" fill="#0a0a0a"/>
    </svg>`,
  );

  const mark = await sharp(markPng)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Mark is light-on-transparent; ensure it's white enough on dark bg
  return sharp(bg)
    .composite([{ input: mark, left: pad, top: pad }])
    .png()
    .toBuffer();
}

const markPath = extractMarkPath();
const iconSvg = buildIconSvg(markPath);
const reminderSvg = buildReminderSvg(markPath);

writeFileSync(path.join(root, "public", "icon.svg"), iconSvg);
writeFileSync(path.join(root, "public", "icon-reminder.svg"), reminderSvg);
writeFileSync(path.join(root, "src", "app", "icon-reminder.svg"), reminderSvg);
console.log("wrote public/icon.svg + icon-reminder.svg");

const outputs = [
  { file: "public/icon.png", size: 512 },
  { file: "src/app/icon.png", size: 512 },
  { file: "public/icon-192.png", size: 192 },
  { file: "public/icon-512.png", size: 512 },
  { file: "public/apple-icon.png", size: 180 },
  { file: "src/app/apple-icon.png", size: 180 },
];

for (const { file, size } of outputs) {
  const buf = await rasterIcon(size);
  writeFileSync(path.join(root, file), buf);
  console.log(`wrote ${file} (${size}x${size})`);
}

const icoBuffers = await Promise.all([16, 32, 48].map((size) => rasterIcon(size)));
const { default: toIco } = await import("to-ico");
const ico = await toIco(icoBuffers);
for (const file of ["src/app/favicon.ico", "public/favicon.ico"]) {
  writeFileSync(path.join(root, file), ico);
  console.log(`wrote ${file}`);
}
