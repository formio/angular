/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { CheckBoxComponent, CheckBoxOptions } from './checkbox';
import { FormioComponentComponent } from '../../formio-component.component';
import { CHECKBOX } from '../../fixtures/fields/checkbox';

describe('CheckBoxComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    // An easy method for getting new checkbox settings.
    var getSettings = (overrides:{}):CheckBoxOptions => {
        let settings:CheckBoxOptions = CHECKBOX('checkbox', 'Checkbox');
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides:{}):FormioComponentComponent<boolean> => {
        let settings:CheckBoxOptions = getSettings(overrides);
        let component = new FormioComponentComponent<boolean>();
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
