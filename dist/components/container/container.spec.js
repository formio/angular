"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var container_1 = require('./container');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var formio_components_component_1 = require('../../formio-components.component');
var formio_component_component_1 = require('../../formio-component.component');
describe('ContainerComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
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
        var container = new container_1.ContainerComponent(_this.form, settings);
        expect(container.control instanceof forms_1.FormGroup).toEqual(true);
        var index = 0;
        var components = new formio_components_component_1.FormioComponentsComponent();
        components.components = settings.components;
        components.form = _this.form;
        settings.components.forEach(function (comp) {
            index++;
            var component = new formio_component_component_1.FormioComponentComponent();
            component.component = comp;
            component.form = _this.form;
            component.ngOnInit();
            component.form.controls[comp.key]['setValue']('Test' + index);
            component.form.controls[comp.key]['markAsDirty']();
        });
        expect(_this.form.value).toEqual({ firstName: 'Test1', lastName: 'Test2' });
    });
});
