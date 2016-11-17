import { FormioTemplate } from '../../formio.template';
import { BaseElement } from '../base';
import { InputComponent, InputOptions } from '../input/input';
import { FormGroup } from '@angular/forms';
export declare class TextFieldComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings: any, data?: any);
}
export declare class TextElement extends BaseElement<TextFieldComponent> {
}
export declare function TextField(template: FormioTemplate): typeof TextElement;
