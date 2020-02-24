'use strict'
import buble from '@rollup/plugin-buble'
import {terser} from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import json from '@rollup/plugin-json'
import * as pkg from "./package.json";

// set headers
const year = (new Date).getFullYear()
const banner = `/*!
  * Native JavaScript for Bootstrap v${pkg.version} (${pkg.homepage})
  * Copyright 2015-${year} © ${pkg.author}
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */`
const miniBanner = `// Native JavaScript for Bootstrap v${pkg.version} | ${year} © ${pkg.author} | ${pkg.license}-License`

// set config
const MIN = process.env.MIN === 'true' // true/false|unset
const FORMAT = process.env.FORMAT // umd|iife|esm

const INPUTFILE = process.env.INPUTFILE ? process.env.INPUTFILE : 'src/index.js'
const OUTPUTFILE = process.env.OUTPUTFILE ? process.env.OUTPUTFILE : (FORMAT === 'umd' ? './dist/bootstrap-native'+(MIN?'.min':'')+'.js' : './dist/bootstrap-native.esm'+(MIN?'.min':'')+'.js')

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT, // or iife
}

const PLUGINS = [
  json(),
  buble(),
]

if (MIN){
  PLUGINS.push(terser({output: {preamble: miniBanner}}));
} else {
  OUTPUT.banner = banner;
  PLUGINS.push(cleanup());
}

if (FORMAT!=='esm') {
  OUTPUT.name = 'BSN';
}

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS
  }
]

// export default [
//   // UDM Version
//   {
//     input: 'src/index.umd.js',
//     output: {
//       banner: banner,
//       name: 'BSN',
//       file: './dist/bootstrap-native.js',
//       format: 'umd', // or iife
//       globals: {}
//     },
//     plugins: [
//       json(),
//       cleanup(),
//       buble({
//         exclude: ['node_modules/**','*.json'] // only transpile our source code
//       })
//     ]
//   },
//   // UDM Minified Version
//   {
//     input: 'src/index.umd.js',
//     output: {
//       name: 'BSN',
//       file: './dist/bootstrap-native.min.js',
//       format: 'umd', // or iife
//       globals: {}
//     },
//     plugins: [
//       json(),
//       // cleanup(),
//       buble({
//         exclude: ['node_modules/**','*.json'] // only transpile our source code
//       }),
//       terser({output: {preamble: miniBanner}})      
//     ]
//   },
//   // ESM Version
//   {
//     input: 'src/index.esm.js',
//     output: {
//       banner: banner,
//       file: './dist/bootstrap-native.esm.js',
//       format: 'esm', // or iife
//       globals: {}
//     },
//     plugins: [
//       json(),
//       cleanup(),
//       buble({
//         exclude: ['node_modules/**','*.json'] // only transpile our source code
//       })
//     ]
//   },
//   // ESM Minified Version
//   {
//     input: 'src/index.esm.js',
//     output: {
//       file: './dist/bootstrap-native.esm.min.js',
//       format: 'esm', // or iife
//       globals: {}
//     },
//     plugins: [
//       json(),
//       // cleanup(),
//       buble({
//         exclude: ['node_modules/**','*.json'] // only transpile our source code
//       }),
//       terser({output: {preamble: miniBanner}}) 
//     ]
//   }
// ]
