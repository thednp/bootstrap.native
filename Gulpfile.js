// Native Javascript for Bootstrap 3 | Gulp build file
// by dnp_theme
// Gulp implementation by Ingwie Phoenix

var gulp = require("gulp");
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');

var distName = "bootstrap-native";
var distDir = "dist/";
var minDir = "lib/min/";
var srcDir = 'lib/'

gulp.task('default', function() {
    // array of source files to build
    var sources = [
      srcDir + 'affix-native.js',
      srcDir + 'alert-native.js',
      srcDir + 'button-native.js',
      srcDir + 'carousel-native.js',
      srcDir + 'collapse-native.js',
      srcDir + 'dropdown-native.js',
      srcDir + 'modal-native.js',
      srcDir + 'popover-native.js',
      srcDir + 'scrollspy-native.js',
      srcDir + 'tab-native.js',
      srcDir + 'tooltip-native.js'
    ];
    // simple arg parser to remove sources, expects just the component name
    // ex: gulp --ignore carousel,scrollspy
    (function(args){
      var idx = args.indexOf('--ignore')
      if (idx<1 || idx == args.length-1) {
        return;
      }
      args[idx+1].split(',').forEach(function(ignore){
        var didx = sources.indexOf(srcDir + ignore.trim() + '-native.js');
        if (didx>=0) {
          sources.splice(didx, 1);
        }
      });
    })(process.argv);

    gulp.src(sources)
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest(minDir));

    // Minify everything into a distribution.
    gulp.src(sources)
    .pipe(concat(distName+".min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(distDir));

    // Just concat
    gulp.src(sources)
    .pipe(concat(distName+".js"))
    .pipe(gulp.dest(distDir));
});
