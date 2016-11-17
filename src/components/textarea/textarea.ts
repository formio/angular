import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { BaseElement } from '../base';
import { InputComponent, InputOptions } from '../input/input';
import { FormGroup } from '@angular/forms';

export interface TextAreaOptions extends InputOptions {
    rows?:number
}

export class TextAreaComponent extends InputComponent<TextAreaOptions> {
    constructor(form: FormGroup, settings:any, data?: any) {
        super('textarea', form, settings, data);
    }
}

export class TextAreaElement extends BaseElement<TextAreaComponent> {}
export function TextAreaField(template:FormioTemplate) {
    FormioComponents.register('textarea', TextAreaComponent, TextAreaElement, template.components.textarea);
    return TextAreaElement;
};
