"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var DateTimeComponent = (function (_super) {
    __extends(DateTimeComponent, _super);
    function DateTimeComponent() {
        _super.apply(this, arguments);
    }
    return DateTimeComponent;
}(base_1.BaseComponent));
exports.DateTimeComponent = DateTimeComponent;
var DateTimeElement = (function (_super) {
    __extends(DateTimeElement, _super);
    function DateTimeElement() {
        _super.apply(this, arguments);
        this.displayDate = false;
        this.displayTime = false;
    }
    DateTimeElement.prototype.selectDate = function () {
        this.displayDate = true;
        this.displayTime = false;
    };
    DateTimeElement.prototype.registerTime = function (timepicker) {
        var _this = this;
        timepicker.selected = this.date;
        timepicker.registerOnChange(function (time) {
            _this.date.setHours(time.getHours());
            _this.date.setMinutes(time.getMinutes());
            _this.setDate(_this.date);
        });
        return true;
    };
    DateTimeElement.prototype.selectTime = function () {
        this.displayDate = false;
        this.displayTime = true;
    };
    DateTimeElement.prototype.setDate = function (date) {
        this.date = date;
        this.component.control.setValue(date);
    };
    DateTimeElement.prototype.now = function () {
        this.setDate(new Date());
    };
    DateTimeElement.prototype.clear = function () {
        this.setDate(null);
    };
    DateTimeElement.prototype.close = function () {
        this.displayDate = false;
        this.displayTime = false;
    };
    DateTimeElement.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.setDate(new Date());
    };
    return DateTimeElement;
}(base_1.BaseElement));
exports.DateTimeElement = DateTimeElement;
function DateTimeField(template) {
    components_1.FormioComponents.register('datetime', DateTimeComponent, DateTimeElement, template.components.datetime);
    return DateTimeElement;
}
exports.DateTimeField = DateTimeField;
//# sourceMappingURL=datetime.js.map