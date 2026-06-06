import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const videoRangePlugin = {
  name: "video-range-headers",
  configureServer(server: import("vite").ViteDevServer) {
    server.middlewares.use((_req, res, next) => {
      const orig = res.setHeader.bind(res);
      res.setHeader = (name: string, value: string | number | readonly string[]) => {
        orig(name, value);
        if (String(name).toLowerCase() === "content-type") {
          const ct = String(value);
          if (ct.startsWith("video/") || ct.startsWith("audio/")) {
            orig("Accept-Ranges", "bytes");
          }
        }
        return res;
      };
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), videoRangePlugin],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "public"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["@sanity/ui", "sanity", "@sanity/client", "@sanity/image-url"],
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
    // For local dev of the /api/* serverless functions, run `vercel dev`
    // (it serves Vite + the functions on the same port — recommended).
    // If you'd rather use plain `yarn dev`, set VITE_API_PROXY=http://localhost:3001
    // and run the functions on a separate port.
    proxy: process.env.VITE_API_PROXY
      ? { "/api": { target: process.env.VITE_API_PROXY, changeOrigin: true } }
      : undefined,
  },
  build: {
    rollupOptions: {
      external: (id) => id === "sanity.config.ts" || id.endsWith("sanity.config.ts"),
    },
  },
});
