var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var src = {
  scss: './src/scss/**/*.scss',
}

var dist = {
  css: './dist/css'
}

gulp.task('sass', function () {
  return gulp.src(src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(dist.css));
});

gulp.task('default', function () {
  gulp.watch(src.scss, ['sass']);
});
