import { Space_Grotesk, Syne } from "next/font/google";

export const demoSyne = Syne({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["700", "800"],
  variable: "--font-demo-syne",
});

export const demoSpaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-demo-space",
});

export const demoFontClassName = `${demoSyne.variable} ${demoSpaceGrotesk.variable}`;
