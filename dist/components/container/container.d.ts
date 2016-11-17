import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface ContainerOptions extends BaseOptions<{}> {
    tree?: boolean;
    components: Array<any>;
}
export declare class ContainerComponent extends BaseComponent<ContainerOptions> {
    getControl(): FormArray | FormGroup | FormControl;
    getData(): any;
}
export declare class ContainerElement extends BaseElement<ContainerComponent> {
    readonly numComponents: number;
}
export declare function ContainerField(template: FormioTemplate): typeof ContainerElement;
