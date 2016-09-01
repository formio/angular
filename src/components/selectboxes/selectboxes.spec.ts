/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { SelectBoxComponent, SelectBoxOptions } from './selectboxes';
import { FORMIO_TEMPLATE } from '../../templates/bootstrap';
import { RegisterComponents } from '../index';
import { FormioComponentComponent } from '../../formio-component.component';
import {CustomComponent} from "../custom/custom";

describe('SelectBoxComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_TEMPLATE);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): SelectBoxOptions => {
        let settings: SelectBoxOptions = {

        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:SelectBoxOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for SelectBox as Custom component', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof CustomComponent).toEqual(true);
    });

    it('Its type should be selectboxes', () => {
        let settings: SelectBoxOptions = getSettings({
            type: "selectboxes"
        });

        // Create the selectbox component.
        let selectbox = new SelectBoxComponent(this.form, settings);
        expect(selectbox.settings.type).toEqual("selectboxes");
    });

    it('Should allow label value', () => {
        let settings: SelectBoxOptions = getSettings({
            label: "SelectBox"
        });

        // Create the selectbox component.
        let selectbox = new SelectBoxComponent(this.form, settings);
        expect(selectbox.settings.label).toEqual("SelectBox");
    });

});
