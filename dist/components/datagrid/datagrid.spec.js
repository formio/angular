"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var bootstrap_templates_1 = require('../../templates/bootstrap.templates');
var index_1 = require('../index');
describe('DataGridComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_templates_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    it('Should create the datagrid control.', function () {
        expect(true).toEqual(true);
    });
});
//# sourceMappingURL=datagrid.spec.js.map