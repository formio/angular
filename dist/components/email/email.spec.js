"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var bootstrap_templates_1 = require('../../templates/bootstrap.templates');
var index_1 = require('../index');
describe('EmailComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_templates_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    it('Should not allow invalid TextField values.', function () {
        // TO-DO: MAKE EMAIL TESTS!
        expect(true).toEqual(true);
    });
});
//# sourceMappingURL=email.spec.js.map