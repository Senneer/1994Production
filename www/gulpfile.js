'use strict';

var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  connect = require('gulp-connect'),
  csscomb = require('gulp-csscomb'),
  sass = require('gulp-sass');

//connect
console.log(__dirname);
gulp.task('connect', function() {
  connect.server({
    root: './app/',
    livereload: true
  });
});

//css
gulp.task('css', function() {
  var processors = [autoprefixer({browsers: ['last 3 version', 'ie 10', 'ie 11']})];
  return gulp.src('./scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))
  .pipe(csscomb())
  .pipe(gulp.dest('./app/css/'))
  .pipe(connect.reload());
});

//html
gulp.task('html', function(){
  return gulp.src('./app/index.html')
  .pipe(connect.reload());
});

//watch
gulp.task('watch', function(){
  gulp.watch('./scss/*.scss', ['css'])
  gulp.watch('./app/index.html', ['html'])
});

//default
gulp.task('default', ['connect', 'html', 'css', 'watch']);