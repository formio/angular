/* eslint-disable */
var gulp = require('gulp'),
  path = require('path'),
  ngc = require('@angular/compiler-cli/src/main').main,
  rollup = require('gulp-rollup'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  fs = require('fs-extra'),
  runSequence = require('run-sequence'),
  inlineResources = require('./tools/gulp/inline-resources');

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, 'src');
const tmpFolder = path.join(rootFolder, '.tmp');
const buildFolder = path.join(rootFolder, 'build');
const distFolder = path.join(rootFolder, 'dist');

gulp.task('package-version', function() {
  const pkg = require('./package.json');
  return gulp.src([
    `${distFolder}/package.json`,
    `${distFolder}/auth/package.json`,
    `${distFolder}/resource/package.json`,
    `${distFolder}/grid/package.json`
  ], {base: distFolder})
    .pipe(replace(/"version": ""/, `"version": "${pkg.version}"`))
    .pipe(replace(/"dependencies": {}/, `"dependencies": ${JSON.stringify(pkg.dependencies, null, 2)}`))
    .pipe(replace(/"peerDependencies": {}/, `"peerDependencies": ${JSON.stringify(pkg.peerDependencies, null, 2)}`))
    .pipe(gulp.dest(distFolder));
});

/**
 * 1. Delete /dist folder
 */
gulp.task('clean:dist', function () {

  // Delete contents but not dist folder to avoid broken npm links
  // when dist directory is removed while npm link references it.
  return fs.emptyDirSync(distFolder);
});

/**
 * 2. Clone the /src folder into /.tmp. If an npm link inside /src has been made,
 *    then it's likely that a node_modules folder exists. Ignore this folder
 *    when copying to /.tmp.
 */
gulp.task('copy:source', function () {
  return gulp.src([`${srcFolder}/**/*`, `!${srcFolder}/node_modules`])
    .pipe(gulp.dest(tmpFolder));
});

gulp.task('styles-formio', () => {
  return gulp.src([`${tmpFolder}/components/formio/formio.component.scss`])
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(`${tmpFolder}/components/formio`));
});

gulp.task('styles-builder', () => {
  return gulp.src([`${tmpFolder}/components/formbuilder/formbuilder.component.scss`])
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(`${tmpFolder}/components/formbuilder`));
});

gulp.task('formio-css', () => {
  return gulp.src([`${tmpFolder}/components/formio/formio.component.ts`])
    .pipe(replace("formio.component.scss", "formio.component.css"))
    .pipe(gulp.dest(`${tmpFolder}/components/formio`));
});

gulp.task('builder-css', () => {
  return gulp.src([`${tmpFolder}/components/formbuilder/formbuilder.component.ts`])
    .pipe(replace("formbuilder.component.scss", "formbuilder.component.css"))
    .pipe(gulp.dest(`${tmpFolder}/components/formbuilder`));
});

/**
 * 3. Inline template (.html) and style (.css) files into the the component .ts files.
 *    We do this on the /.tmp folder to avoid editing the original /src files
 */
gulp.task('inline-resources', function () {
  return Promise.resolve()
    .then(() => inlineResources(tmpFolder));
});


/**
 * 4. Run the Angular compiler, ngc, on the /.tmp folder. This will output all
 *    compiled modules to the /build folder.
 *
 *    As of Angular 5, ngc accepts an array and no longer returns a promise.
 */
gulp.task('ngc', function () {
  ngc(['--project', `${tmpFolder}/tsconfig.es5.json`]);
  return Promise.resolve()
});

gulp.task('ngc-angular', function () {
  ngc(['--project', `${tmpFolder}/tsconfig.angular.json`]);
  return Promise.resolve()
});

gulp.task('ngc-auth', function () {
  ngc(['--project', `${tmpFolder}/auth/tsconfig.es5.json`]);
  return Promise.resolve()
});

