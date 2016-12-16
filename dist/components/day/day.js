"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var DayComponent = (function (_super) {
    __extends(DayComponent, _super);
    function DayComponent() {
        _super.apply(this, arguments);
    }
    return DayComponent;
}(base_1.BaseComponent));
exports.DayComponent = DayComponent;
var DayElement = (function (_super) {
    __extends(DayElement, _super);
    function DayElement() {
        _super.apply(this, arguments);
        this.months = [];
        this.date = { day: '', month: '', year: '' };
    }
    DayElement.prototype.ngOnInit = function () {
        this.months = [this.component.settings.fields.month.placeholder, 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
    };
    DayElement.prototype.getDay = function (event) {
        console.log("Day:", event.target.value);
    };
    DayElement.prototype.getMonth = function (event) {
        console.log("Month:", event);
    };
    DayElement.prototype.getYear = function (event) {
        console.log("Year:", event.target.value);
    };
    return DayElement;
}(base_1.BaseElement));
exports.DayElement = DayElement;
function DayField(template) {
    components_1.FormioComponents.register('day', DayComponent, DayElement, template.components.day);
    return DayElement;
}
exports.DayField = DayField;
