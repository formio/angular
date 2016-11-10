/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { ContentComponent, ContentOptions } from './content';
import { FormioComponentComponent } from '../../formio-component.component';

describe('ContentComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    // An easy method for getting new content settings.
    var getSettings = (overrides:{}):ContentOptions => {
        let settings:ContentOptions = {
            input: false,
            html: "<p><em><strong>Good Morning Guys!!!<br>This is Content component.</strong></em></p> ",
            type: "content",
            conditional: {
                show: null,
                when: null,
                eq: ""
            },
            key: "mycontent",
            lockKey: true
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides:{}):FormioComponentComponent<string> => {
        let settings:ContentOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for Content', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof ContentComponent).toEqual(true);
    });

    it('Check for type is Content or not', () => {
        let settings: ContentOptions = getSettings({
            type: 'content'
        });

        // Create the content component.
        let content = new ContentComponent(this.form, settings);
        expect(content.settings.type).toEqual('content');
    });

    it('Should allow key', () => {
        let settings: ContentOptions = getSettings({
            key: 'mycontent'
        });

        // Create the content component.
        let content = new ContentComponent(this.form, settings);
        expect(content.settings.key).toEqual('mycontent');
    });

    it('Should allow html', () => {
        let settings: ContentOptions = getSettings({
            html: "<p><em><strong>Good Morning Guys!!!</strong></em></p>"
        });

        // Create the content component.
        let content = new ContentComponent(this.form, settings);
        expect(content.settings.html).toEqual('<p><em><strong>Good Morning Guys!!!</strong></em></p>');
    });

});
