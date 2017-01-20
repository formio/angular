import { FormGroup } from '@angular/forms';
import { PanelComponent, PanelOptions } from './panel';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.templates';
import { RegisterComponents } from '../index';
import { FormioComponentsComponent } from '../../formio-components.component';
import { FormioComponentComponent } from '../../formio-component.component';
import { FormioEvents } from '../../formio.events';

describe('PanelComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
        this.events = new FormioEvents();
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

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:PanelOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>(this.events);
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
        let panel = new PanelComponent(this.form, settings, this.events);
        expect(panel.settings.title).toEqual("Panel");
    });

    it('Should allow theme value', () => {
        let settings: PanelOptions = getSettings({
            theme: "primary"
        });

        // Create the panel component.
        let panel = new PanelComponent(this.form, settings, this.events);
        expect(panel.settings.theme).toEqual("primary");
    });

    it('Its type should be panel', () => {
        let settings: PanelOptions = getSettings({
            type: "panel"
        });

        // Create the panel component.
        let panel = new PanelComponent(this.form, settings, this.events);
        expect(panel.settings.type).toEqual("panel");
    });

    it('Should create the Panel control.', () => {
        let settings: PanelOptions = getSettings({});
        let panel = new PanelComponent(this.form, settings, this.events);
        expect(panel.control instanceof FormGroup).toEqual(true);

        let index = 0;
        let components = new FormioComponentsComponent();
        components.components = settings.components;
        components.form = this.form;
        settings.components.forEach((comp: any) => {
            index++;
            let component = new FormioComponentComponent(this.events);
            component.component = comp;
            component.form = this.form;
            component.ngOnInit();
            component.form.controls[comp.key]['setValue']('Test' + index);
            component.form.controls[comp.key]['markAsDirty']();
        });
        expect(this.form.value).toEqual({name: 'Test1', textarea: 'Test2'});
    });

    it('Contains components or not', () => {
        let settings:PanelOptions = getSettings({});
        expect( settings.components.length).not.toBe(0);
    });

});