gulp.task('ngc-auth-angular', function () {
  ngc(['--project', `${tmpFolder}/auth/tsconfig.angular.json`]);
  return Promise.resolve()
});

gulp.task('ngc-grid', function () {
  ngc(['--project', `${tmpFolder}/grid/tsconfig.es5.json`]);
  return Promise.resolve()
});

gulp.task('ngc-grid-angular', function () {
  ngc(['--project', `${tmpFolder}/grid/tsconfig.angular.json`]);
  return Promise.resolve()
});

gulp.task('ngc-resource', function () {
  ngc(['--project', `${tmpFolder}/resource/tsconfig.es5.json`]);
  return Promise.resolve()
});

gulp.task('ngc-resource-angular', function () {
  ngc(['--project', `${tmpFolder}/resource/tsconfig.angular.json`]);
  return Promise.resolve()
});

/**
 * 5. Run rollup inside the /build folder to generate our Flat ES module and place the
 *    generated file into the /dist folder
 */
const rollupFesm = function(name, path) {
  path = path || '';
  return gulp.src(`${buildFolder}${path}/**/*.js`)
  // transform the files here.
    .pipe(rollup({

      // Bundle's entry point
      // See "input" in https://rollupjs.org/#core-functionality
      input: `${buildFolder}${path}/index.js`,

      // Allow mixing of hypothetical and actual files. "Actual" files can be files
      // accessed by Rollup or produced by plugins further down the chain.
      // This prevents errors like: 'path/file' does not exist in the hypothetical file system
      // when subdirectories are used in the `src` directory.
      allowRealFiles: true,

      // A list of IDs of modules that should remain external to the bundle
      // See "external" in https://rollupjs.org/#core-functionality
      external: [
        '@angular/core',
        '@angular/common'
      ],

      output: {
        // Format of generated bundle
        // See "format" in https://rollupjs.org/#core-functionality
        format: 'es'
      }
    }))
    .pipe(gulp.dest(`${distFolder}${path}`));
};
gulp.task('rollup:fesm', () => rollupFesm('angular-formio'));
gulp.task('rollup-auth:fesm', () => rollupFesm('formio-auth', '/auth'));
gulp.task('rollup-grid:fesm', () => rollupFesm('formio-grid', '/grid'));
gulp.task('rollup-resource:fesm', () => rollupFesm('formio-resource', '/resource'));

/**
 * 6. Run rollup inside the /build folder to generate our UMD module and place the
 *    generated file into the /dist folder
 */
const rollupUmd = function(name, path) {
  path = path || '';
  return gulp.src(`${buildFolder}${path}/**/*.js`)
  // transform the files here.
    .pipe(rollup({

      // Bundle's entry point
      // See "input" in https://rollupjs.org/#core-functionality
      input: `${buildFolder}${path}/index.js`,

      // Allow mixing of hypothetical and actual files. "Actual" files can be files
      // accessed by Rollup or produced by plugins further down the chain.
      // This prevents errors like: 'path/file' does not exist in the hypothetical file system
      // when subdirectories are used in the `src` directory.
      allowRealFiles: true,

      // A list of IDs of modules that should remain external to the bundle
      // See "external" in https://rollupjs.org/#core-functionality
      external: [
        'rxjs',
        'formiojs',
        '@angular/core',
        '@angular/common',
        '@angular/router'
      ],

      output: {
        // The name to use for the module for UMD/IIFE bundles
        // (required for bundles with exports)
        // See "name" in https://rollupjs.org/#core-functionality
        name: name,

        // See "globals" in https://rollupjs.org/#core-functionality
        globals: {
          typescript: 'ts'
        },

        // Format of generated bundle
        // See "format" in https://rollupjs.org/#core-functionality
        format: 'umd',

        // Export mode to use
        // See "exports" in https://rollupjs.org/#danger-zone
        exports: 'named'
      }

    }))
    .pipe(rename(`${name}.umd.js`))
    .pipe(gulp.dest(`${distFolder}${path}`));
};
gulp.task('rollup:umd', () => rollupUmd('angular-formio'));
gulp.task('rollup-auth:umd', () => rollupUmd('formio-auth', '/auth'));
gulp.task('rollup-grid:umd', () => rollupUmd('formio-grid', '/grid'));
gulp.task('rollup-resource:umd', () => rollupUmd('formio-resource', '/resource'));

