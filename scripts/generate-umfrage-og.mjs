/**
 * Generates /public/og/umfrage-og.png + umfrage-og.gif
 * Run: node scripts/generate-umfrage-og.mjs
 */
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const W = 1200;
const H = 630;
const OUT = join(process.cwd(), "public", "og");
const TMP = join(process.cwd(), ".tmp-umfrage-og");

const font = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

function layout(t) {
  // Button stays still — only ambience + progress animate
  const progress = 12 + 38 * (0.5 + 0.5 * Math.sin(t * Math.PI * 2 - 0.5));
  const orbY = Math.sin(t * Math.PI * 2) * 12;

  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        background: "#0a0f14",
        fontFamily: font,
        padding: "48px 64px 44px 64px",
        overflow: "hidden",
      },
    },
    // Atmosphere orbs
    h("div", {
      style: {
        position: "absolute",
        top: -80 + orbY,
        right: -40,
        width: 420,
        height: 420,
        borderRadius: 999,
        background:
          "radial-gradient(circle, rgba(224,122,64,0.28) 0%, rgba(224,122,64,0) 70%)",
      },
    }),
    h("div", {
      style: {
        position: "absolute",
        bottom: -120,
        left: -60,
        width: 380,
        height: 380,
        borderRadius: 999,
        background:
          "radial-gradient(circle, rgba(198,90,32,0.16) 0%, rgba(198,90,32,0) 70%)",
      },
    }),
    h("div", {
      style: {
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 45%)",
      },
    }),

    // Top row
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        },
      },
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 12 } },
        h("div", {
          style: {
            width: 7,
            height: 7,
            borderRadius: 999,
            background: "#e07a40",
          },
        }),
        h(
          "span",
          {
            style: {
              color: "#e07a40",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.18em",
            },
          },
          "BRANCHENUMFRAGE 2026",
        ),
      ),
      h(
        "span",
        {
          style: {
            color: "rgba(255,255,255,0.45)",
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "0.04em",
          },
        },
        "3–4 Minuten  ·  anonym",
      ),
    ),

    // Question block
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 28,
          position: "relative",
          maxWidth: 980,
        },
      },
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            color: "#fafaf9",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
          },
        },
        h("span", { style: { display: "flex" } }, "Wo verlieren Brauereien"),
        h(
          "span",
          { style: { display: "flex" } },
          "Zeit, Geld und ",
          h("span", { style: { color: "#e07a40", display: "flex" } }, "Sichtbarkeit?"),
        ),
      ),
      // Progress
      h(
        "div",
        {
          style: {
            display: "flex",
            width: 320,
            height: 5,
            borderRadius: 999,
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden",
          },
        },
        h("div", {
          style: {
            width: `${progress}%`,
            height: 5,
            borderRadius: 999,
            background: "linear-gradient(90deg, #c65a20, #f0a060)",
          },
        }),
      ),
    ),

    // Bottom: CTA + brand
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        },
      },
      h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 0 40px rgba(224,122,64,0.45), 0 14px 36px rgba(0,0,0,0.45)",
            background: "linear-gradient(135deg, #e07a40 0%, #c65a20 100%)",
            borderRadius: 999,
            padding: "20px 40px",
          },
        },
        h(
          "span",
          {
            style: {
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
            },
          },
          "Jetzt teilnehmen",
          h(
            "span",
            {
              style: {
                marginLeft: 14,
                display: "flex",
                fontSize: 28,
              },
            },
            "→",
          ),
        ),
      ),
      h(
        "span",
        {
          style: {
            color: "rgba(255,255,255,0.4)",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          },
        },
        "BrewAI",
      ),
    ),
  );
}

async function renderFrame(t, path) {
  const res = new ImageResponse(layout(t), { width: W, height: H });
  await writeFile(path, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await rm(TMP, { recursive: true, force: true });
  await mkdir(TMP, { recursive: true });

  const frames = 18;
  for (let i = 0; i < frames; i++) {
    const path = join(TMP, `frame-${String(i).padStart(2, "0")}.png`);
    await renderFrame(i / frames, path);
    console.log(`frame ${i + 1}/${frames}`);
  }

  // Still = rest pose (readable, not mid-squash)
  await writeFile(join(OUT, "umfrage-og.png"), await readFile(join(TMP, "frame-00.png")));

  const pattern = join(TMP, "frame-%02d.png").replace(/\\/g, "/");
  const palette = join(TMP, "palette.png").replace(/\\/g, "/");
  const gif = join(OUT, "umfrage-og.gif").replace(/\\/g, "/");

  let r = spawnSync(
    "ffmpeg",
    ["-y", "-framerate", "14", "-i", pattern, "-vf", "palettegen=max_colors=160:stats_mode=diff", palette],
    { encoding: "utf8" },
  );
  if (r.status !== 0) {
    console.error(r.stderr);
    process.exit(1);
  }

  r = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-framerate",
      "14",
      "-i",
      pattern,
      "-i",
      palette,
      "-lavfi",
      "paletteuse=dither=bayer:bayer_scale=2",
      "-loop",
      "0",
      gif,
    ],
    { encoding: "utf8" },
  );
  if (r.status !== 0) {
    console.error(r.stderr);
    process.exit(1);
  }

  await rm(TMP, { recursive: true, force: true });
  console.log("Wrote public/og/umfrage-og.png");
  console.log("Wrote public/og/umfrage-og.gif");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
