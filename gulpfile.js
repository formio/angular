var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var debug = require('gulp-debug');
var insert = require('gulp-insert');
var injectHtml = require('gulp-inject-stringified-html');

gulp.task('templates', function () {
  return gulp.src('src/templates/bootstrap.templates.tpl.ts')
    .pipe(injectHtml())
    .pipe(rename(function (path) {
      path.basename = path.basename.substr(0, path.basename.indexOf('.tpl'));
      path.extname = '.ts';
    }))
    .pipe(insert.prepend('// THIS IS A GENERATED FILE. DO NOT MODIFY!!!' + "\n"))
    .pipe(debug({
      title: 'templates:'
    }))
    .pipe(gulp.dest('src/templates'));
});

gulp.task('clean', function () {
  return del(['dist/**/*']);
});
