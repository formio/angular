"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var bootstrap_templates_1 = require('../../templates/bootstrap.templates');
var index_1 = require('../index');
var content_1 = require('./content');
var formio_component_component_1 = require('../../formio-component.component');
var formio_events_1 = require('../../formio.events');
describe('ContentComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_templates_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
        _this.events = new formio_events_1.FormioEvents();
    });
    // An easy method for getting new content settings.
    var getSettings = function (overrides) {
        var settings = {
            input: false,
            html: "<p><em><strong>Good Morning Guys!!!<br>This is Content component.</strong></em></p> ",
            type: "content",
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            key: "mycontent",
            lockKey: true
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
    it('Test FormioComponent for Content', function () {
        var component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof content_1.ContentComponent).toEqual(true);
    });
    it('Check for type is Content or not', function () {
        var settings = getSettings({
            type: 'content'
        });
        // Create the content component.
        var content = new content_1.ContentComponent(_this.form, settings, _this.events);
        expect(content.settings.type).toEqual('content');
    });
    it('Should allow key', function () {
        var settings = getSettings({
            key: 'mycontent'
        });
        // Create the content component.
        var content = new content_1.ContentComponent(_this.form, settings, _this.events);
        expect(content.settings.key).toEqual('mycontent');
    });
    it('Should allow html', function () {
        var settings = getSettings({
            html: "<p><em><strong>Good Morning Guys!!!</strong></em></p>"
        });
        // Create the content component.
        var content = new content_1.ContentComponent(_this.form, settings, _this.events);
        expect(content.settings.html).toEqual('<p><em><strong>Good Morning Guys!!!</strong></em></p>');
    });
});
//# sourceMappingURL=content.spec.js.map