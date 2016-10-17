import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
export interface FieldSetOptions extends BaseOptions<any> {
    components: Array<any>;
    legend?: string;
}
export declare class FieldSetComponent extends BaseComponent<FieldSetOptions> {
    getControl(): FormArray | FormGroup | FormControl;
}
export declare class FieldSetElement extends BaseElement<FieldSetComponent> {
    readonly numComponents: number;
}
export declare function FieldSetField(template: FormioTemplate): typeof FieldSetElement;
