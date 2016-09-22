// Native Javascript for Bootstrap 3 | Minify
// Minify script for the js files in lib/ and dist/bootstrap-native.js
// Usage: npm run min
// by https://github.com/RyanZim

var fs = require('fs');
var path = require('path');
var uglify = require('uglify-js');
var pack = require('./package.json');
var version = 'v'+pack.version;
var license = pack.license+'-License';

console.log('Minifying ' + version + '..');

// Helper Functions:
function ucfirst(str) {
    var cap = str.charAt(0).toUpperCase();
    return cap+str.substr(1);
}
function replaceB(s){
  if (/boo/.test(s)) { return ''; } 
  else { return " | " + ucfirst(s.replace(/lib\\|\-native.js/g,'')); }
}
function minify(srcPath, writePath) {
  fs.writeFile(writePath, 
    ('// Native Javascript for Bootstrap 3 ' + version + ' | © dnp_theme' + replaceB(srcPath)  + ' | ' + license + '\n'
    + uglify.minify(srcPath).code ), function (err) {
    if (err) return handleError(err);
    console.log(srcPath);
  });
}
function handleError(err) {
  console.error(err);
  process.exit(1);
}

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

