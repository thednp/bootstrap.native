import { resolve } from 'path';
import { defineConfig } from 'vite';
import { name, version } from './package.json';

const getPackageName = () => {
  return (name.includes('@') ? name.split('/')[1] : name).replace('.', '-');
};

const NAME = 'BSN';

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.js`,
};

export default defineConfig({
  base: './',
  build: {
    emptyOutDir: true,
    lib: {
      // banner: 'BSN',
      entry: resolve(__dirname, 'src/index.ts'),
      name: NAME,
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => fileName[format],
    },
    target: 'ESNext',
    sourcemap: true,
    minify: true,
  },
  
  
});
