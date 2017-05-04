'use strict';
const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);
const replace = require('gulp-replace');
const inject = require('gulp-js-text-inject');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
var exec = require('child_process').exec;
gulp.task('styles', () => {
    return gulp.src(['./src/formio.component.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('src'));
});
gulp.task('inline-style', () => {
    return gulp.src(['./src/formio.component.js'])
        .pipe(inject({
            basepath: 'src/'
        }))
        .pipe(gulp.dest('src'));
});
gulp.task('scripts', (done) => {
  exec('ngc -p "tsconfig.json"', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done();
  });
});
gulp.task('build', gulpsync.sync([['styles'], ['scripts'], 'inline-style']));
