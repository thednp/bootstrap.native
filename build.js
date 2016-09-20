// Native Javascript for Bootstrap 3 | Minify
// Minify script for the js files in lib/ and dist/bootstrap-native.js
// Usage: npm run min
// by https://github.com/RyanZim

var fs = require('fs');
var path = require('path');
var uglify = require('uglify-js');
console.log('Minified:');
// Minify lib/
fs.readdir('lib/', function (err, files) {
  if (err) return handleError(err);
  files.forEach(function (file) {
    var libFile = path.join('lib/', file);
    fs.stat(libFile, function (err, stats) {
      if (err) return handleError(err);
      if (stats.isFile()) {
        var minFile = path.join('lib/min/', file).replace('.js', '.min.js');
        minify(libFile, minFile);
      } else return;
    });
  });
});
// Minify dist/bootstrap-native.js
minify('dist/bootstrap-native.js', 'dist/bootstrap-native.min.js');
// Helper Functions:
function minify(srcPath, writePath) {
  fs.writeFile(writePath, (uglify.minify(srcPath).code + '\n'), function (err) {
    if (err) return handleError(err);
    console.log(srcPath);
  });
}
function handleError(err) {
  console.error(err);
  process.exit(1);
}
