import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";

const components = ['alert', 'button', 'carousel', 'collapse', 'dropdown', 'modal', 'offcanvas', 'popover', 'scrollspy', 'tab', 'toast', 'tooltip'];
const componentNames = {};

components.forEach(c => {
  componentNames[c] = c === 'scrollspy' ? 'ScrollSpy' : c[0].toUpperCase() + c.slice(1);
})

const componentFile = (entry: string, format: string) => {
  const ext = format === 'iife' ? 'js' : format === 'es' ? 'mjs' : format;
  return `${entry}.${ext}` 
};

export default defineConfig({
  base: './',
  esbuild: {
    legalComments: 'none',
  },
  plugins: [
    dts({
      outDir: 'dist/components',
      copyDtsFiles: true,
      rollupTypes: true,
    })
  ],
  build: {
    target: 'ESNext',
    lib: {
      // banner: 'BSN',
      entry: components.map((component) => resolve(__dirname, `src/components/${component}.ts`)),
      // name: (entry) => componentNames[entry],
      formats: ['es', 'cjs'],
      fileName: (format, entry) => componentFile(entry, format),
      
    },
    sourcemap: true,
    rollupOptions: {
      treeshake: true,
      // external: ['@thednp/event-listener', '@thednp/shorty'],
      output: {
        dir: resolve(__dirname, 'dist/components'),
      },
    }
  },
});
