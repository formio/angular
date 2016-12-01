/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { SignatureComponent, SignatureOptions } from './signature';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { FormioComponentComponent } from '../../formio-component.component';

describe('SignatureComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): SignatureOptions => {
        let settings: SignatureOptions = {
            input: true,
            tableView: true,
            label: "Signature",
            key: "signature",
            placeholder: "Please Sign here...",
            footer: "Sign above",
            width: "50%",
            height: "200px",
            penColor: "green",
            backgroundColor: "rgb(245,245,235)",
            minWidth: "0.5",
            maxWidth: "2.5",
            protected: false,
            persistent: true,
            validate: {
                required: false
            },
            type: "signature",
            hideLabel: true,
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
        let settings:SignatureOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for Signature', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof SignatureComponent).toEqual(true);
    });

    it('Type should be Signature', () => {
        let settings: SignatureOptions = getSettings({
            type: "signature"
        });

        // Create the signature component.
        let signature = new SignatureComponent(this.form, settings);
        expect(signature.settings.type).toEqual("signature");
    });

    it('Should allow label value', () => {
        let settings: SignatureOptions = getSettings({
            label: 'Signature'
        });

        // Create the signature component.
        let signature = new SignatureComponent(this.form, settings);
        expect(signature.label).toEqual('Signature');
    });

    it('Should allow Signature component with required', () => {
        let settings: SignatureOptions = getSettings({
            required: false
        });

        // Create the signature component.
        let signature = new SignatureComponent(this.form, settings);
        expect(signature.settings.required).toEqual(false);
    });

    it('Should allow width', () => {
        let settings: SignatureOptions = getSettings({
            width: "100%"
        });

        // Create the signature component.
        let signature = new SignatureComponent(this.form, settings);
        expect(signature.settings.width).toEqual("100%");
    });

    it('Should allow height', () => {
        let settings: SignatureOptions = getSettings({
            height: "300px"
        });

        // Create the signature component.
        let signature = new SignatureComponent(this.form, settings);
        expect(signature.settings.height).toEqual("300px");
    });

    it('Should allow penColor', () => {
        let settings: SignatureOptions = getSettings({
            penColor: "green"
        });

        // Create the signature component.
        let signature = new SignatureComponent(this.form, settings);
        expect(signature.settings.penColor).toEqual("green");
    });

    it('Should allow backgroundColor', () => {
        let settings: SignatureOptions = getSettings({
            backgroundColor: "rgb(245,245,235)"
        });

        // Create the signature component.
        let signature = new SignatureComponent(this.form, settings);
        expect(signature.settings.backgroundColor).toEqual("rgb(245,245,235)");
    });

    it('Should allow minWidth and maxWidth', () => {
        let settings: SignatureOptions = getSettings({
            minWidth: "0.5",
            maxWidth: "2.5"
        });

        // Create the signature component.
        let signature = new SignatureComponent(this.form, settings);
        expect(signature.settings.minWidth).toEqual("0.5");
        expect(signature.settings.maxWidth).toEqual("2.5");
    });
});