/**
 * 7. Copy all the files from /build to /dist, except .js files. We ignore all .js from /build
 *    because with don't need individual modules anymore, just the Flat ES module generated
 *    on step 5.
 */
gulp.task('copy:build', function () {
  return gulp.src([
    `${buildFolder}/**/*`,
    //`!${buildFolder}/**/*.js`
  ])
    .pipe(gulp.dest(distFolder));
});

/**
 * 8. Copy package.json from /src to /dist
 */
gulp.task('copy:manifest', function () {
  return gulp.src([`${srcFolder}/package.json`])
    .pipe(gulp.dest(distFolder));
});
gulp.task('copy-auth:manifest', function () {
  return gulp.src([`${srcFolder}/auth/package.json`])
    .pipe(gulp.dest(`${distFolder}/auth`));
});
gulp.task('copy-grid:manifest', function () {
  return gulp.src([`${srcFolder}/grid/package.json`])
    .pipe(gulp.dest(`${distFolder}/grid`));
});
gulp.task('copy-resource:manifest', function () {
  return gulp.src([`${srcFolder}/resource/package.json`])
    .pipe(gulp.dest(`${distFolder}/resource`));
});

/**
 * 9. Copy README.md from / to /dist
 */
gulp.task('copy:readme', function () {
  return gulp.src([path.join(rootFolder, 'README.MD')])
    .pipe(gulp.dest(distFolder));
});

/**
 * 10. Delete /.tmp folder
 */
gulp.task('clean:tmp', function () {
  return deleteFolder(tmpFolder);
});

/**
 * 11. Delete /build folder
 */
gulp.task('clean:build', function () {
  return deleteFolder(buildFolder);
});

gulp.task('compile', function () {
  runSequence(
    'clean:dist',
    'copy:source',
    'styles-formio',
    'styles-builder',
    'formio-css',
    'builder-css',
    'inline-resources',
    'ngc',
    'ngc-angular',
    'ngc-auth',
    'ngc-auth-angular',
    'ngc-grid',
    'ngc-grid-angular',
    'ngc-resource',
    'ngc-resource-angular',
    /*'rollup:fesm',   // This currently causes a problem with the decorators.
    'rollup-auth:fesm',
    'rollup-grid:fesm',
    'rollup-resource:fesm',*/
    'rollup:umd',
    'rollup-auth:umd',
    'rollup-grid:umd',
    'rollup-resource:umd',
    'copy:build',
    'copy:manifest',
    'copy-auth:manifest',
    'copy-grid:manifest',
    'copy-resource:manifest',
    'copy:readme',
    'clean:build',
    'clean:tmp',
    function (err) {
      if (err) {
        console.log('ERROR:', err.message);
        deleteFolder(distFolder);
        deleteFolder(tmpFolder);
        deleteFolder(buildFolder);
      } else {
        console.log('Compilation finished succesfully');
      }
    });
});

/**
 * Watch for any change in the /src folder and compile files
 */
gulp.task('watch', function () {
  gulp.watch(`${srcFolder}/**/*`, ['compile']);
});

gulp.task('clean', function (callback) {
  runSequence('clean:dist', 'clean:tmp', 'clean:build', callback);
});

gulp.task('build', function (callback) {
  runSequence('clean', 'compile', callback);
});

gulp.task('build:watch', function (callback) {
  runSequence('build', 'watch', callback);
});

gulp.task('default', ['build:watch']);

/**
 * Deletes the specified folder
 */
function deleteFolder(folder) {
  return fs.removeSync(folder);
}
