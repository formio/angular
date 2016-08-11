import { describe, expect, it } from '@angular/core/testing';
import { FormGroup, FormArray } from '@angular/forms';
import { PanelComponent, PanelOptions } from './panel';
import { FormioComponentsComponent } from '../../formio-components.component';
import { FormioComponent } from '../../formio-component.component';

describe('PanelComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): PanelOptions => {
        let settings: PanelOptions = {
            input: false,
            title: "Panel",
            theme: "primary",
            type: "panel",
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
                label: "Name",
                key: "name",
                placeholder: "Enter your Name",
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
            },{
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
            }]
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponent<string> => {
        let settings:PanelOptions = getSettings(overrides);
        let component = new FormioComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for Panel', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof PanelComponent).toEqual(true);
    });

    it('Should allow title value', () => {
        let settings: PanelOptions = getSettings({
            title: "Panel"
        });

        // Create the panel component.
        let panel = new PanelComponent(this.form, settings);
        expect(panel.settings.title).toEqual("Panel");
    });

    it('Should allow theme value', () => {
        let settings: PanelOptions = getSettings({
            theme: "primary"
        });

        // Create the panel component.
        let panel = new PanelComponent(this.form, settings);
        expect(panel.settings.theme).toEqual("primary");
    });

    it('Its type should be panel', () => {
        let settings: PanelOptions = getSettings({
            type: "panel"
        });

        // Create the panel component.
        let panel = new PanelComponent(this.form, settings);
        expect(panel.settings.type).toEqual("panel");
    });

    it('Should create the Panel control.', () => {
        let settings: PanelOptions = getSettings({});
        let panel = new PanelComponent(this.form, settings);
        expect(panel.control instanceof FormArray).toEqual(true);

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
        expect(this.form.value).toEqual({name: 'Test1', textarea: 'Test2'});
    });

    it('Contains components or not', () => {
        let settings:PanelOptions = getSettings({});
        expect( settings.components.length).not.toBe(0);
    });

});
