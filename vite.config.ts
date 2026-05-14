// vite.config.ts - পুরো ফাইলটা এরকম হবে
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()];

  try {
    // @ts-ignore
    const m = await import("./.vite-source-tags.js");
    plugins.push(m.sourceTags());
  } catch {}

  return {
    base: "/",
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              "react",
              "react-dom",
              "react-router-dom",
              "framer-motion",
              "lucide-react",
            ],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
