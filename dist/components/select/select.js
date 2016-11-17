"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var formio_service_1 = require('../../formio.service');
var Formio = require('formiojs');
var SelectComponent = (function (_super) {
    __extends(SelectComponent, _super);
    function SelectComponent() {
        _super.apply(this, arguments);
    }
    SelectComponent.prototype.allowMultiple = function () {
        return false;
    };
    return SelectComponent;
}(base_1.BaseComponent));
exports.SelectComponent = SelectComponent;
var SelectElement = (function (_super) {
    __extends(SelectElement, _super);
    function SelectElement() {
        _super.apply(this, arguments);
        this.value = {};
        this.submitArray = [];
    }
    SelectElement.prototype.refreshValue = function (value) {
        this.value = value;
    };
    SelectElement.prototype.selected = function (selectedValue) {
        if (this.component.settings.multiple) {
            this.submitArray.push(selectedValue.id);
            this.component.setValue(this.submitArray);
        }
        else {
            this.component.setValue(selectedValue.id);
        }
    };
    SelectElement.prototype.removed = function (removedValue) {
        if (this.component.settings.multiple) {
            this.submitArray.splice(this.submitArray.indexOf(removedValue.id), 1);
            this.component.setValue(this.submitArray);
        }
    };
    SelectElement.prototype.ngOnInit = function () {
        var _this = this;
        var selectItems = [];
        var template = this.component.settings.template.split('.')[1].split(' ')[0];
        var valueProperty = this.component.settings.valueProperty;
        switch (this.component.settings.dataSrc) {
            case 'values':
                this.component.settings.data.values.forEach(function (item) {
                    selectItems.push({ id: item.value, text: item.label });
                });
                this.component.settings.data.values = selectItems.slice(0);
                break;
            case 'json':
                this.component.settings.data.json.forEach(function (item) {
                    selectItems.push({ id: item[valueProperty], text: item[template] });
                });
                this.component.settings.data.values = selectItems.slice(0);
                break;
            case 'resource':
                var baseUrl = Formio.getAppUrl() + '/' + this.component.settings.data.resource;
                var value_1 = this.component.settings.valueProperty.split('.')[1];
                (new formio_service_1.FormioService(baseUrl)).loadSubmissions().subscribe(function (submission) {
                    for (var i = 0; i < submission.length; i++) {
                        selectItems.push({ id: submission[i].data[value_1], text: submission[i].data[value_1] });
                    }
                    _this.component.settings.data.values = selectItems.slice(0);
                });
                break;
            case 'url':
                var url = this.component.settings.data.url;
                var this1_1 = this;
                Formio.request(url).then(function (response) {
                    response.forEach(function (item) {
                        selectItems.push({ id: item[valueProperty], text: item[template] });
                    });
                    this1_1.component.settings.data.values = selectItems.slice(0);
                });
                break;
        }
    };
    return SelectElement;
}(base_1.BaseElement));
exports.SelectElement = SelectElement;
function SelectField(template) {
    components_1.FormioComponents.register('select', SelectComponent, SelectElement, template.components.select);
    return SelectElement;
}
exports.SelectField = SelectField;
