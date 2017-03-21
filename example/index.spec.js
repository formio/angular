Error.stackTraceLimit = Infinity;

require('core-js/client/shim');

require('@angular/common');
require('rxjs');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
const context = require.context('./app', true, /\.(js|ts|tsx)$/);
context.keys().forEach(context);
const testing = require('@angular/core/testing');
const testingBrowser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(testingBrowser.BrowserDynamicTestingModule, testingBrowser.platformBrowserDynamicTesting());
