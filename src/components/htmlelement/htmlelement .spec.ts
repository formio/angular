/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup, FormControl } from '@angular/forms';
import { FORMIO_TEMPLATE } from '../../templates/bootstrap';
import { RegisterComponents } from '../index';
import { FormioComponentComponent } from '../../formio-component.component';
import {HtmlElementOptions, HtmlElementComponent} from './htmlelement';

describe('HtmlElementComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_TEMPLATE);
        this.form = new FormGroup({});
    });

    // An easy method for getting new HtmlElement settings.
    var getSettings = (overrides: {}): HtmlElementOptions => {
        let settings: HtmlElementOptions = {
            input: false,
            tag: "p",
            attrs: [
                {
                    attr: "src",
                    value: "/img"
                }
            ],
            className: "customClass",
            content: "Hello, Good Morning !!!",
            type: "htmlelement",
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
        let settings:HtmlElementOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for HtmlElement', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof HtmlElementComponent).toEqual(true);
    });

    it('Type should be htmlelement', () => {
        let settings: HtmlElementOptions = getSettings({
            type: 'htmlelement'
        });

        // Create the htmlelement component.
        let htmlelement = new HtmlElementComponent(this.form, settings);
        expect(htmlelement.settings.type).toEqual('htmlelement');
    });

    it('Should allow className', () => {
        let settings: HtmlElementOptions = getSettings({
            className: 'customClass'
        });

        // Create the htmlelement component.
        let htmlelement = new HtmlElementComponent(this.form, settings);
        expect(htmlelement.settings.className).toEqual('customClass');
    });

    it('Should allow tag', () => {
        let settings: HtmlElementOptions = getSettings({
            tag: 'p'
        });

        // Create the htmlelement component.
        let htmlelement = new HtmlElementComponent(this.form, settings);
        expect(htmlelement.settings.tag).toEqual('p');
    });

    it('Should allow content', () => {
        let settings: HtmlElementOptions = getSettings({
            content: 'Hello, Good Morning !!!'
        });

        // Create the htmlelement component.
        let htmlelement = new HtmlElementComponent(this.form, settings);
        expect(htmlelement.settings.content).toEqual('Hello, Good Morning !!!');
    });

    it('Should have attributes', () => {
        let component = getComponent({});
        expect(component.components[0].settings.attrs.length).not.toBe(0);
    });
});
