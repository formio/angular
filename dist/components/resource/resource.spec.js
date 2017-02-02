"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var formio_component_component_1 = require('../../formio-component.component');
var resource_1 = require('./resource');
var bootstrap_templates_1 = require('../../templates/bootstrap.templates');
var index_1 = require('../index');
var formio_events_1 = require('../../formio.events');
describe('SelectComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_templates_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
        _this.events = new formio_events_1.FormioEvents();
    });
    var getSettings = function (overrides) {
        var settings = {
            customClass: "myclass",
            conditional: {
                eq: "",
                when: null,
                show: ""
            },
            type: "resource",
            defaultPermission: "",
            validate: { "required": false },
            persistent: true,
            protected: false,
            multiple: true,
            searchFields: ["fullName"],
            selectFields: "",
            template: "<span>{{ item.data }}</span>",
            defaultValue: [],
            resource: "manager",
            placeholder: "Select Resource",
            key: "resource",
            label: "Resource",
            tableView: true,
            input: true,
            tags: []
        };
        Object.assign(settings, overrides);
        return settings;
    };
    var getComponent = function (overrides) {
        var settings = getSettings(overrides);
        var component = new formio_component_component_1.FormioComponentComponent(_this.events);
        component.component = settings;
        component.form = _this.form;
        component.ngOnInit();
        return component;
    };
    it('Test FormioComponent for Resource', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof resource_1.ResourceComponent).toEqual(true);
    });
    it('Type should be resource', function () {
        var settings = getSettings({
            type: "resource"
        });
        // Create the resource component.
        var resource = new resource_1.ResourceComponent(_this.form, settings, _this.events);
        expect(resource.settings.type).toEqual("resource");
    });
    it('Should allow label', function () {
        var settings = getSettings({
            label: "Resource"
        });
        // Create the resource component.
        var resource = new resource_1.ResourceComponent(_this.form, settings, _this.events);
        expect(resource.settings.label).toEqual("Resource");
    });
    it('Should allow placeholder', function () {
        var settings = getSettings({
            placeholder: "Select one"
        });
        // Create the resource component.
        var resource = new resource_1.ResourceComponent(_this.form, settings, _this.events);
        expect(resource.settings.placeholder).toEqual("Select one");
    });
    it('Should allow template', function () {
        var settings = getSettings({
            template: "<span>{{ item.data }}</span>"
        });
        // Create the resource component.
        var resource = new resource_1.ResourceComponent(_this.form, settings, _this.events);
        expect(resource.settings.template).toEqual("<span>{{ item.data }}</span>");
    });
});
//# sourceMappingURL=resource.spec.js.map