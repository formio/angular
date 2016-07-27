import { describe, expect, it } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { FORMIO_TEMPLATE } from '../../templates/bootstrap';
import { NumberComponent, NumberOptions, Number } from './number';
import { FormioComponent } from '../../formio-component.component';

describe('NumberComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
    });

// Register the Number component.
    Number(FORMIO_TEMPLATE);

// An easy method for getting new Number settings.
    var getSettings = (overrides:{}):NumberOptions => {
        let settings : NumberOptions = {
            type: 'number',
            input: true,
            tableView: true,
            inputType: 5,
            inputMask: '',
            label: 'Number',
            key: 'number',
            placeholder: '',
            prefix: '',
            suffix: '',
            multiple: false,
            defaultValue: '',
            protected: false,
            unique: false,
            persistent: true,
            validate: {
                required: true,
                minLength: 0,
                maxLength: 0,
                custom: '',
                customPrivate: false
            },
            conditional: {
                show: '',
                when: null,
                eq: ''
            }
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponent<string> => {
        let settings:NumberOptions = getSettings(overrides);
        let component = new FormioComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Should allow default values', () => {
        let settings: NumberOptions = getSettings({
            defaultValue: 0
        });

        // Create the number component.
        let number = new NumberComponent(this.form, settings);
        expect(number.defaultValue).toEqual(0);
        expect(number.control.value).toEqual(0);
    });

    it('Should not allow invalid Number values.', () => {
        let settings: NumberOptions = getSettings({
            validate: {
                required: true,
                minLength: 2,
                maxLength: 10
            }
        });

        // Create the number component.
        let number = new NumberComponent(this.form, settings);

        let updateValue = (val: string) => {
            number.control['updateValue'](val);
            number.control['markAsDirty']();
        };

        updateValue("");
        expect(number.control.valid).toEqual(false);
        expect(number.control.errors).toEqual({required: true});
        expect(number.getError('required', number.control.errors['required'])).toEqual('Number is required');

        updateValue("1");
        expect(number.control.valid).toEqual(false);
        expect(number.control.errors).toEqual({minlength: {requiredLength: 2, actualLength: 1}});
        expect(number.getError('minlength', number.control.errors['minlength'])).toEqual('Number must be at least 2 characters');

        updateValue("12345678901");
        expect(number.control.valid).toEqual(false);
        expect(number.control.errors).toEqual({maxlength: {requiredLength: 10, actualLength: 11}});
        expect(number.getError('maxlength', number.control.errors['maxlength'])).toEqual('Number cannot be more than 10 characters');
      });

    it('Test FormioComponent for Number', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof NumberComponent).toEqual(true);
    });

    it('Should allow multiple number fields', () => {
        let component = getComponent({
            multiple: true
        });

        let updateValue = (index: number, val: string) => {
            component.form.controls['number']['at'](index)['updateValue'](val);
            component.form.controls['number']['at'](index)['markAsDirty']();
        };

        component.addComponent();

        // The label should be empty when there are more than one items.
        expect(component.components.length).toEqual(2);
        expect(component.components[0].label).toEqual('Number');
        expect(component.components[1].label).toEqual('');

        // Add another component.
        component.addComponent();
        expect(component.components.length).toEqual(3);
        expect(component.container.length).toEqual(3);
        updateValue(0, '123');
        updateValue(1, '456');
        updateValue(2, '789');
        expect(component.container.at(0).value).toEqual('123');
        expect(component.container.at(1).value).toEqual('456');
        expect(component.container.at(2).value).toEqual('789');
        expect(component.form.controls['number']['at'](0).value).toEqual('123');
        expect(component.form.controls['number']['at'](1).value).toEqual('456');
        expect(component.form.controls['number']['at'](2).value).toEqual('789');
        expect(component.form.value).toEqual({number: ['123', '456', '789']});
        component.removeAt(2);
        expect(component.container.at(0).value).toEqual('123');
        expect(component.container.at(1).value).toEqual('456');
        expect(component.form.controls['number']['at'](0).value).toEqual('123');
        expect(component.form.controls['number']['at'](1).value).toEqual('456');
        expect(component.form.value).toEqual({number: ['123', '456']});
    });

    it('Should not allow invalid Number values for the formio component.', () => {
        let component = getComponent({
            validate: {
                required: true,
                minLength: 2,
                maxLength: 10
            }
        });

        let updateValue = (val: string) => {
            component.form.controls['number']['updateValue'](val);
            component.form.controls['number']['markAsDirty']();
        };

        updateValue('1');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['Number must be at least 2 characters']);

        updateValue('');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['Number is required']);

        updateValue('12345678901');
        expect(component.form.valid).toEqual(false);
        expect(component.errors).toEqual(['Number cannot be more than 10 characters']);

    });

    //@TODO: Placeholder test case needs to be handled
    // it('Should allow placeholder', () => {
    //     let settings: NumberOptions = getSettings({
    //         placeholder: "Enter Number"
    //     });
    //
    //     // Create the number component.
    //     let number = new NumberComponent(this.form, settings);
    //     expect(number.placeholder).toEqual("Enter Number");
    //     expect(number.control.placeholder).toEqual("Enter Number");
    // });
    //@TODO: Prefix test case needs to be handled
    // it('Should allow prefix', () => {
    //     let settings: NumberOptions = getSettings({
    //         prefix: "$"
    //     });
    //
    //     // Create the number component.
    //     let number = new NumberComponent(this.form, settings);
    //     expect(number.prefix).toEqual("$");
    //     expect(number.control.prefix).toEqual("$");
    // });
    //
    //@TODO: Suffix test case needs to be handled
    // it('Should allow suffix', () => {
    //     let settings: NumberOptions = getSettings({
    //         suffix: "Pounds"
    //     });
    //
    //     // Create the number component.
    //     let number = new NumberComponent(this.form, settings);
    //     expect(number.suffix).toEqual("Pounds");
    //     expect(number.control.suffix).toEqual("Pounds");
    // });

});