'use strict'

const fs = require('fs')
const pkg = require('../package.json')
const miniBanner = require('./header-mini.js')

function addHeader(src) {
  console.log(`Adding header to "${src}" file v${pkg.version}..`);

  fs.writeFile(src, 
    (miniBanner() + fs.readFileSync(src)), 
    function (err) {
      if (err) return handleError(err);
      console.log(`File "${src}" looks nice.`);
    }
  );
}

function handleError(err) {
  console.error(err);
  process.exit(1);
}

// Add header to minified builds
addHeader('./dist/bootstrap-native.min.js');
addHeader('./dist/bootstrap-native.esm.min.js');