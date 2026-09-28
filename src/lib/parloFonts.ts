import { Geist_Mono, Syne } from "next/font/google";

export const parloSans = Syne({
  subsets: ["latin"],
  variable: "--font-parlo-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const parloMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-parlo-mono",
  display: "swap",
});

export const parloFontClass = `${parloSans.variable} ${parloMono.variable}`;
