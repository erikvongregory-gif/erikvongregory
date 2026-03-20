#!/usr/bin/env node
/**
 * Generiert ein PDF aus dem E-Book HTML.
 * Verwendung: node scripts/generate-ebook-pdf.mjs
 * Ausgabe: public/ebook/ki-fuer-brauereien.pdf
 */

import { launch } from "puppeteer";
import { createServer } from "http";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve, sep } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const publicDir = resolve(projectRoot, "public");
const pdfPath = join(publicDir, "ebook", "ki-fuer-brauereien.pdf");

// Minimaler HTTP-Server damit Fonts/Styles laden
const server = createServer((req, res) => {
  const path = req.url === "/" ? "/ebook/ki-fuer-brauereien.html" : req.url;
  const relativePath = path.replace(/^\//, "").replace(/\?.*$/, "");
  if (relativePath.includes("..")) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }
  const file = resolve(publicDir, relativePath);
  const publicResolved = resolve(publicDir);
  if (!file.startsWith(publicResolved + sep) && file !== publicResolved) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }
  try {
    const data = readFileSync(file);
    const ext = file.split(".").pop();
    const types = { html: "text/html", css: "text/css", js: "application/javascript", ico: "image/x-icon", svg: "image/svg+xml", woff2: "font/woff2", ttf: "font/ttf" };
    res.setHeader("Content-Type", types[ext] || "application/octet-stream");
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const url = `http://127.0.0.1:${port}/ebook/ki-fuer-brauereien.html`;

console.log("Starte Server und Puppeteer…");
const browser = await launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();

await page.goto(url, {
  waitUntil: "networkidle0",
  timeout: 20000,
});

// Warte auf Fonts
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 500));

// PDF mit passenden Margins und A4
await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  margin: {
    top: "20mm",
    right: "20mm",
    bottom: "20mm",
    left: "20mm",
  },
});

await browser.close();
server.close();
console.log("PDF erstellt:", pdfPath);
