import { FormGroup } from '@angular/forms';
import { FormioComponentComponent } from '../../formio-component.component';
import { SelectComponent, SelectOptions } from './select';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';

describe('SelectComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): SelectOptions => {
        let settings: SelectOptions = {
            input: true,
            tableView: true,
            label: "Fruits",
            key: "fruits",
            placeholder: "Select favourite",
            data: {
                values: [
                    {
                        value: "mango",
                        label: "mango"
                    },
                    {
                        value: "apple",
                        label: "apple"
                    },
                    {
                        value: "pineapple",
                        label: "pineapple"
                    },
                    {
                        value: "grapes",
                        label: "grapes"
                    }],
                json: [
                    {
                        label: "one",
                        test: "opt1"
                    },
                    {
                        label: "two",
                        test: "opt2"
                    },
                    {
                        label: "three",
                        test: "opt3"
                    }],
                url: "https://api.github.com/users/hadley/orgs",
                resource: "manager"
            },
            dataSrc: "values",
            valueProperty: "label",
            defaultValue: "",
            refreshOn: "",
            filter: "",
            authenticate: false,
            searchField: "data.fullName",
            template: "<span>{{ item.label }}</span>",
            multiple: false,
            protected: false,
            unique: false,
            persistent: true,
            validate: {
                required: false
            },
            type: "select",
            conditional: {
                show: null,
                when: null,
                eq: ""
            }
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:SelectOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };
    it('Test FormioComponent for Select', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof SelectComponent).toEqual(true);
    });

    it('Type should be Select', () => {
        let settings: SelectOptions = getSettings({
            type: "select"
        });

        // Create the select component.
        let select = new SelectComponent(this.form, settings);
        expect(select.settings.type).toEqual("select");
    });

    it('Should allow label', () => {
        let settings: SelectOptions = getSettings({
            label: "Fruits"
        });

        // Create the select component.
        let select = new SelectComponent(this.form, settings);
        expect(select.settings.label).toEqual("Fruits");
    });

    it('Should allow placeholder', () => {
        let settings: SelectOptions = getSettings({
            placeholder: "Select one fruit"
        });

        // Create the select component.
        let select = new SelectComponent(this.form, settings);
        expect(select.settings.placeholder).toEqual("Select one fruit");
    });

    it('Should allow valueProperty', () => {
        let settings: SelectOptions = getSettings({
            valueProperty: "fullName"
        });

        // Create the select component.
        let select = new SelectComponent(this.form, settings);
        expect(select.settings.valueProperty).toEqual("fullName");
    });

    it('Should allow template', () => {
        let settings: SelectOptions = getSettings({
            template: "{{ item.label }}"
        });

        // Create the select component.
        let select = new SelectComponent(this.form, settings);
        expect(select.settings.template).toEqual("{{ item.label }}");
    });

    it('Should set the data according to dataSrc', () => {
        let component = getComponent({});
        if(component.components[0].settings.dataSrc=='values'){
            expect(component.components[0].settings.data.values.length).not.toBe(0);
        }
        if(component.components[0].settings.dataSrc=='json'){
            expect(component.components[0].settings.data.json.length).not.toBe(0);
        }
        if(component.components[0].settings.dataSrc=='resource'){
            expect(component.components[0].settings.data.resource).not.toBe(null);
        }
        if(component.components[0].settings.dataSrc=='url'){
            expect(component.components[0].settings.data.url).not.toBe(null);
        }
    });

    it('Should contain data according to template', () => {
        let component = getComponent({});
        let template = component.components[0].settings.template.split('.')[1].split(' ')[0];
        if(component.components[0].settings.dataSrc=='values'){
            expect(Object.keys(component.components[0].settings.data.values[0])).toContain('label');
        }
        if(component.components[0].settings.dataSrc=='json'){
            expect(Object.keys(component.components[0].settings.data.json[0])).toContain(template);
        }
    });

    it('Should contain data according to valueProperty', () => {
        let component = getComponent({});
        if(component.components[0].settings.dataSrc=='values'){
            expect(Object.keys(component.components[0].settings.data.values[0])).toContain('value');
        }
        if(component.components[0].settings.dataSrc=='json'){
            expect(Object.keys(component.components[0].settings.data.json[0])).toContain(component.components[0].settings.valueProperty);
        }
    });

});
