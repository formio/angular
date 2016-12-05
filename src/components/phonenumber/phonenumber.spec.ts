/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FormioComponentComponent } from '../../formio-component.component';
import { PhoneNumberComponent, PhoneNumberOptions } from './phonenumber';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';

describe('PhoneNumberComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): PhoneNumberOptions => {
        let settings: PhoneNumberOptions = {
            input: true,
            tableView: true,
            inputMask: "(999) 999-9999",
            label: "Phone Number",
            key: "phoneNumber",
            placeholder: "Enter Phone Number",
            prefix: "",
            suffix: "",
            multiple: false,
            protected: false,
            unique: false,
            persistent: true,
            defaultValue: "",
            validate: {
                required: false
            },
            type: "phoneNumber",
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            customClass: "myclass"
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:PhoneNumberOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for PhoneNumber', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof PhoneNumberComponent).toEqual(true);
    });

    it('Type should be PhoneNumber', () => {
        let settings: PhoneNumberOptions = getSettings({
            type: "phoneNumber"
        });

        // Create the phone component.
        let phone = new PhoneNumberComponent(this.form, settings);
        expect(phone.settings.type).toEqual("phoneNumber");
    });

    it('Should allow label', () => {
        let settings: PhoneNumberOptions = getSettings({
            label: "Phone Number"
        });

        // Create the phone component.
        let phone = new PhoneNumberComponent(this.form, settings);
        expect(phone.settings.label).toEqual("Phone Number");
    });

    it('Should allow placeholder', () => {
        let settings: PhoneNumberOptions = getSettings({
            placeholder: "Enter Phone Number"
        });

        // Create the phone component.
        let phone = new PhoneNumberComponent(this.form, settings);
        expect(phone.settings.placeholder).toEqual("Enter Phone Number");
    });

    it('Should allow inputMask', () => {
        let settings: PhoneNumberOptions = getSettings({
            inputMask: "(999) 999-9999"
        });

        // Create the phone component.
        let phone = new PhoneNumberComponent(this.form, settings);
        expect(phone.settings.inputMask).toEqual("(999) 999-9999");
    });

    it('Should allow customClass', () => {
        let settings: PhoneNumberOptions = getSettings({
            customClass: "myclass"
        });

        // Create the phone component.
        let phone = new PhoneNumberComponent(this.form, settings);
        expect(phone.settings.customClass).toEqual("myclass");
    });

    it('Should allow prefix', () => {
        let settings: PhoneNumberOptions = getSettings({
            prefix: "$"
        });

        // Create the phone component.
        let phone = new PhoneNumberComponent(this.form, settings);
        expect(phone.settings.prefix).toEqual("$");
    });

    it('Should allow suffix', () => {
        let settings: PhoneNumberOptions = getSettings({
            suffix: "@"
        });

        // Create the phone component.
        let phone = new PhoneNumberComponent(this.form, settings);
        expect(phone.settings.suffix).toEqual("@");
    });

    it('Should allow multiple phone number fields', () => {
        let component = getComponent({
            multiple: true
        });

        let updateValue = (index: number, val: string) => {
            component.form.controls['phoneNumber']['at'](index)['updateValue'](val);
            component.form.controls['phoneNumber']['at'](index)['markAsDirty']();
        };

        component.addComponent();

        // The label should be empty when there are more than one items.
        expect(component.components.length).toEqual(2);
        expect(component.components[0].label).toEqual('Phone Number');
        expect(component.components[1].label).toEqual('');

        // Add another component.
        component.addComponent();
        expect(component.components.length).toEqual(3);
        expect(component.container.length).toEqual(3);
        updateValue(0, '1234567890');
        updateValue(1, '9999999999');
        updateValue(2, '8989898989');
        expect(component.container.at(0).value).toEqual('1234567890');
        expect(component.container.at(1).value).toEqual('9999999999');
        expect(component.container.at(2).value).toEqual('8989898989');
        expect(component.form.controls['phoneNumber']['at'](0).value).toEqual('1234567890');
        expect(component.form.controls['phoneNumber']['at'](1).value).toEqual('9999999999');
        expect(component.form.controls['phoneNumber']['at'](2).value).toEqual('8989898989');
        expect(component.form.value).toEqual({phoneNumber: ['1234567890', '9999999999', '8989898989']});
        component.removeAt(1);
        expect(component.container.at(0).value).toEqual('1234567890');
        expect(component.container.at(1).value).toEqual('8989898989');
        expect(component.form.controls['phoneNumber']['at'](0).value).toEqual('1234567890');
        expect(component.form.controls['phoneNumber']['at'](1).value).toEqual('8989898989');
        expect(component.form.value).toEqual({phoneNumber: ['1234567890', '8989898989']});
    });
});
