var gulp = require("gulp");
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');

gulp.task('default', function() {
    // Minify the library files only...
    gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest('dist/lib'));

    // Minify everything into a distribution.
    gulp.src('lib/*.js')
    .pipe(concat("bootstrap.native.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));

    // Just concat
    gulp.src('lib/*.js')
    .pipe(concat("bootstrap.native.js"))
    .pipe(gulp.dest('dist/'));
});
