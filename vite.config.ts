import { resolve } from 'path';
import { defineConfig } from 'vite';
import { name } from './package.json';

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
  base: './',
  build: {
    emptyOutDir: true,
    lib: {
      entry: [
        resolve(__dirname, 'src/index.ts'), // main file
      ],
      name: NAME,
      formats: ['es', 'cjs', 'iife'],
      fileName: (format, entry) => mainFile[format]
    },
    sourcemap: true,
  },
});
