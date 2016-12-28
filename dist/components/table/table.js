"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var forms_1 = require('@angular/forms');
var TableComponent = (function (_super) {
    __extends(TableComponent, _super);
    function TableComponent() {
        _super.apply(this, arguments);
    }
    TableComponent.prototype.getControl = function () {
        if (!this.control) {
            this.control = new forms_1.FormArray([
                new forms_1.FormGroup({})
            ]);
        }
        return this.control;
    };
    return TableComponent;
}(base_1.BaseComponent));
exports.TableComponent = TableComponent;
var TableElement = (function (_super) {
    __extends(TableElement, _super);
    function TableElement() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(TableElement.prototype, "numComponents", {
        get: function () {
            var total = 0;
            for (var i in this.component.settings.rows) {
                for (var j in this.component.settings.rows[i]) {
                    total += this.component.settings.rows[i][j].components.length;
                }
            }
            return total;
        },
        enumerable: true,
        configurable: true
    });
    return TableElement;
}(base_1.BaseElement));
exports.TableElement = TableElement;
function TableField(template) {
    components_1.FormioComponents.register('table', TableComponent, TableElement, template.components.table);
    return TableElement;
}
exports.TableField = TableField;
