'use strict';
const gulp = require('gulp');
const fs = require('fs');
const replace = require('gulp-replace');
const gulpsync = require('gulp-sync')(gulp);
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

gulp.task('styles', () => {
  return gulp.src(['./src/formio.component.scss'])
    .pipe(gulp.dest('dist'))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('inline-styles', () => {
  const css = fs.readFileSync('./dist/formio.component.css').toString();
  return gulp.src(['./dist/formio.component.js'])
    .pipe(replace("styleUrls: ['formio.component.css']", "styles: ['" + css.replace(/\\'/g, "'").replace(/'/g, "\\'") + "']"))
    .pipe(gulp.dest('dist'));
});

