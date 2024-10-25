import { resolve } from 'path';
import { defineConfig } from 'vite';

const components = ['alert', 'button', 'carousel', 'collapse', 'dropdown', 'modal', 'offcanvas', 'popover', 'scrollspy', 'tab', 'toast', 'tooltip'];

const componentFile = (entry: string, format: string) => {
  const ext = format === 'iife' ? 'js' : format === 'es' ? 'mjs' : format;
  // const [fileName] = entry.split('/').slice(-1)[0].split('.').slice(0, -1);
  // console.log(entry, ext);
  return `${entry}.${ext}` 
};

export default defineConfig({
  base: './',
  build: {   
    lib: {
      // banner: 'BSN',
      entry: components.map((component) => resolve(__dirname, `src/components/${component}.ts`)),
      // name: NAME,
      formats: ['es', 'cjs'],
      fileName: (format, entry) => componentFile(entry, format),
      
    },
    sourcemap: true,
    rollupOptions: {
      treeshake: true,
      external: ['@thednp/event-listener', '@thednp/shorty'],
      output: {
        dir: resolve(__dirname, 'dist/components'),
      },
    }
  },
});
