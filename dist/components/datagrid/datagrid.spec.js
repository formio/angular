"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var bootstrap_templates_1 = require('../../templates/bootstrap.templates');
var index_1 = require('../index');
var formio_events_1 = require('../../formio.events');
describe('DataGridComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_templates_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
        _this.events = new formio_events_1.FormioEvents();
    });
    it('Should create the datagrid control.', function () {
        expect(true).toEqual(true);
    });
});
//# sourceMappingURL=datagrid.spec.js.map