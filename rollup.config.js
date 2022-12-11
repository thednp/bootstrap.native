'use strict';
import esbuild from 'rollup-plugin-esbuild'
// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import node from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import * as pkg from "./package.json";


// set headers
const year = (new Date).getFullYear()
const banner = 
`/*!
  * Bootstrap Lite v${pkg.version} (${pkg.homepage})
  * Copyright ${year} © ${pkg.author}
  * Licensed under MIT (https://github.com/thednp/bsl/blob/master/LICENSE)
  */`

const miniBanner = `// Bootstrap Lite v${pkg.version} | ${year} © ${pkg.author} | ${pkg.license}-License`

// set config
const MIN = process.env.MIN === 'true' // true/false|unset
const FORMAT = process.env.FORMAT // umd|iife|esm|cjs

const INPUTFILE = process.env.INPUTFILE ? process.env.INPUTFILE : 'src/index.ts'
const OUTPUTFILE = process.env.OUTPUTFILE ? process.env.OUTPUTFILE : (FORMAT === 'umd' ? './dist/bsl'+(MIN?'.min':'')+'.js' : './dist/bsl.'+FORMAT+(MIN?'.min':'')+'.js')

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT, // or iife
  // external: id => pkgdependencies.includes(id)
  banner: MIN ? miniBanner : banner,
  exports: 'default'
}

const PLUGINS = [
  json(),
  // typescript(),
  // node(),
  typescript({
    compilerOptions: {
      sourceMap: true,
    //   lib: ["DOM", "ESNext", "DOM.Iterable"],
    //   target: "esnext",
    //   rootDir: '.',
    //   resolveJsonModule: true,
    }
  }),
  // commonjs({
  //   // exclude: 'node_modules',
  //   ignoreGlobal: true,
  // }),
  
  node({
      // mainFields: ['source', 'jsnext', 'module'], 
      dedupe: ['@thednp/shorty', '@thednp/event-listener'],
      extensions: ['.js', '.ts', '.json']
  }),
  esbuild({
    minify: MIN || false,
    // banner:  MIN ? miniBanner : banner,
    sourceMap: true
  })
]

// OUTPUT.banner = MIN ? miniBanner : banner;

// if (FORMAT!=='esm') {
  OUTPUT.name = 'BSL';
// }

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS
  }
]