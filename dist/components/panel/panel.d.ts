import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
export interface PanelOptions extends BaseOptions<any> {
    title?: string;
    theme?: string;
    components: Array<any>;
}
export declare class PanelComponent extends BaseComponent<PanelOptions> {
    getControl(): FormArray | FormGroup | FormControl;
}
export declare class PanelElement extends BaseElement<PanelComponent> {
    readonly numComponents: number;
}
export declare function PanelField(template: FormioTemplate): typeof PanelElement;
