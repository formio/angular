"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var button_1 = require('./button');
describe('ButtonComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            label: 'Submit',
            tableView: false,
            key: 'submit',
            size: 'md',
            leftIcon: '',
            rightIcon: '',
            block: false,
            action: 'submit',
            disableOnInvalid: true,
            theme: 'primary',
            type: 'button'
        };
        Object.assign(settings, overrides);
        return settings;
    };
    it('Should create the control.', function () {
        var settings = getSettings({});
        var button = new button_1.ButtonComponent(_this.form, settings);
        expect(button.control instanceof forms_1.FormControl).toEqual(true);
    });
});
