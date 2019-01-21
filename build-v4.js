#!/usr/bin/env node
// Native Javascript for Bootstrap 4 | Build Script
// Build script to bundle the js files in lib/v4
// Usage: npm run build-v4
// Run node build-v4.js --help for usage instructions
// by https://github.com/RyanZim
var { getModuleNames } = require('./lib/helpers');
var buildV4 = require('./build-module-v4');

// Parse arguments:
var argv = require('yargs')
.usage('node build.js [--minify] [--ignore=<modules>...|--only=<modules>...]')
.options({
  minify: {
    alias: 'm',
    type: 'boolean',
    default: false,
    describe: 'Minify output'
  },
  ignore: {
    alias: 'i',
    type: 'array',
    describe: 'Omit the given module(s) from the bundle'
  },
  only: {
    type: 'array',
    describe: 'Only include the given module(s) in the bundle'
  },
  autoInitDataAPI: {
    type: 'boolean',
    default: true,
    describe: 'Include the auto-initialization utility in the bundle'
  }
})
.help()
.epilog(`Running without --ignore or --only will compile all the modules.
Writes to stdout`)
.argv;

argv.cli = true;

buildV4(argv);
