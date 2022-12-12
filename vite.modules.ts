import { defineConfig } from 'vite';
import entries from './entries';

const fileName = {
  es: `.mjs`,
  cjs: `.cjs`,
};

export default defineConfig({
  base: './',
  build: {
    emptyOutDir: true,
    outDir: 'dist/components',
    sourcemap: true,
    lib: {
      entry: entries,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}${fileName[format]}`,     
    },
    target: 'esnext',
		minify: true,
  },
});
