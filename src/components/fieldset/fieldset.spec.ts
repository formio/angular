import { describe, expect, it } from '@angular/core/testing';
import { FormGroup, FormArray } from '@angular/forms';
import { FieldSetComponent, FieldSetOptions } from './fieldset';
import { FormioComponentsComponent } from '../../formio-components.component';
import { FormioComponent } from '../../formio-component.component';

describe('FieldSetComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): FieldSetOptions => {
        let settings: FieldSetOptions = {
            input: false,
            tableView: true,
            legend: "FieldSet",
            type: "fieldset",
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            components: [{
                input: true,
                tableView: true,
                inputType: "text",
                inputMask: "",
                label: "FirstName",
                key: "firstName",
                placeholder: "Enter FirstName",
                prefix: "",
                suffix: "",
                multiple: false,
                defaultValue: "",
                protected: false,
                unique: false,
                persistent: true,
                validate: {
                    required: false,
                    minLength: "",
                    maxLength: "",
                    pattern: "",
                    custom: "",
                    customPrivate: false
                },
                conditional: {
                    show: null,
                    when: null,
                    eq: ""
                },
                type: "textfield"
            },{
                input: true,
                tableView: true,
                inputType: "text",
                inputMask: "",
                label: "LastName",
                key: "lastName",
                placeholder: "Enter LastName",
                prefix: "",
                suffix: "",
                multiple: false,
                defaultValue: "",
                protected: false,
                unique: false,
                persistent: true,
                validate: {
                    required: false,
                    minLength: "",
                    maxLength: "",
                    pattern: "",
                    custom: "",
                    customPrivate: false
                },
                conditional: {
                    show: null,
                    when: null,
                    eq: ""
                },
                type: "textfield"
            }]
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponent<string> => {
        let settings:FieldSetOptions = getSettings(overrides);
        let component = new FormioComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for FieldSet', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof FieldSetComponent).toEqual(true);
    });

    it('Should allow legend value', () => {
        let settings: FieldSetOptions = getSettings({
            legend: "FieldSet"
        });

        // Create the fieldset component.
        let fieldset = new FieldSetComponent(this.form, settings);
        expect(fieldset.settings.legend).toEqual("FieldSet");
    });

    it('Its type should be fieldset', () => {
        let settings: FieldSetOptions = getSettings({
            type: "fieldset"
        });

        // Create the fieldset component.
        let fieldset = new FieldSetComponent(this.form, settings);
        expect(fieldset.settings.type).toEqual("fieldset");
    });

    it('Should create the FieldSet control.', () => {
        let settings: FieldSetOptions = getSettings({});
        let fieldset = new FieldSetComponent(this.form, settings);
        expect(fieldset.control instanceof FormGroup).toEqual(true);

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
        expect(this.form.value).toEqual({firstName: 'Test1', lastName: 'Test2'});
    });

    it('Contains components or not', () => {
        let settings:FieldSetOptions = getSettings({});
        expect( settings.components.length).not.toBe(0);
    });

});
