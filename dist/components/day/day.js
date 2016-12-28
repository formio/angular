"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var forms_1 = require("@angular/forms");
function DayValidator(component) {
    return function (control) {
        if (control.value) {
            var date = control.value.split('/');
            if ((component.settings.fields.day.required && date[0] == '00') ||
                (component.settings.fields.month.required && date[1] == '00') ||
                (component.settings.fields.year.required && date[2] == '0000')) {
                return { 'invalidDay': true };
            }
        }
        return null;
    };
}
exports.DayValidator = DayValidator;
var DayComponent = (function (_super) {
    __extends(DayComponent, _super);
    function DayComponent() {
        _super.apply(this, arguments);
    }
    DayComponent.prototype.getError = function (type, error) {
        var message = _super.prototype.getError.call(this, type, error);
        if (!message && (type === 'invalidDay')) {
            message = this.label + ' must be a valid Date';
        }
        return message;
    };
    DayComponent.prototype.addValidators = function () {
        _super.prototype.addValidators.call(this);
        this.validators.push(DayValidator(this));
    };
    return DayComponent;
}(base_1.BaseComponent));
exports.DayComponent = DayComponent;
var DayElement = (function (_super) {
    __extends(DayElement, _super);
    function DayElement() {
        _super.apply(this, arguments);
        this.months = [];
        this.date = { day: '', month: '', year: '' };
        this.dayGroup = new forms_1.FormGroup({
            day: new forms_1.FormControl(),
            month: new forms_1.FormControl(),
            year: new forms_1.FormControl()
        });
    }
    DayElement.prototype.ngOnInit = function () {
        this.months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        if (this.component.data[this.component.settings.key] != null) {
            var assignDate = this.component.data[this.component.settings.key].split('/');
            this.date['day'] = parseInt(assignDate[0]);
            this.date['year'] = parseInt(assignDate[2]);
            if (parseInt(assignDate[1]) < 10) {
                this.date['month'] = parseInt(assignDate[1][1]);
            }
            else {
                this.date['month'] = parseInt(assignDate[1]);
            }
        }
    };
    DayElement.prototype.getDay = function (day) {
        if (isNaN(day)) {
            day = '';
        }
        if (day.length > 2) {
            day = day.substring(0, 2);
        }
        if (parseInt(day) < 1 || parseInt(day) > 31) {
            day = day.substring(0, 1);
        }
        this.date['day'] = day;
        this.updateModel();
    };
    DayElement.prototype.getMonth = function (month) {
        this.date['month'] = month;
        this.updateModel();
    };
    DayElement.prototype.getYear = function (year) {
        if (isNaN(year)) {
            year = '';
        }
        if (year.length > 4) {
            year = year.substring(0, 4);
        }
        if (parseInt(year) < 0 || parseInt(year) > 2100) {
            year = year.substring(0, 3);
        }
        this.date['year'] = year;
        this.updateModel();
    };
    DayElement.prototype.updateModel = function () {
        var day = this.date['day'];
        var month = this.date['month'];
        var year = this.date['year'];
        if (day == '') {
            day = '00';
        }
        else if (day.length < 2) {
            day = '0' + day;
        }
        if (month == '') {
            month = '00';
        }
        else if (month.length < 2) {
            month = '0' + month;
        }
        if (year == '') {
            year = '0000';
        }
        else if (year.length == 3) {
            year = '0' + year;
        }
        else if (year.length == 2) {
            year = '00' + year;
        }
        else if (year.length == 1) {
            year = '000' + year;
        }
        this.component.setValue(day + '/' + month + '/' + year);
    };
    return DayElement;
}(base_1.BaseElement));
exports.DayElement = DayElement;
function DayField(template) {
    components_1.FormioComponents.register('day', DayComponent, DayElement, template.components.day);
    return DayElement;
}
exports.DayField = DayField;
