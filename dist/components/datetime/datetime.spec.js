"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var formio_component_component_1 = require('../../formio-component.component');
var datetime_1 = require('./datetime');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
describe('SelectComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    var getSettings = function (overrides) {
        var settings = {
            input: true,
            tableView: true,
            label: "DateTime",
            key: "dateTime",
            placeholder: "Select date and time",
            format: "yyyy-MM-dd HH:mm",
            enableDate: true,
            enableTime: true,
            datepickerMode: "day",
            datePicker: {
                showWeeks: true,
                startingDay: "0",
                initDate: "",
                minMode: "month",
                maxMode: "year",
                yearRange: "20",
                datepickerMode: "day"
            },
            timePicker: {
                hourStep: 1,
                minuteStep: 1,
                showMeridian: true,
                readonlyInput: true,
                mousewheel: true,
                arrowkeys: false
            },
            protected: false,
            persistent: true,
            validate: {
                required: false,
                custom: ""
            },
            type: "datetime",
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            minDate: "2016-07-01T18:30:00.000Z",
            maxDate: "2016-08-30T18:30:00.000Z"
        };
        Object.assign(settings, overrides);
        return settings;
    };
    var getComponent = function (overrides) {
        var settings = getSettings(overrides);
        var component = new formio_component_component_1.FormioComponentComponent();
        component.component = settings;
        component.form = _this.form;
        component.ngOnInit();
        return component;
    };
    it('Test FormioComponent for DateTime', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof datetime_1.DateTimeComponent).toEqual(true);
    });
    it('Type should be DateTime', function () {
        var settings = getSettings({
            type: "datetime"
        });
        // Create the datetime component.
        var datetime = new datetime_1.DateTimeComponent(_this.form, settings);
        expect(datetime.settings.type).toEqual("datetime");
    });
    it('Should allow label', function () {
        var settings = getSettings({
            label: "DateTime"
        });
        // Create the datetime component.
        var datetime = new datetime_1.DateTimeComponent(_this.form, settings);
        expect(datetime.settings.label).toEqual("DateTime");
    });
    it('Should allow placeholder', function () {
        var settings = getSettings({
            placeholder: "Select date and time"
        });
        // Create the datetime component.
        var datetime = new datetime_1.DateTimeComponent(_this.form, settings);
        expect(datetime.settings.placeholder).toEqual("Select date and time");
    });
    it('Should allow minDate', function () {
        var component = getComponent({});
        expect(component.components[0].settings.minDate).not.toEqual(null);
    });
    it('Should allow maxDate', function () {
        var component = getComponent({});
        expect(component.components[0].settings.maxDate).not.toEqual(null);
    });
    it('Should allow format', function () {
        var settings = getSettings({
            format: "yyyy-MM-dd HH:mm"
        });
        // Create the datetime component.
        var datetime = new datetime_1.DateTimeComponent(_this.form, settings);
        expect(datetime.settings.format).toEqual("yyyy-MM-dd HH:mm");
    });
    it('Should allow datepicker options', function () {
        var settings = getSettings({
            showWeeks: true,
            startingDay: "0",
            initDate: "2016-01-01",
            minMode: "month",
            maxMode: "year",
            yearRange: "20",
            datepickerMode: "day"
        });
        // Create the datetime component.
        var datetime = new datetime_1.DateTimeComponent(_this.form, settings);
        expect(datetime.settings.showWeeks).toEqual(true);
        expect(datetime.settings.startingDay).toEqual('0');
        expect(datetime.settings.initDate).toEqual("2016-01-01");
        expect(datetime.settings.minMode).toEqual("month");
        expect(datetime.settings.maxMode).toEqual("year");
        expect(datetime.settings.yearRange).toEqual("20");
        expect(datetime.settings.datepickerMode).toEqual("day");
    });
    it('Should allow timepicker options', function () {
        var settings = getSettings({
            hourStep: 1,
            minuteStep: 1,
            showMeridian: true,
            readonlyInput: true,
            mousewheel: true,
            arrowkeys: false
        });
        // Create the datetime component.
        var datetime = new datetime_1.DateTimeComponent(_this.form, settings);
        expect(datetime.settings.hourStep).toEqual(1);
        expect(datetime.settings.minuteStep).toEqual(1);
        expect(datetime.settings.showMeridian).toEqual(true);
        expect(datetime.settings.readonlyInput).toEqual(true);
        expect(datetime.settings.mousewheel).toEqual(true);
        expect(datetime.settings.arrowkeys).toEqual(false);
    });
});
