'use strict'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

const banner = require('./src/util/header.js')
// const miniBanner = require('./src/util/header-mini.js')

export default [
  {
    input: 'src/index.umd.js',
    output: {
      banner: banner,
      name: 'BSN',
      file: './dist/bootstrap-native.js',
      format: 'umd', // or iife
      globals: {
        BSN: 'BSN'
      }
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
  },
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
  // Minfied versions
  {
    input: 'src/index.esm.js',
    output: {
      // banner: miniBanner,
      file: './dist/bootstrap-native.esm.min.js',
      format: 'esm', // or iife
      globals: {
        bsn: 'bsn'
        // Alert: 'Alert'
      }
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
