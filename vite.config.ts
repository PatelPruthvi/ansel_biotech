import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: __dirname,
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    // Keep React in one graph — aggressive manualChunks broke React 19 at runtime.
    // Route/DnaCanvas lazy imports already split pages + three.js safely.
    chunkSizeWarningLimit: 700,
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
    open: true,
  },
  preview: {
    port: 4173,
    host: "0.0.0.0",
  },
});
