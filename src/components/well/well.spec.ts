import { describe, expect, it } from '@angular/core/testing';
import { FormGroup, FormArray } from '@angular/forms';
import { WellComponent, WellOptions } from './well';
import { FormioComponentsComponent } from '../../formio-components.component';
import { FormioComponent } from '../../formio-component.component';

describe('WellComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): WellOptions => {
        let settings: WellOptions = {
            input: false,
            type: "well",
            key: "Well",
            lockKey: true,
            components: [{
                input: true,
                tableView: true,
                inputType: "text",
                inputMask: "",
                label: "Textfield",
                key: "text",
                placeholder: "Enter your text",
                prefix: "",
                suffix: "",
                multiple: false,
                defaultValue: "",
                protected: false,
                unique: false,
                persistent: true,
                validate: {
                    required: true,
                    minLength: 6,
                    maxLength: 10,
                    pattern: "",
                    custom: "",
                    customPrivate: false
                },
                conditional: {
                    show: "",
                    when: null,
                    eq: ""
                },
                type: "textfield"
            }, {
                input: true,
                tableView: true,
                label: "Textarea",
                key: "textarea",
                placeholder: "Enter Your Text Here",
                prefix: "",
                suffix: "",
                rows: 3,
                multiple: false,
                defaultValue: "",
                protected: false,
                persistent: true,
                validate: {
                    required: true,
                    minLength: 5,
                    maxLength: 100,
                    pattern: "",
                    custom: ""
                },
                type: "textarea",
                conditional: {
                    show: null,
                    when: null,
                    eq: ""
                }
            }],
            conditional: {
                show: null,
                when: null,
                eq: ""
            }
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponent<string> => {
        let settings:WellOptions = getSettings(overrides);
        let component = new FormioComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for Well', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof WellComponent).toEqual(true);
    });

    it('type should be well', () => {
        let settings: WellOptions = getSettings({
            type: "well"
        });

        // Create the well component.
        let well = new WellComponent(this.form, settings);
        expect(well.settings.type).toEqual("well");
    });

    it('Should create Well control.', () => {
        let settings: WellOptions = getSettings({});
        let fieldset = new WellComponent(this.form, settings);
        expect(fieldset.control instanceof FormArray).toEqual(true);

        let index = 0;
        let components = new FormioComponentsComponent();
        components.components = settings.components;
        components.form = this.form;
        settings.components.forEach((comp: any) => {
            index++;
            let component = new FormioComponent();
            component.component = comp;
            component.form = this.form;
            component.ngOnInit();
            component.form.controls[comp.key]['updateValue']('Test' + index);
            component.form.controls[comp.key]['markAsDirty']();
        });
        expect(this.form.value).toEqual({text: 'Test1', textarea: 'Test2'});
    });

    it('Should contain components', () => {
        let settings:WellOptions = getSettings({});
        expect( settings.components.length).not.toBe(0);
    });

});
