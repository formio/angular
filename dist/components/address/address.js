"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var Formio = require('formiojs');
var AddressComponent = (function (_super) {
    __extends(AddressComponent, _super);
    function AddressComponent() {
        _super.apply(this, arguments);
    }
    AddressComponent.prototype.allowMultiple = function () {
        return false;
    };
    return AddressComponent;
}(base_1.BaseComponent));
exports.AddressComponent = AddressComponent;
var AddressElement = (function (_super) {
    __extends(AddressElement, _super);
    function AddressElement() {
        _super.apply(this, arguments);
        this.value = {};
        this.submitArray = [];
        this.selectedItem = [];
    }
    AddressElement.prototype.refreshValue = function (value) {
        this.value = value;
    };
    AddressElement.prototype.selected = function (selectedValue) {
        if (this.component.settings.multiple) {
            this.submitArray.push(selectedValue.id);
            this.component.setValue(this.submitArray);
        }
        else {
            this.component.setValue(selectedValue.id);
        }
    };
    AddressElement.prototype.removed = function (removedValue) {
        if (this.component.settings.multiple) {
            this.submitArray.splice(this.submitArray.indexOf(removedValue.id), 1);
            this.component.setValue(this.submitArray);
        }
    };
    AddressElement.prototype.searchData = function (value) {
        var this1 = this;
        var selectItems = [];
        var url = "//maps.googleapis.com/maps/api/geocode/json?address=" + value + "&sensor=false";
        Formio.request(url, 'POST', {}, {}).then(function (response) {
            response.results.forEach(function (item) {
                selectItems.push({ id: item, text: item.formatted_address });
            });
            this1.selectedItem = selectItems.slice(0);
        });
    };
    return AddressElement;
}(base_1.BaseElement));
exports.AddressElement = AddressElement;
function AddressField(template) {
    components_1.FormioComponents.register('address', AddressComponent, AddressElement, template.components.address);
    return AddressElement;
}
exports.AddressField = AddressField;
