/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    defaultJSExtensions: true,
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ng2-formio': 'npm:ng2-formio/dist/index.js',
      'ng2-bootstrap': 'npm:ng2-bootstrap',
      'ng2-select': 'npm:ng2-select/bundles',
      'angular2-text-mask': 'npm:angular2-text-mask/dist/angular2TextMask.js',
      'text-mask-core': 'npm:text-mask-core',
      'angular2-signaturepad': 'npm:angular2-signaturepad',
      'signature_pad': 'npm:signature_pad/signature_pad.js',
      'moment': 'npm:moment/moment.js',
      'formiojs': 'npm:formiojs/dist/formio.js',
      'formio-utils': 'npm:formio-utils/src/index.js',
      'lodash': 'npm:lodash',
      'core-js': 'npm:core-js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-signaturepad': {
        main: 'index.js'
      }
    }
  });
})(this);
