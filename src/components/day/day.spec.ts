/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { DayComponent, DayOptions } from './day';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { FormioComponentComponent } from '../../formio-component.component';

describe('PanelComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): DayOptions => {
        let settings: DayOptions = {
            input: true,
            tableView: true,
            label: "Day",
            key: "day",
            fields: {
                day: {
                    type: "text",
                    placeholder: "Enter day",
                    required: true
                },
                month: {
                    type: "select",
                    placeholder: "Select month",
                    required: true
                },
                year: {
                    type: "text",
                    placeholder: "Enter year",
                    required: true
                }
            },
            dayFirst: true,
            protected: false,
            persistent: true,
            validate: {
                custom: ""
            },
            type: "day",
            tags: [],
            conditional: {
                show: "",
                when: null,
                eq: ""
            },
            customClass: "dayCustomClass",
            tabindex: "5"
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:DayOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for Day', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof DayComponent).toEqual(true);
    });

    it('Its type should be day', () => {
        let settings: DayOptions = getSettings({
            type: "day"
        });

        // Create the day component.
        let day = new DayComponent(this.form, settings);
        expect(day.settings.type).toEqual("day");
    });

    it('Should allow day placeholder', () => {
        let settings: DayOptions = getSettings({
            placeholder: "Enter day"
        });

        // Create the day component.
        let day = new DayComponent(this.form, settings);
        expect(day.settings.fields.day.placeholder).toEqual("Enter day");
        expect(day.settings.fields.month.placeholder).toEqual("Select month");
        expect(day.settings.fields.year.placeholder).toEqual("Enter year");
    });

    it('Should allow customClass', () => {
        let settings: DayOptions = getSettings({
            customClass: "dayCustomClass"
        });

        // Create the day component.
        let day = new DayComponent(this.form, settings);
        expect(day.settings.customClass).toEqual("dayCustomClass");
    });

    it('Should allow required property', () => {
        let settings: DayOptions = getSettings({
            required: true
        });

        // Create the day component.
        let day = new DayComponent(this.form, settings);
        expect(day.settings.fields.day.required).toEqual(true);
        expect(day.settings.fields.month.required).toEqual(true);
        expect(day.settings.fields.year.required).toEqual(true);
    });
});
