"use strict";
/// <reference path="../typings/globals/jasmine/index.d.ts" />
var bootstrap_tpl_1 = require('./templates/bootstrap.tpl');
describe('formio.ts', function () {
    it('Should have multiple templates', function () {
        expect(bootstrap_tpl_1.FORMIO_BOOTSTRAP.hasOwnProperty('formio')).toEqual(true);
        expect(bootstrap_tpl_1.FORMIO_BOOTSTRAP.hasOwnProperty('formio_component')).toEqual(true);
        expect(bootstrap_tpl_1.FORMIO_BOOTSTRAP.hasOwnProperty('formio_components')).toEqual(true);
    });
});
