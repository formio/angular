'use strict';
var fs = require('fs');
var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var replace = require('gulp-replace');
var inject = require('gulp-js-text-inject');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var ts = require('gulp-typescript');

gulp.task('styles', () => {
    return gulp.src(['./src/formio.component.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
});
gulp.task('inline-style', () => {
    return gulp.src(['./dist/formio.component.js'])
        .pipe(inject({
            basepath: 'dist/'
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('scripts', () => {
    return gulp.src('src/**/*.ts')
        .pipe(ts.createProject('tsconfig.json')())
        .pipe(gulp.dest('dist'));
});
gulp.task('clean', require('del').bind(null, ['dist']));
gulp.task('build', gulpsync.sync([['clean'], ['styles', 'scripts'], 'inline-style']));
