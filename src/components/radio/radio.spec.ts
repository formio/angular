/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { RadioComponent, RadioOptions } from './radio';
import { FormioComponentComponent } from '../../formio-component.component';

describe('RadioComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
        RegisterComponents(FORMIO_BOOTSTRAP);
    });

    // An easy method for getting new Radio settings.
    var getSettings = (overrides:{}):RadioOptions => {
        let settings: RadioOptions = {
            input: true,
            tableView: true,
            label: "Options",
            key: "radio",
            values: [
                {
                    value: "1",
                    label: "option1"
                },
                {
                    value: "2",
                    label: "option2"
                }
            ],
            defaultValue: '',
            protected: false,
            persistent: true,
            validate: {
                required: false,
                custom: "",
                customPrivate: false
            },
            type: "radio",
            inline: true,
            multiple: false,
            conditional: {
                show: null,
                when: null,
                eq: ""
            }
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides:{}):FormioComponentComponent<string> => {
        let settings:RadioOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for Radio', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof RadioComponent).toEqual(true);
    });

    it('Should allow label value', () => {
        let settings: RadioOptions = getSettings({
            label: 'Options'
        });

        // Create the radio component.
        let radio = new RadioComponent(this.form, settings);
        expect(radio.label).toEqual('Options');
    });

    it('Should allow Radio component with required', () => {
        let settings: RadioOptions = getSettings({
            required: true
        });

        // Create the radio component.
        let radio = new RadioComponent(this.form, settings);
        expect(radio.settings.required).toEqual(true);
    });

    it('Check radio option values are available or not',() => {
       let settings: RadioOptions = getSettings({
           values: [
               {
                   value: "1",
                   label: "option1"
               },
               {
                   value: "2",
                   label: "option2"
               }
           ]
       });

        // Create the radio component.
        let radio = new RadioComponent(this.form, settings);
        expect(radio.settings.values.length).not.toEqual(0);
    });

    it('Check radio options contains labels or not',() => {
        let settings: RadioOptions = getSettings({
            values: [
                {
                    value: "1",
                    label: "option1"
                }
            ]
        });

        // Create the radio component.
        let radio = new RadioComponent(this.form, settings);
        expect(radio.settings.values[0].label).not.toEqual('');
    });
    
    it('Check radio options appears in inline or not',() => {
        let settings: RadioOptions = getSettings({
            inline : true
        });

        // Create the radio component.
        let radio = new RadioComponent(this.form, settings);
        expect(radio.settings.inline).toEqual(true);
    });


});
