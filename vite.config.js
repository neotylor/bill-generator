/* eslint-env node */
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// manually define __dirname for ES module
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASE_PATH || '/', // ✅ base only for production
    server: {
      host: "::",
      port: "8080",
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
        {
          find: "lib",
          replacement: resolve(__dirname, "lib"),
        },
      ],
    },
    build: {
      outDir: "build",
      // emptyOutDir: true,
      // rollupOptions: {
      //   output: {
      //     entryFileNames: "assets/[name].js",
      //     chunkFileNames: "assets/[name].js",
      //     assetFileNames: "assets/[name].[ext]",
      //   },
      // },
    },
  }
});
