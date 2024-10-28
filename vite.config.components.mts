import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";

const components = ['alert', 'button', 'carousel', 'collapse', 'dropdown', 'modal', 'offcanvas', 'popover', 'scrollspy', 'tab', 'toast', 'tooltip'];

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
      entry: components.map((component) => resolve(__dirname, `src/components/${component}.ts`)),
      formats: ['es', 'cjs'],
      fileName: (format, entry) => componentFile(entry, format),
      
    },
    sourcemap: true,
    rollupOptions: {
      treeshake: true,
      output: {
        dir: resolve(__dirname, 'dist/components'),
      },
    }
  },
});
