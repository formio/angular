"use strict";
/// <reference path="../typings/globals/jasmine/index.d.ts" />
var bootstrap_1 = require('./templates/bootstrap');
describe('formio.ts', function () {
    it('Should have multiple templates', function () {
        expect(bootstrap_1.FORMIO_BOOTSTRAP.hasOwnProperty('formio')).toEqual(true);
        expect(bootstrap_1.FORMIO_BOOTSTRAP.hasOwnProperty('formio_component')).toEqual(true);
        expect(bootstrap_1.FORMIO_BOOTSTRAP.hasOwnProperty('formio_components')).toEqual(true);
    });
});
