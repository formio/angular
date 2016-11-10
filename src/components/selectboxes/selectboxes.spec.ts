/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { SelectBoxComponent, SelectBoxOptions } from './selectboxes';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { FormioComponentComponent } from '../../formio-component.component';

describe('SelectBoxComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): SelectBoxOptions => {
        let settings: SelectBoxOptions = {
            input: true,
            tableView: true,
            label: "Select box",
            key: "selectbox",
            values: [
                {
                    value: "tea",
                    label: "Tea"
                },
                {
                    value: "tea",
                    label: "Coffee"
                },
                {
                    value: "chocolate",
                    label: "Chocolate"
                }
            ],
            inline: true,
            protected: false,
            persistent: true,
            validate: {
                required: false
            },
            type: "selectboxes",
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            customClass: "myselect"
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:SelectBoxOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for SelectBox as Custom component', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof SelectBoxComponent).toEqual(true);
    });

    it('Its type should be selectboxes', () => {
        let settings: SelectBoxOptions = getSettings({
            type: "selectboxes"
        });

        // Create the selectbox component.
        let selectbox = new SelectBoxComponent(this.form, settings);
        expect(selectbox.settings.type).toEqual("selectboxes");
    });

    it('Should allow label value', () => {
        let settings: SelectBoxOptions = getSettings({
            label: "SelectBox"
        });

        // Create the selectbox component.
        let selectbox = new SelectBoxComponent(this.form, settings);
        expect(selectbox.settings.label).toEqual("SelectBox");
    });

    it('Should allow SelectBox component with required', () => {
        let settings: SelectBoxOptions = getSettings({
            required: true
        });

        // Create the selectbox component.
        let selectbox = new SelectBoxComponent(this.form, settings);
        expect(selectbox.settings.required).toEqual(true);
    });

    it('Check SelectBox option values are available or not',() => {
        let settings: SelectBoxOptions = getSettings({
            values: [
                {
                    value: "1",
                    label: "option1"
                },
                {
                    value: "2",
                    label: "option2"
                }
            ]
        });

        // Create the selectbox component.
        let selectbox = new SelectBoxComponent(this.form, settings);
        expect(selectbox.settings.values.length).not.toEqual(0);
    });

    it('Check SelectBox options contains labels or not',() => {
        let settings: SelectBoxOptions = getSettings({
            values: [
                {
                    value: "1",
                    label: "option1"
                }
            ]
        });

        // Create the selectbox component.
        let selectbox = new SelectBoxComponent(this.form, settings);
        expect(selectbox.settings.values[0].label).not.toEqual('');
    });

    it('Check SelectBox options appears in inline or not',() => {
        let settings: SelectBoxOptions = getSettings({
            inline : true
        });

        // Create the selectbox component.
        let selectbox = new SelectBoxComponent(this.form, settings);
        expect(selectbox.settings.inline).toEqual(true);
    });

    it('Should allow custom class',() => {
        let settings: SelectBoxOptions = getSettings({
            customClass : "myselect"
        });

        // Create the selectbox component.
        let selectbox = new SelectBoxComponent(this.form, settings);
        expect(selectbox.settings.customClass).toEqual("myselect");
    });
});
