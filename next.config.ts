import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static Export (output: "export") ist inkompatibel mit Supabase Auth (Route Handler,
   * Middleware, Server Components). Auf Vercel läuft normales Next.js ohne diese Option. */
  transpilePackages: ["@paper-design/shaders-react", "@paper-design/shaders"],
  images: {
    qualities: [75, 85, 92, 95],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "motion", "react-icons"],
  },
};

export default nextConfig;
