"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var forms_1 = require('@angular/forms');
var base_1 = require('../base');
var components_1 = require('../components');
var DataGridComponent = (function (_super) {
    __extends(DataGridComponent, _super);
    function DataGridComponent() {
        _super.apply(this, arguments);
    }
    DataGridComponent.prototype.getControl = function () {
        if (!this.control) {
            this.control = new forms_1.FormArray([
                new forms_1.FormGroup({})
            ]);
            // Add new controls for all rows in the data.
            if (this.data &&
                this.data.hasOwnProperty(this.settings.key) &&
                this.data[this.settings.key] &&
                this.data[this.settings.key].length > 1) {
                for (var i = 1; i < this.data[this.settings.key].length; i++) {
                    this.control['push'](new forms_1.FormGroup({}));
                }
            }
        }
        return this.control;
    };
    DataGridComponent.prototype.addAnother = function () {
        this.control['push'](new forms_1.FormGroup({}));
    };
    DataGridComponent.prototype.removeAt = function (index) {
        this.control['removeAt'](index);
    };
    return DataGridComponent;
}(base_1.BaseComponent));
exports.DataGridComponent = DataGridComponent;
var DataGridElement = (function (_super) {
    __extends(DataGridElement, _super);
    function DataGridElement() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DataGridElement.prototype, "numComponents", {
        get: function () {
            var total = this.component.control['controls'].length;
            total *= this.component.settings.components.length;
            return total;
        },
        enumerable: true,
        configurable: true
    });
    return DataGridElement;
}(base_1.BaseElement));
exports.DataGridElement = DataGridElement;
function DataGrid(template) {
    components_1.FormioComponents.register('datagrid', DataGridComponent, DataGridElement, template.components.datagrid);
    return DataGridElement;
}
exports.DataGrid = DataGrid;
;
