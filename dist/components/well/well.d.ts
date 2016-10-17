import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
export interface WellOptions extends BaseOptions<any> {
    components?: Array<any>;
}
export declare class WellComponent extends BaseComponent<WellOptions> {
    getControl(): FormArray | FormGroup | FormControl;
}
export declare class WellElement extends BaseElement<WellComponent> {
    readonly numComponents: number;
}
export declare function WellField(template: FormioTemplate): typeof WellElement;
