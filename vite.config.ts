import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// import pkg from './package.json' with { type: "json" };
// import dts from "vite-plugin-dts";
// import strip from "vite-plugin-strip-comments";

// const getPackageName = () => {
//   return (pkg.name.includes('@') ? pkg.name.split('/')[1] : pkg.name).replace('.', '-');
// };

// const NAME = 'BSN';

// const mainFile: Record<string, string> = {
//   es: `${getPackageName()}.mjs`,
//   cjs: `${getPackageName()}.cjs`,
//   umd: `${getPackageName()}.js`,
// };

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  // plugins: [
  //   dts({
  //     outDir: 'dist',
  //     copyDtsFiles: true,
  //     rollupTypes: true,
  //   }),
  //   strip({ type: 'keep-jsdoc' }),
  // ],
  // build: {
  //   minify: 'oxc',
  //   target: 'ESNext',
  //   outDir: 'dist',
  //   emptyOutDir: true,
  //   lib: {
  //     entry: [
  //       resolve(__dirname, 'src/index.ts'), // main file
  //     ],
  //     name: NAME,
  //     formats: ['es', 'cjs', 'umd'],
  //     fileName: (format) => mainFile[format]
  //   },
  //   sourcemap: true,
  // },
});
