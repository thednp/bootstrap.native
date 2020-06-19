'use strict'
import buble from '@rollup/plugin-buble'
import node from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import {terser} from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import * as pkg from "./package.json";

// set headers
const year = (new Date).getFullYear()
const banner = `/*!
  * Native JavaScript for Bootstrap Polyfill v${pkg.version} (${pkg.homepage})
  * Copyright 2015-${year} © ${pkg.author}
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
 "use strict";`

const miniBanner = `// Native JavaScript for Bootstrap Polyfill v${pkg.version} | ${year} © ${pkg.author} | ${pkg.license}-License
"use strict";`

// set config
const MIN = process.env.MIN === 'true' // true/false|unset
const FORMAT = 'esm' // umd|iife|esm|cjs

// INPUTFILE:src/util/polyfill.js,OUTPUTFILE:dist/polyfill.js
const INPUTFILE = 'src/util/polyfill.js'
const OUTPUTFILE = './dist/polyfill'+(MIN?'.min':'')+'.js'

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT, // or iife
}

const PLUGINS = [
  node(),
  json(),
  buble(),
  cleanup()
]

if (MIN){
  PLUGINS.push(terser({output: {preamble: miniBanner}}));
} else {
  OUTPUT.banner = banner;
}

// if (FORMAT!=='esm') {
//   OUTPUT.name = 'BSN';
// }

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS
  }
]