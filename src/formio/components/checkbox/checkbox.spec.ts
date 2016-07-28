import { describe, expect, it } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { FORMIO_TEMPLATE } from '../../templates/bootstrap';
import { CheckBoxComponent, CheckBoxOptions, CheckBox } from './checkbox';
import { FormioComponent } from '../../formio-component.component';

describe('CheckBoxComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
    });

    // Register the CheckBox component.
    CheckBox(FORMIO_TEMPLATE);

    // An easy method for getting new checkbox settings.
    var getSettings = (overrides:{}):CheckBoxOptions => {
        let settings:CheckBoxOptions = {
            input: true,
            inputType: 'checkbox',
            tableView: false,
            hideLabel: true,
            label: 'Checkbox',
            key: 'checkbox',
            defaultValue: false,
            protected: false,
            persistent: true,
            validate: {
                required: true
            },
            type: 'checkbox',
            conditional: {
                show: null,
                when: null,
                eq: ""
            }
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides:{}):FormioComponent<string> => {
        let settings:CheckBoxOptions = getSettings(overrides);
        let component = new FormioComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for CheckBox', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof CheckBoxComponent).toEqual(true);
    });

    it('Should allow default value', () => {
        let settings: CheckBoxOptions = getSettings({
            defaultValue: false
        });

        // Create the checkbox component.
        let checkbox = new CheckBoxComponent(this.form, settings);
        expect(checkbox.defaultValue).toEqual(false);
        expect(checkbox.control.value).toEqual(false);
    });

    it('Should allow label value', () => {
        let settings: CheckBoxOptions = getSettings({
            label: 'CheckBox'
        });

        // Create the checkbox component.
        let checkbox = new CheckBoxComponent(this.form, settings);
        expect(checkbox.label).toEqual('CheckBox');
    });

    it('Should allow check box with required', () => {
        let settings: CheckBoxOptions = getSettings({
            required: true
        });

        // Create the checkbox component.
        let checkbox = new CheckBoxComponent(this.form, settings);
        expect(checkbox.settings.required).toEqual(true);
    });

});