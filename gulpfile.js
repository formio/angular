var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var debug = require('gulp-debug');
var insert = require('gulp-insert');
var ts = require('gulp-typescript');
var injectHtml = require('gulp-inject-stringified-html');

gulp.task('templates', function() {
  return gulp.src('src/templates/*.tpl.ts')
    .pipe(injectHtml())
    .pipe(rename({
      extname: ".build.ts"
    }))
    .pipe(insert.prepend('// THIS IS A GENERATED FILE. DO NOT MODIFY!!!' + "\n"))
    .pipe(debug({title: 'templates:'}))
    .pipe(gulp.dest('src/templates'));
});

gulp.task('typescript', function() {
  return gulp.src(['src/**/*.ts', '!src/**/*.tpl.ts'])
    .pipe(debug({title: 'ts:'}))
    .pipe(ts(require('./tsconfig.json').compilerOptions))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del(['dist/**/*']);
});

gulp.task('build', ['clean', 'templates', 'typescript']);