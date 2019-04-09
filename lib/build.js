#!/usr/bin/env node
// Native Javascript for Bootstrap 3/4
// Unified build script to bundle the js files in lib/V3 AND lib/V4
// Usage: npm run build OR npm run build-v4
// Run npm run help OR node build.js --help for usage instructions
// by https://github.com/RyanZim

var { getModuleNames } = require('./helpers');
var build = require('./build-module');

// Parse arguments:
var argv = require('yargs')
.usage('node lib/build.js [--bs_version][--minify][--ignore][--only][--autoInitDataAPI]')
.options({
  bs_version: {
    alias: 'v',
    type: 'string',
    default: '3',
    describe: 'Bootstrap version'
  },
  minify: {
    alias: 'm',
    type: 'boolean',
    default: false,
    describe: 'Minify output'
  },
  ignore: {
    alias: 'i',
    type: 'array',
    describe: 'Omit the given module(s)'
  },
  only: {
    alias: 'o',
    type: 'array',
    describe: 'Only include the given module(s)'
  },
  autoInitDataAPI: {
    alias: 'a',
    type: 'boolean',
    default: true,
    describe: 'Component auto-initialization'
  }  
})
.coerce(['ignore', 'only'], getModuleNames)
.help()
.epilog(`Running without --ignore or --only will compile all the modules.
Writes to stdout`)
.argv;

argv.cli = true;

build(argv);
