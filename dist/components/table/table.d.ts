import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
export interface TableOptions extends BaseOptions<any> {
    numRows: number;
    numCols: number;
    caption: string;
    striped: boolean;
    bordered: boolean;
    hover: boolean;
    condensed: boolean;
    rows?: Array<any>;
    header: Array<any>;
    components?: Array<any>;
}
export declare class TableComponent extends BaseComponent<TableOptions> {
    getControl(): FormArray | FormGroup | FormControl;
}
export declare class TableElement extends BaseElement<TableComponent> {
    readonly numComponents: number;
}
export declare function TableField(template: FormioTemplate): typeof TableElement;
