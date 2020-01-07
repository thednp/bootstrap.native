'use strict'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import cleanup from 'rollup-plugin-cleanup'
import json from '@rollup/plugin-json'

const banner = require('./header.js')

export default [
  // UDM Version
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
      json(),
      cleanup(),
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
  },
  // UDM Minified Version
  {
    input: 'src/index.umd.js',
    output: {
      name: 'BSN',
      file: './dist/bootstrap-native.min.js',
      format: 'umd', // or iife
      globals: {}
    },
    plugins: [
      json(),
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      minify({
        comments: false
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
      json(),
      cleanup(),
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
      json(),
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      minify({
        comments: false
      })
    ]
  }
]
