import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { BaseElement } from '../base';
import { InputComponent, InputOptions } from '../input/input';
import { FormGroup } from '@angular/forms';

export class TextFieldComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings:any) {
        super('text', form, settings);
    }
}

export class TextElement extends BaseElement<TextFieldComponent> {}
export function TextField(template:FormioTemplate) {
    FormioComponents.register('textfield', TextFieldComponent, TextElement, {
        template: template.components.input
    });
    return TextElement;
};
