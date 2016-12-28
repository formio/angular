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
        this.selectedDate = null;
        this.checkDates = null;
        this.displayDate = false;
        this.displayTime = false;
        this.minDate = void 0;
        this.time = void 0;
    }
    DateTimeElement.prototype.getDate = function () {
        return this.selectedDate;
    };
    DateTimeElement.prototype.today = function () {
        this.showDateTime = true;
        this.selectedDate = new Date();
        if (this.component.settings.enableTime) {
            if (!this.time) {
                this.time = new Date().setHours(0, 0, 0, 0);
            }
        }
    };
    DateTimeElement.prototype.clear = function () {
        this.showDateTime = false;
        this.selectedDate = void 0;
        this.time = void 0;
    };
    DateTimeElement.prototype.close = function () {
        this.displayDate = false;
        this.displayTime = false;
    };
    DateTimeElement.prototype.selectDate = function () {
        if ((!this.component.settings.enableTime && this.component.settings.enableDate) || (this.component.settings.enableTime && this.component.settings.enableDate)) {
            this.displayDate = true;
            this.displayTime = false;
        }
        else if (this.component.settings.enableTime && !this.component.settings.enableDate) {
            this.displayDate = false;
            this.displayTime = true;
        }
    };
    DateTimeElement.prototype.selectTime = function (date) {
        if (this.component.settings.enableTime) {
            if (date != this.checkDates) {
                this.checkDates = date;
                this.displayTime = true;
                this.displayDate = false;
            }
            if (!this.time) {
                this.time = new Date().setHours(0, 0, 0, 0);
            }
        }
        if (date instanceof Date) {
            this.showDateTime = true;
        }
    };
    DateTimeElement.prototype.selectFirstTime = function () {
        this.displayTime = true;
        this.displayDate = false;
        this.checkDate();
        if (!this.time) {
            this.showDateTime = false;
        }
    };
    DateTimeElement.prototype.checkDate = function () {
        this.showDateTime = true;
        if (this.component.settings.enableDate) {
            if (!this.selectedDate) {
                this.selectedDate = new Date();
            }
        }
    };
    DateTimeElement.prototype.now = function () {
        this.checkDate();
        this.time = new Date();
    };
    DateTimeElement.prototype.ngOnInit = function () {
        this.dateFormat = this.component.settings.format.split(' ')[0];
    };
    return DateTimeElement;
}(base_1.BaseElement));
exports.DateTimeElement = DateTimeElement;
function DateTimeField(template) {
    components_1.FormioComponents.register('datetime', DateTimeComponent, DateTimeElement, template.components.datetime);
    return DateTimeElement;
}
exports.DateTimeField = DateTimeField;
