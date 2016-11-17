"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var formio_component_component_1 = require('../../formio-component.component');
var html_1 = require('./html');
describe('HtmlComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    // An easy method for getting new HtmlElement settings.
    var getSettings = function (overrides) {
        var settings = {
            input: false,
            tag: "p",
            attrs: [
                {
                    attr: "src",
                    value: "/img"
                }
            ],
            className: "customClass",
            content: "Hello, Good Morning !!!",
            type: "htmlelement",
            conditional: {
                show: null,
                when: null,
                eq: ""
            }
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
    it('Test FormioComponent for HtmlElement', function () {
        var component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof html_1.HtmlComponent).toEqual(true);
    });
    it('Type should be htmlelement', function () {
        var settings = getSettings({
            type: 'htmlelement'
        });
        // Create the htmlelement component.
        var htmlelement = new html_1.HtmlComponent(_this.form, settings);
        expect(htmlelement.settings.type).toEqual('htmlelement');
    });
    it('Should allow className', function () {
        var settings = getSettings({
            className: 'customClass'
        });
        // Create the htmlelement component.
        var htmlelement = new html_1.HtmlComponent(_this.form, settings);
        expect(htmlelement.settings.className).toEqual('customClass');
    });
    it('Should allow tag', function () {
        var settings = getSettings({
            tag: 'p'
        });
        // Create the htmlelement component.
        var htmlelement = new html_1.HtmlComponent(_this.form, settings);
        expect(htmlelement.settings.tag).toEqual('p');
    });
    it('Should allow content', function () {
        var settings = getSettings({
            content: 'Hello, Good Morning !!!'
        });
        // Create the htmlelement component.
        var htmlelement = new html_1.HtmlComponent(_this.form, settings);
        expect(htmlelement.settings.content).toEqual('Hello, Good Morning !!!');
    });
    it('Should have attributes', function () {
        var component = getComponent({});
        expect(component.components[0].settings.attrs.length).not.toBe(0);
    });
});
