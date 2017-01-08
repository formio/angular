"use strict";
var bootstrap_templates_1 = require('./templates/bootstrap.templates');
describe('formio.ts', function () {
    it('Should have multiple templates', function () {
        expect(bootstrap_templates_1.FORMIO_BOOTSTRAP.hasOwnProperty('formio')).toEqual(true);
        expect(bootstrap_templates_1.FORMIO_BOOTSTRAP.hasOwnProperty('formio_component')).toEqual(true);
        expect(bootstrap_templates_1.FORMIO_BOOTSTRAP.hasOwnProperty('formio_components')).toEqual(true);
    });
});
//# sourceMappingURL=formio.spec.js.map