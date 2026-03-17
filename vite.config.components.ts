import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import strip from "vite-plugin-strip-comments";

const components = ['alert', 'button', 'carousel', 'collapse', 'dropdown', 'modal', 'offcanvas', 'popover', 'scrollspy', 'tab', 'toast', 'tooltip'];

const componentFile = (entry: string, format: string) => {
  const ext = format === 'umd' ? 'js' : format === 'es' ? 'mjs' : format;
  return `${entry}.${ext}` 
};

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  plugins: [
    dts({
      outDir: 'dist/components',
      copyDtsFiles: true,
      rollupTypes: true,
    }),
    strip({ type: 'keep-jsdoc' }),
  ],
  build: {
    target: 'ESNext',
    minify: 'oxc',
    outDir: 'dist/components',
    lib: {
      entry: components.map((component) => resolve(__dirname, `src/components/${component}.ts`)),
      formats: ['es', 'cjs'],
      fileName: (format, entry) => componentFile(entry, format),
    },
    sourcemap: true,
  },
});
