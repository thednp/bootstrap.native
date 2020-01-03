'use strict'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

const banner = require('./src/util/header.js')

export default [
  // UDM version
  {
    input: 'src/index.umd.js',
    output: {
      banner: banner,
      name: 'BSN',
      file: './dist/bootstrap-native.js',
      format: 'umd', // or iife
      globals: {}
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
  },
  // ESM Version
  {
    input: 'src/index.esm.js',
    output: {
      banner: banner,
      file: './dist/bootstrap-native.esm.js',
      format: 'esm', // or iife
      globals: {}
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
  },
  // ESM Minified Version
  {
    input: 'src/index.esm.js',
    output: {
      file: './dist/bootstrap-native.esm.min.js',
      format: 'esm', // or iife
      globals: {}
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      minify({
        comments: false
      })
    ]
  }
]
