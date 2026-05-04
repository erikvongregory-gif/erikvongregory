/**
 * Entfernt eine verwaiste `.next/lock` (z. B. nach abgebrochenem Build oder
 * wenn ein Cache `.next` mit alter Lock-Datei zurückbringt), damit `next build`
 * nicht mit "Another next build process is already running" abbricht.
 *
 * Hinweis: Läuft `next dev` im gleichen Projekt, hält der Prozess die Lock –
 * dann Dev-Server stoppen, dieses Skript ersetzt das nicht.
 */
import { unlink } from "node:fs/promises";
import { join } from "node:path";

const lockPath = join(process.cwd(), ".next", "lock");
try {
  await unlink(lockPath);
} catch (e) {
  if (e && e.code !== "ENOENT") throw e;
}
