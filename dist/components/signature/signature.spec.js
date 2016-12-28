"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var signature_1 = require('./signature');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var formio_component_component_1 = require('../../formio-component.component');
describe('SignatureComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            tableView: true,
            label: "Signature",
            key: "signature",
            placeholder: "Please Sign here...",
            footer: "Sign above",
            width: "50%",
            height: "200px",
            penColor: "green",
            backgroundColor: "rgb(245,245,235)",
            minWidth: "0.5",
            maxWidth: "2.5",
            protected: false,
            persistent: true,
            validate: {
                required: false
            },
            type: "signature",
            hideLabel: true,
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            customClass: "myclass"
        };
        Object.assign(settings, overrides);
        return settings;
    };
    var getComponent = function (overrides) {
        var settings = getSettings(overrides);
        var component = new formio_component_component_1.FormioComponentComponent();
        component.component = settings;
        component.form = _this.form;
        component.ngOnInit();
        return component;
    };
    it('Test FormioComponent for Signature', function () {
        var component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof signature_1.SignatureComponent).toEqual(true);
    });
    it('Type should be Signature', function () {
        var settings = getSettings({
            type: "signature"
        });
        // Create the signature component.
        var signature = new signature_1.SignatureComponent(_this.form, settings);
        expect(signature.settings.type).toEqual("signature");
    });
    it('Should allow label value', function () {
        var settings = getSettings({
            label: 'Signature'
        });
        // Create the signature component.
        var signature = new signature_1.SignatureComponent(_this.form, settings);
        expect(signature.label).toEqual('Signature');
    });
    it('Should allow Signature component with required', function () {
        var settings = getSettings({
            required: false
        });
        // Create the signature component.
        var signature = new signature_1.SignatureComponent(_this.form, settings);
        expect(signature.settings.required).toEqual(false);
    });
    it('Should allow width', function () {
        var settings = getSettings({
            width: "100%"
        });
        // Create the signature component.
        var signature = new signature_1.SignatureComponent(_this.form, settings);
        expect(signature.settings.width).toEqual("100%");
    });
    it('Should allow height', function () {
        var settings = getSettings({
            height: "300px"
        });
        // Create the signature component.
        var signature = new signature_1.SignatureComponent(_this.form, settings);
        expect(signature.settings.height).toEqual("300px");
    });
    it('Should allow penColor', function () {
        var settings = getSettings({
            penColor: "green"
        });
        // Create the signature component.
        var signature = new signature_1.SignatureComponent(_this.form, settings);
        expect(signature.settings.penColor).toEqual("green");
    });
    it('Should allow backgroundColor', function () {
        var settings = getSettings({
            backgroundColor: "rgb(245,245,235)"
        });
        // Create the signature component.
        var signature = new signature_1.SignatureComponent(_this.form, settings);
        expect(signature.settings.backgroundColor).toEqual("rgb(245,245,235)");
    });
    it('Should allow minWidth and maxWidth', function () {
        var settings = getSettings({
            minWidth: "0.5",
            maxWidth: "2.5"
        });
        // Create the signature component.
        var signature = new signature_1.SignatureComponent(_this.form, settings);
        expect(signature.settings.minWidth).toEqual("0.5");
        expect(signature.settings.maxWidth).toEqual("2.5");
    });
});
