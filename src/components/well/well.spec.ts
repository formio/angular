/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { WellComponent, WellOptions } from './well';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { FormioComponentsComponent } from '../../formio-components.component';
import { FormioComponentComponent } from '../../formio-component.component';
import { INPUT } from '../../fixtures/fields/input';
import { TEXTAREA } from '../../fixtures/fields/textarea';

describe('WellComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): WellOptions => {
        let settings: WellOptions = {
            input: false,
            type: "well",
            key: "Well",
            lockKey: true,
            components: [
                INPUT('textfield', 'text', 'text', 'Test1'),
                TEXTAREA('textarea', 'Textarea')
            ],
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
        let settings:WellOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for Well', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof WellComponent).toEqual(true);
    });

    it('type should be well', () => {
        let settings: WellOptions = getSettings({
            type: "well"
        });

        // Create the well component.
        let well = new WellComponent(this.form, settings);
        expect(well.settings.type).toEqual("well");
    });

    it('Should create Well control.', () => {
        let settings: WellOptions = getSettings({});
        let fieldset = new WellComponent(this.form, settings);
        expect(fieldset.control instanceof FormGroup).toEqual(true);

        let index = 0;
        let components = new FormioComponentsComponent();
        components.components = settings.components;
        components.form = this.form;
        settings.components.forEach((comp: any) => {
            index++;
            let component = new FormioComponentComponent();
            component.component = comp;
            component.form = this.form;
            component.ngOnInit();
            component.form.controls[comp.key]['setValue']('Test' + index);
            component.form.controls[comp.key]['markAsDirty']();
        });
        expect(this.form.value).toEqual({text: 'Test1', textarea: 'Test2'});
    });

    it('Should contain components', () => {
        let settings:WellOptions = getSettings({});
        expect( settings.components.length).not.toBe(0);
    });

});
