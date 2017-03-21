'use strict';
const gulp = require('gulp');
const gulpsync = require('gulp-sync')(gulp);
const replace = require('gulp-replace');
const inject = require('gulp-js-text-inject');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const ts = require('gulp-typescript');
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
