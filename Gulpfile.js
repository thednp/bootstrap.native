var gulp = require("gulp");
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');

var distName = "bootstrap-native";
var distDir = "dist/";
var minDir = "lib/min/";

gulp.task('default', function() {
    // Minify the library files only...
    gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest(minDir));

    // Minify everything into a distribution.
    gulp.src('lib/*.js')
    .pipe(concat(distName+".min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(distDir));

    // Just concat
    gulp.src('lib/*.js')
    .pipe(concat(distName+".js"))
    .pipe(gulp.dest(distDir));
});
