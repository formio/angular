import { FormGroup } from '@angular/forms';
import { FormioComponentComponent } from '../../formio-component.component';
import { DateTimeComponent, DateTimeOptions } from './datetime';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';

describe('SelectComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): DateTimeOptions => {
        let settings: DateTimeOptions = <DateTimeOptions>{
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

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:DateTimeOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };
    it('Test FormioComponent for DateTime', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof DateTimeComponent).toEqual(true);
    });

    it('Type should be DateTime', () => {
        let settings: DateTimeOptions = getSettings({
            type: "datetime"
        });

        // Create the datetime component.
        let datetime = new DateTimeComponent(this.form, settings);
        expect(datetime.settings.type).toEqual("datetime");
    });

    it('Should allow label', () => {
        let settings: DateTimeOptions = getSettings({
            label: "DateTime"
        });

        // Create the datetime component.
        let datetime = new DateTimeComponent(this.form, settings);
        expect(datetime.settings.label).toEqual("DateTime");
    });

    it('Should allow placeholder', () => {
        let settings: DateTimeOptions = getSettings({
            placeholder: "Select date and time"
        });

        // Create the datetime component.
        let datetime = new DateTimeComponent(this.form, settings);
        expect(datetime.settings.placeholder).toEqual("Select date and time");
    });

    it('Should allow minDate', () => {
        let component = getComponent({});
        expect(component.components[0].settings.minDate).not.toEqual(null);
    });

    it('Should allow maxDate', () => {
        let component = getComponent({});
        expect(component.components[0].settings.maxDate).not.toEqual(null);
    });

    it('Should allow format', () => {
        let settings: DateTimeOptions = getSettings({
            format: "yyyy-MM-dd HH:mm"
        });

        // Create the datetime component.
        let datetime = new DateTimeComponent(this.form, settings);
        expect(datetime.settings.format).toEqual("yyyy-MM-dd HH:mm");
    });

    it('Should allow datepicker options', () => {
        let settings: DateTimeOptions = getSettings({
            showWeeks: true,
            startingDay: "0",
            initDate: "2016-01-01",
            minMode: "month",
            maxMode: "year",
            yearRange: "20",
            datepickerMode: "day"
        });

        // Create the datetime component.
        let datetime = new DateTimeComponent(this.form, settings);
        expect(datetime.settings.showWeeks).toEqual(true);
        expect(datetime.settings.startingDay).toEqual('0');
        expect(datetime.settings.initDate).toEqual("2016-01-01");
        expect(datetime.settings.minMode).toEqual("month");
        expect(datetime.settings.maxMode).toEqual("year");
        expect(datetime.settings.yearRange).toEqual("20");
        expect(datetime.settings.datepickerMode).toEqual("day");
    });


    it('Should allow timepicker options', () => {
        let settings: DateTimeOptions = getSettings({
            hourStep: 1,
            minuteStep: 1,
            showMeridian: true,
            readonlyInput: true,
            mousewheel: true,
            arrowkeys: false
        });

        // Create the datetime component.
        let datetime = new DateTimeComponent(this.form, settings);
        expect(datetime.settings.hourStep).toEqual(1);
        expect(datetime.settings.minuteStep).toEqual(1);
        expect(datetime.settings.showMeridian).toEqual(true);
        expect(datetime.settings.readonlyInput).toEqual(true);
        expect(datetime.settings.mousewheel).toEqual(true);
        expect(datetime.settings.arrowkeys).toEqual(false);
    });
});
