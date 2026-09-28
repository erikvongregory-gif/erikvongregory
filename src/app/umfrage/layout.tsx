import { ParloThemeProvider } from "@/components/neu/parlo/ParloTheme";
import { MotionChrome } from "@/components/neu-motion/MotionChrome";
import { parloFontClass } from "@/lib/parloFonts";
import "@/components/neu/parlo/ParloTheme.css";
import "@/components/neu-motion/neu-motion.css";

export default function UmfrageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={parloFontClass}>
      <ParloThemeProvider>
        <MotionChrome perlage="hero">{children}</MotionChrome>
      </ParloThemeProvider>
    </div>
  );
}
