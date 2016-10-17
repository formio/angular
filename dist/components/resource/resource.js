"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var Formio = require('formiojs');
var ResourceComponent = (function (_super) {
    __extends(ResourceComponent, _super);
    function ResourceComponent() {
        _super.apply(this, arguments);
    }
    ResourceComponent.prototype.allowMultiple = function () {
        return false;
    };
    return ResourceComponent;
}(base_1.BaseComponent));
exports.ResourceComponent = ResourceComponent;
var ResourceElement = (function (_super) {
    __extends(ResourceElement, _super);
    function ResourceElement() {
        _super.apply(this, arguments);
        this.value = {};
    }
    ResourceElement.prototype.refreshValue = function (value) {
        this.value = value;
    };
    ResourceElement.prototype.searchData = function (text) {
        var _this = this;
        var selectItems = [];
        var baseUrl = Formio.getBaseUrl() + '/project/' + this.component.settings.project + '/form/' + this.component.settings.resource;
        var params = {};
        if (this.component.settings.selectFields) {
            params.select = this.component.settings.selectFields;
        }
        if (this.component.settings.searchFields && text) {
            this.component.settings.searchFields.forEach(function (item) {
                params[item] = text;
            });
        }
        (new Formio(baseUrl)).loadSubmissions({ params: params }).then(function (submission) {
            for (var i = 0; i < submission.length; i++) {
                selectItems.push({ id: JSON.stringify(submission[i].data), text: JSON.stringify(submission[i].data) });
            }
            _this.component.settings.defaultValue = selectItems.slice(0);
        });
    };
    ResourceElement.prototype.ngOnInit = function () {
        this.searchData(null);
    };
    return ResourceElement;
}(base_1.BaseElement));
exports.ResourceElement = ResourceElement;
function ResourceField(template) {
    components_1.FormioComponents.register('resource', ResourceComponent, ResourceElement, template.components.resource);
    return ResourceElement;
}
exports.ResourceField = ResourceField;
