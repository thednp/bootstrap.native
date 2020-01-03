'use strict'
const fs = require('fs')
const uglify = require('uglify-js')
const pack = require('./package.json')
const miniBanner = require('./src/util/header-mini.js')

function minifyJS(srcPath, writePath) {
  console.log(`Minify [${writePath}] file v${pack.version}..`);

  fs.writeFile(writePath, 
    (miniBanner() + uglify.minify(srcPath).code), 
    function (err) {
      if (err) return handleError(err);
      console.log(writePath+' is done.');
    }
  );
}

function addHeader(srcPath) {
  console.log(`Adding header to [${srcPath}] file v${pack.version}..`);

  fs.writeFile(srcPath, 
    (miniBanner() + fs.readFileSync(srcPath)), 
    function (err) {
      if (err) return handleError(err);
      console.log(srcPath+' is done.');
    }
  );
}

function handleError(err) {
  console.error(err);
  process.exit(1);
}


// Minify JS
minifyJS('./dist/bootstrap-native.js', './dist/bootstrap-native.min.js');



// Add header to esm minified build
addHeader('./dist/bootstrap-native.esm.min.js');