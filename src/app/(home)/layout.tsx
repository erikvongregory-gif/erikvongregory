import { ParloThemeProvider } from "@/components/neu/parlo/ParloTheme";
import { parloFontClass } from "@/lib/parloFonts";
import "@/components/neu/parlo/ParloTheme.css";
import "@/components/neu-motion/neu-motion.css";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={parloFontClass}>
      <ParloThemeProvider>{children}</ParloThemeProvider>
    </div>
  );
}
