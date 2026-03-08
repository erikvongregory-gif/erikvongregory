/** Gemeinsame Scroll-Breakpoints – kompakt für schnelle, flüssige Übergänge */
export const HERO_END = 550;
/** Pause zwischen Hero und Section 2 */
export const SECTION2_NOTHING_GAP = 80;
export const SECTION2_FADE_START = HERO_END + SECTION2_NOTHING_GAP;
export const SECTION2_FADE_END = SECTION2_FADE_START + 380;
/** Section 2 zoomt aus */
export const SECTION2_ZOOM_START = SECTION2_FADE_END;
export const SECTION2_ZOOM_END = SECTION2_ZOOM_START + 420;
/** Pause zwischen Section 2 und 3 */
export const SECTION3_NOTHING_GAP = 100;
export const SECTION3_FADE_START = SECTION2_ZOOM_END + SECTION3_NOTHING_GAP;
export const SECTION3_FADE_END = SECTION3_FADE_START + 320;
/** Pause zwischen Section 3 und 4 */
export const SECTION4_NOTHING_GAP = 120;
export const SECTION4_FADE_START = SECTION3_FADE_END + SECTION4_NOTHING_GAP;
export const SECTION4_FADE_END = SECTION4_FADE_START + 280;
/** Section 3 blendet schnell aus */
export const SECTION3_FADE_OUT_DURATION = 80;
/** Section 4 Halt + Ausblendung */
export const SECTION4_HOLD = 400;
export const SECTION4_FADE_OUT_DURATION = 200;
/** Section 5 */
export const SECTION5_FADE_START = SECTION4_FADE_END + SECTION4_HOLD + SECTION4_FADE_OUT_DURATION;
export const SECTION5_FADE_END = SECTION5_FADE_START + 220;
/** Section 6 – bleibt sichtbar, schiebt sich beim Footer nach oben weg (kompakter für schnelleren Übergang zu Section 7) */
export const SECTION6_NOTHING_GAP = 30;
export const SECTION6_FADE_START = SECTION5_FADE_END + SECTION6_NOTHING_GAP;
export const SECTION6_FADE_END = SECTION6_FADE_START + 180;
/** Section 6 schiebt nach oben, bevor Footer überlappt */
export const SECTION6_SLIDE_UP_START = SECTION6_FADE_END + 80;
export const SECTION6_SLIDE_UP_DURATION = 280;

export function smoothStep(t: number) {
  return t * t * (3 - 2 * t);
}
