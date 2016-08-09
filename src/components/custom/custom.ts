import { OnInit } from '@angular/core';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { BaseComponent, BaseElement } from '../base';
import { FormGroup } from '@angular/forms';

export interface CustomOptions {}
export class CustomComponent extends BaseComponent<CustomOptions> {
    constructor(form: FormGroup , settings:any) {
        super(form, settings);
    }
}

export class CustomElement extends BaseElement<CustomComponent> implements OnInit {
    ngOnInit() {
        this.render.emit(true);
    }
}

export function CustomField(template:FormioTemplate) {
    FormioComponents.register('custom', CustomComponent, CustomElement, {
        template: template.components.custom
    });
    return CustomElement;
};
