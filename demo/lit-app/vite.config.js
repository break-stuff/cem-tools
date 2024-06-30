import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// import "./build";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"],
      name: "lit-app",
    },
    rollupOptions: {
      external: /^lit/,
      output: {
        globals: {
          lit: "Lit",
        },
      },
      plugins: [dts({ rollupTypes: true })],
    },
  },
});
