"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var formio_component_component_1 = require('./formio-component.component');
var bootstrap_templates_1 = require('./templates/bootstrap.templates');
var index_1 = require('./components/index');
var input_1 = require('./fixtures/fields/input');
describe('FormioComponentComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_templates_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    it('Should create a component with default options.', function () {
        var component = new formio_component_component_1.FormioComponentComponent();
        component.component = input_1.INPUT('textfield', 'text', 'firstName', 'First Name');
        component.form = _this.form;
        component.ngOnInit();
        expect(component.show).toEqual(true);
        expect(component.components.length).toEqual(1);
    });
    it('Should now show by default if there are conditions.', function () {
        var component = new formio_component_component_1.FormioComponentComponent();
        component.component = input_1.INPUT('textfield', 'text', 'firstName', 'First Name');
        component.component.conditional = {
            show: 'true',
            when: 'lastName',
            eq: 'testing'
        };
        component.form = _this.form;
        component.ngOnInit();
        expect(component.show).toEqual(false);
    });
});
//# sourceMappingURL=formio-component.component.spec.js.map