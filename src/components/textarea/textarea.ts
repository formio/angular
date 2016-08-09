import { Input } from '@angular/core';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { InputComponent, InputOptions, InputElement } from '../input/input';
import { FormGroup } from '@angular/forms';

export interface TextAreaOptions extends InputOptions {
    rows?:number
}

export class TextAreaComponent extends InputComponent<TextAreaOptions> {
    constructor(form: FormGroup, settings:any) {
        super('textarea', form, settings);
    }
}

export class TextAreaElement extends InputElement<TextAreaComponent> {}
export function TextAreaField(template:FormioTemplate) {
    FormioComponents.register('textarea', TextAreaComponent, TextAreaElement, {
        template: template.components.textarea
    });
    return TextAreaElement;
};
