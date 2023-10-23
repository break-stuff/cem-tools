import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';

// import "./build";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',

      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
      plugins: [dts({ rollupTypes: true })],
    },
  },
})