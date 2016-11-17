import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { BaseElement } from '../base';
import { InputComponent, InputOptions } from '../input/input';
import { FormGroup } from '@angular/forms';

export class TextFieldComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings:any, data?:any) {
        super('text', form, settings, data);
    }
}

export class TextElement extends BaseElement<TextFieldComponent> {}
export function TextField(template:FormioTemplate) {
    FormioComponents.register('textfield', TextFieldComponent, TextElement, template.components.input);
    return TextElement;
};
