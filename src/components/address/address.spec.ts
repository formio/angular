import { FormGroup } from '@angular/forms';
import { FormioComponentComponent } from '../../formio-component.component';
import { AddressComponent, AddressOptions } from './address';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';

describe('AddressComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): AddressOptions => {
        let settings: AddressOptions = {
            input: true,
            tableView: true,
            label: "Address",
            key: "address",
            placeholder: "Enter Address",
            multiple: false,
            protected: false,
            unique: false,
            persistent: true,
            validate: {
                required: true
            },
            type: "address",
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
        let settings:AddressOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };
    it('Test FormioComponent for Address', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof AddressComponent).toEqual(true);
    });

    it('Type should be Address', () => {
        let settings: AddressOptions = getSettings({
            type: "address"
        });

        // Create the address component.
        let address = new AddressComponent(this.form, settings);
        expect(address.settings.type).toEqual("address");
    });

    it('Should allow label', () => {
        let settings: AddressOptions = getSettings({
            label: "Address"
        });

        // Create the address component.
        let address = new AddressComponent(this.form, settings);
        expect(address.settings.label).toEqual("Address");
    });

    it('Should allow placeholder', () => {
        let settings: AddressOptions = getSettings({
            placeholder: "Enter address"
        });

        // Create the address component.
        let address = new AddressComponent(this.form, settings);
        expect(address.settings.placeholder).toEqual("Enter address");
    });

    it('Should allow customClass', () => {
        let settings: AddressOptions = getSettings({
            customClass: "myclass"
        });

        // Create the address component.
        let address = new AddressComponent(this.form, settings);
        expect(address.settings.customClass).toEqual("myclass");
    });
});
