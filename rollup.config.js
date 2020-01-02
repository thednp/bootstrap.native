'use strict'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

const banner = require('./src/util/header.js')
const miniBanner = require('./src/util/header-mini.js')

export default [
  {
    input: 'src/index.umd.js',
    output: {
      banner: banner,
      name: 'BSN',
      file: './dist/bootstrap-native-v4.js',
      format: 'umd', // or iife
      globals: {
        // bsn: 'bsn'
        // './lib/src/alert-native.js': 'Alert',
        // './lib/src/button-native.js': 'Button',
        // './lib/src/carousel-native.js': 'Carousel',
        // './lib/src/dropdown-native.js': 'Dropdown',
        // './lib/src/modal-native.js': 'Modal',
        // './lib/src/popover-native.js': 'Popover',
        // './lib/src/scrollspy-native.js': 'ScrollSpy',
        // './lib/src/tab-native.js': 'Tab',
        // './lib/src/toast-native.js': 'Toast',
        // './lib/src/tooltip-native.js': 'Tooltip'
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
  // Minfied version
  {
    input: 'src/index.umd.js',
    output: {
      banner: miniBanner,
      name: 'BSN',
      file: './dist/bootstrap-native-v4.min.js',
      format: 'umd', // or iife
      globals: {
        // bsn: 'bsn'
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
  },
  {
    input: 'src/index.esm.js',
    output: {
      banner: miniBanner,
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
