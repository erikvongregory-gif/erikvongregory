import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static Export (output: "export") ist inkompatibel mit Supabase Auth (Route Handler,
   * Middleware, Server Components). Auf Vercel läuft normales Next.js ohne diese Option. */
  transpilePackages: ["@paper-design/shaders-react", "@paper-design/shaders"],
};

export default nextConfig;
