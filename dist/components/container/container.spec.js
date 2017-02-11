"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var container_1 = require('./container');
var bootstrap_templates_1 = require('../../templates/bootstrap.templates');
var index_1 = require('../index');
var formio_events_1 = require('../../formio.events');
describe('ContainerComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_templates_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
        _this.events = new formio_events_1.FormioEvents();
    });
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            tree: true,
            components: [
                {
                    input: true,
                    tableView: true,
                    inputType: 'text',
                    inputMask: '',
                    label: 'First Name',
                    key: 'firstName',
                    placeholder: 'Enter your first name',
                    prefix: '',
                    suffix: '',
                    multiple: false,
                    defaultValue: '',
                    protected: false,
                    unique: false,
                    persistent: true,
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 10,
                        pattern: '',
                        custom: '',
                        customPrivate: false
                    },
                    conditional: {
                        show: '',
                        when: null,
                        eq: ''
                    },
                    type: 'textfield'
                },
                {
                    input: true,
                    tableView: true,
                    inputType: 'text',
                    inputMask: '',
                    label: 'Last Name',
                    key: 'lastName',
                    placeholder: 'Enter your last name',
                    prefix: '',
                    suffix: '',
                    multiple: false,
                    defaultValue: '',
                    protected: false,
                    unique: false,
                    persistent: true,
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 10,
                        pattern: '',
                        custom: '',
                        customPrivate: false
                    },
                    conditional: {
                        show: '',
                        when: null,
                        eq: ''
                    },
                    type: 'textfield'
                }
            ],
            tableView: true,
            label: '',
            key: 'user',
            protected: false,
            persistent: true,
            type: 'container',
            conditional: {
                show: '',
                when: null,
                eq: ''
            },
            lockKey: true
        };
        Object.assign(settings, overrides);
        return settings;
    };
    it('Should create the container control.', function () {
        var settings = getSettings({});
        var container = new container_1.ContainerComponent(_this.form, settings, _this.events);
        expect(container.control instanceof forms_1.FormGroup).toEqual(true);
    });
});
//# sourceMappingURL=container.spec.js.map