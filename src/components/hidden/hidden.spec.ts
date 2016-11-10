/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { HiddenComponent, HiddenOptions } from './hidden';
import { FormioComponentComponent } from '../../formio-component.component';

describe('HiddenComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    // An easy method for getting new hidden settings.
    var getSettings = (overrides:{}):HiddenOptions => {
        let settings:HiddenOptions = {
            input: true,
            tableView: false,
            key: 'hidden',
            label: 'Hidden',
            protected: false,
            unique: true,
            persistent: true,
            type: 'hidden',
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
        let settings:HiddenOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for Hidden', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof HiddenComponent).toEqual(true);
    });

    it('Check for type is hidden or not', () => {
        let settings: HiddenOptions = getSettings({
            type: 'hidden'
        });

        // Create the hidden component.
        let hidden = new HiddenComponent(this.form, settings);
        expect(hidden.settings.type).toEqual('hidden');
    });

    it('Should allow label value', () => {
        let settings: HiddenOptions = getSettings({
            label: 'Hidden'
        });

        // Create the hidden component.
        let hidden = new HiddenComponent(this.form, settings);
        expect(hidden.settings.label).toEqual('Hidden');
    });

    it('Should allow unique property', () => {
        let settings: HiddenOptions = getSettings({
            unique: true
        });

        // Create the hidden component.
        let hidden = new HiddenComponent(this.form, settings);
        expect(hidden.settings.unique).toEqual(true);
    });

    it('Should allow key', () => {
        let settings: HiddenOptions = getSettings({
            key: 'hidden'
        });

        // Create the hidden component.
        let hidden = new HiddenComponent(this.form, settings);
        expect(hidden.settings.key).toEqual('hidden');
    });

});
