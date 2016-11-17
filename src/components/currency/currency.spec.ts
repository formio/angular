import { FormGroup } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { InputOptions } from '../input/input';
import { CurrencyComponent } from './currency';
import { FormioComponentComponent } from '../../formio-component.component';

describe('CurrencyComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    // An easy method for getting new Currency settings.
    var getSettings = (overrides:{}):InputOptions => {
        let settings : InputOptions = {
            input: true,
            tableView: true,
            inputType: "text",
            inputMask: "",
            label: "Currency",
            key: "currency",
            placeholder: "currency",
            prefix: "$",
            suffix: "@",
            multiple: true,
            defaultValue: "",
            protected: false,
            persistent: true,
            validate: {
                required: false
            },
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            type: "currency"
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:InputOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Should allow label value', () => {
        let settings: InputOptions = getSettings({
            label: 'Currency'
        });

        // Create the currency component.
        let currency = new CurrencyComponent(this.form, settings);
        expect(currency.label).toEqual('Currency');
    });

    it('Should allow default values', () => {
        let settings: InputOptions = getSettings({
            defaultValue: 123
        });

        // Create the Currency component.
        let currency = new CurrencyComponent(this.form, settings);
        expect(currency.defaultValue).toEqual(123);
    });

    it('Test FormioComponent for Currency', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof CurrencyComponent).toEqual(true);
    });

    it('Should allow placeholder', () => {
        let settings: InputOptions = getSettings({
            placeholder: "currency"
        });

        // Create the Currency component.
        let currency = new CurrencyComponent(this.form, settings);
        expect(currency.settings.placeholder).toEqual("currency");
    });

    it('Should allow prefix', () => {
        let settings: InputOptions = getSettings({
            prefix: "$"
        });

        // Create the Currency component.
        let currency = new CurrencyComponent(this.form, settings);
        expect(currency.settings.prefix).toEqual("$");
    });

    it('Should allow suffix', () => {
        let settings: InputOptions = getSettings({
            suffix: "@"
        });

        // Create the Currency component.
        let currency = new CurrencyComponent(this.form, settings);
        expect(currency.settings.suffix).toEqual("@");
    });

    it('Should allow multiple currency fields', () => {
        let component = getComponent({
            multiple: true
        });

        let updateValue = (index: number, val: string) => {
            component.form.controls['currency']['at'](index)['setValue'](val);
            component.form.controls['currency']['at'](index)['markAsDirty']();
        };

        component.addComponent();

        // The label should be empty when there are more than one items.
        expect(component.components.length).toEqual(2);
        expect(component.components[0].label).toEqual('Currency');
        expect(component.components[1].label).toEqual('');

        // Add another component.
        component.addComponent();
        expect(component.components.length).toEqual(3);
        expect(component.container.length).toEqual(3);
        updateValue(0, '1,234');
        updateValue(1, '2,345');
        updateValue(2, '52,000');
        expect(component.container.at(0).value).toEqual('1,234');
        expect(component.container.at(1).value).toEqual('2,345');
        expect(component.container.at(2).value).toEqual('52,000');
        expect(component.form.controls['currency']['at'](0).value).toEqual('1,234');
        expect(component.form.controls['currency']['at'](1).value).toEqual('2,345');
        expect(component.form.controls['currency']['at'](2).value).toEqual('52,000');
        expect(component.form.value).toEqual({currency: ['1,234', '2,345', '52,000']});
        component.removeAt(1);
        expect(component.container.at(0).value).toEqual('1,234');
        expect(component.container.at(1).value).toEqual('52,000');
        expect(component.form.controls['currency']['at'](0).value).toEqual('1,234');
        expect(component.form.controls['currency']['at'](1).value).toEqual('52,000');
        expect(component.form.value).toEqual({currency: ['1,234', '52,000']});
    });
});
