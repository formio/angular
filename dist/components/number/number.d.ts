import { BaseElement } from '../base';
import { InputComponent, InputOptions } from '../input/input';
import { FormioTemplate } from '../../formio.template';
import { FormGroup } from '@angular/forms';
export declare class NumberComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings: any, data?: any);
}
export declare class NumberElement extends BaseElement<NumberComponent> {
}
export declare function NumberField(template: FormioTemplate): typeof NumberElement;
