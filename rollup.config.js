import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

export default [
  {
    input: 'lib/src/index.js',
    output: {
      name: 'bootstrap.native',
      file: './dist/bootstrap-native-v4.js',
      format: 'umd', // or iife
      globals: {
        bsn: 'bsn'
      }
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
  },
  // Minfied version
  {
    input: 'lib/src/index.js',
    output: {
      name: 'bootstrap.native',
      file: './dist/bootstrap-native-v4.min.js',
      format: 'umd', // or iife
      globals: {
        bsn: 'bsn'
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
