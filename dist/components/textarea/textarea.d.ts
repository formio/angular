import { FormioTemplate } from '../../formio.template';
import { BaseElement } from '../base';
import { InputComponent, InputOptions } from '../input/input';
import { FormGroup } from '@angular/forms';
export interface TextAreaOptions extends InputOptions {
    rows?: number;
}
export declare class TextAreaComponent extends InputComponent<TextAreaOptions> {
    constructor(form: FormGroup, settings: any, data?: any);
}
export declare class TextAreaElement extends BaseElement<TextAreaComponent> {
}
export declare function TextAreaField(template: FormioTemplate): typeof TextAreaElement;
