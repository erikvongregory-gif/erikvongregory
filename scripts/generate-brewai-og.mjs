/**
 * Generates /public/og/brewai-og.png + brewai-og.jpg (1200×630)
 * Matches the neu-motion homepage: BrewAI mark, hero copy, amber underglow.
 * Run: node scripts/generate-brewai-og.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";

const W = 1200;
const H = 630;
const OUT = join(process.cwd(), "public", "og");

async function loadSyne() {
  // Static weight — variable fonts are unreliable in Satori
  const url =
    "https://cdn.jsdelivr.net/fontsource/fonts/syne@latest/latin-500-normal.ttf";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font fetch failed: ${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function whiteLogo() {
  const svg = await readFile(
    join(process.cwd(), "public", "brewai-logo-mark.svg"),
    "utf8",
  );
  const white = svg.replace(/fill="currentColor"/g, 'fill="#ffffff"');
  return sharp(Buffer.from(white))
    .resize(280, null, { fit: "inside" })
    .png()
    .toBuffer();
}

async function productPanel() {
  // Kampagne · Hyperreal (Lüne Bräu Anstoßen / Hafen) — Dashboard-Motiv
  return sharp(
    join(process.cwd(), "public", "neu-motion", "motifs", "kampagne-hyperreal-hafen.webp"),
  )
    .resize(560, H, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
}

function layout({ logoSrc, photoSrc }) {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#0a0a0a",
        fontFamily: "Syne",
        overflow: "hidden",
      },
    },
    // Amber underglow (neu-motion)
    h("div", {
      style: {
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 70% 55% at 28% 100%, rgba(212,104,48,0.22) 0%, rgba(212,104,48,0.06) 42%, transparent 70%)",
      },
    }),
    h("div", {
      style: {
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 40% 50% at 48% 0%, rgba(255,255,255,0.07) 0%, transparent 60%)",
      },
    }),

    // Left copy
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 680,
          height: "100%",
          padding: "48px 52px 44px 56px",
          position: "relative",
        },
      },
      h("img", {
        src: logoSrc,
        width: 152,
        height: 132,
        style: { width: 152, height: 132, objectFit: "contain" },
      }),
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 560,
          },
        },
        h(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              color: "#fafafa",
              fontSize: 48,
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
            },
          },
          h("span", { style: { display: "flex" } }, "Content, der nach"),
          h("span", { style: { display: "flex" } }, "Brauerei aussieht —"),
          h(
            "span",
            { style: { display: "flex", color: "rgba(250,250,250,0.72)" } },
            "nicht nach Vorlage.",
          ),
        ),
        h(
          "span",
          {
            style: {
              color: "rgba(250,250,250,0.55)",
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "0.01em",
            },
          },
          "Markenprofil · Motive · Freigabe — ab 79 €/Monat",
        ),
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        },
        h(
          "span",
          {
            style: {
              color: "rgba(250,250,250,0.4)",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            },
          },
          "brewai.de",
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fafafa",
              color: "#0a0a0a",
              borderRadius: 999,
              padding: "12px 22px",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            },
          },
          "KI für Brauereien",
        ),
      ),
    ),

    // Right photo with soft left fade
    h(
      "div",
      {
        style: {
          position: "absolute",
          top: 0,
          right: 0,
          width: 560,
          height: H,
          display: "flex",
        },
      },
      h("img", {
        src: photoSrc,
        width: 560,
        height: H,
        style: { width: 560, height: H, objectFit: "cover" },
      }),
      h("div", {
        style: {
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, #0a0a0a 0%, rgba(10,10,10,0.82) 12%, rgba(10,10,10,0.35) 32%, rgba(10,10,10,0) 52%)",
        },
      }),
    ),
  );
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const [font, logoBuf, photoBuf] = await Promise.all([
    loadSyne(),
    whiteLogo(),
    productPanel(),
  ]);

  const logoSrc = `data:image/png;base64,${logoBuf.toString("base64")}`;
  const photoSrc = `data:image/png;base64,${photoBuf.toString("base64")}`;

  const res = new ImageResponse(layout({ logoSrc, photoSrc }), {
    width: W,
    height: H,
    fonts: [{ name: "Syne", data: font, style: "normal", weight: 500 }],
  });

  const png = Buffer.from(await res.arrayBuffer());
  const pngPath = join(OUT, "brewai-og.png");
  const jpgPath = join(OUT, "brewai-og.jpg");

  await writeFile(pngPath, png);
  await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(jpgPath);

  // Keep SITE.ogImage path stable for caches that still hit the old filename
  // by also writing as the canonical brewai asset referenced in siteConfig.
  console.log("Wrote", pngPath);
  console.log("Wrote", jpgPath);
  console.log("bytes png", png.length, "jpg", (await readFile(jpgPath)).length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
