import { resolve } from 'path';
import { defineConfig } from 'vite';
import { name } from './package.json';
import dts from "vite-plugin-dts";

const getPackageName = () => {
  return (name.includes('@') ? name.split('/')[1] : name).replace('.', '-');
};

const NAME = 'BSN';

const mainFile = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.js`,
};

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  esbuild: {
    legalComments: 'none',
  },
  plugins: [
    dts({
      outDir: 'dist',
      copyDtsFiles: true,
      rollupTypes: true,
    })
  ],
  base: './',
  build: {
    emptyOutDir: true,
    target: 'ESNext',
    lib: {
      entry: [
        resolve(__dirname, 'src/index.ts'), // main file
      ],
      name: NAME,
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => mainFile[format]
    },
    sourcemap: true,
  },
});
