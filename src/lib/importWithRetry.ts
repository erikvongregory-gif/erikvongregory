function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    const msg = String(error);
    return msg.includes("Loading chunk") || msg.includes("ChunkLoadError");
  }
  return (
    error.name === "ChunkLoadError" ||
    error.message.includes("Loading chunk") ||
    error.message.includes("Failed to fetch dynamically imported module")
  );
}

/** Einmaliger Reload bei veralteten HMR-Chunks (Dev); danach Fehler durchreichen. */
function reloadOnceOnStaleChunk(chunkId: string): void {
  if (typeof window === "undefined") return;
  const key = `evglab-chunk-reload:${chunkId}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  window.location.reload();
}

/**
 * Wrapper für `next/dynamic`-Imports — fängt veraltete Chunks nach HMR ab.
 */
export function importWithRetry<T>(factory: () => Promise<T>, chunkId: string, retries = 2): () => Promise<T> {
  return async () => {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await factory();
      } catch (error) {
        lastError = error;
        if (!isChunkLoadError(error)) throw error;
        if (attempt < retries) {
          await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
          continue;
        }
        reloadOnceOnStaleChunk(chunkId);
        throw error;
      }
    }
    throw lastError;
  };
}
