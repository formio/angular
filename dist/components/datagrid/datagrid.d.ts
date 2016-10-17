import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface DataGridOptions extends BaseOptions<{}> {
    components: Array<any>;
}
export declare class DataGridComponent extends BaseComponent<DataGridOptions> {
    getControl(): FormArray | FormGroup | FormControl;
    addAnother(): void;
    removeAt(index: number): void;
}
export declare class DataGridElement extends BaseElement<DataGridComponent> {
    readonly numComponents: number;
}
export declare function DataGrid(template: FormioTemplate): typeof DataGridElement;
