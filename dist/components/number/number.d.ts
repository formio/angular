import { BaseElement } from '../base';
import { InputComponent, InputOptions } from '../input/input';
import { FormioTemplate } from '../../formio.template';
import { FormGroup, FormControl } from '@angular/forms';
export declare function NumberValidator(component: NumberComponent): (control: FormControl) => any;
export declare class NumberComponent extends InputComponent<InputOptions> {
    constructor(form: FormGroup, settings: any, data?: any);
    getError(type: string, error: any): string;
    addValidators(): void;
}
export declare class NumberElement extends BaseElement<NumberComponent> {
}
export declare function NumberField(template: FormioTemplate): typeof NumberElement;
