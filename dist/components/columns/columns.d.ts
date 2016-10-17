import { BaseComponent, BaseOptions, BaseElement } from '../base';
import { FormioTemplate } from '../../formio.template';
export interface ColumnsOptions extends BaseOptions<any> {
    columns: Array<any>;
}
export declare class ColumnsComponent extends BaseComponent<ColumnsOptions> {
}
export declare class ColumnsElement extends BaseElement<ColumnsComponent> {
    readonly numComponents: number;
}
export declare function ColumnsField(template: FormioTemplate): typeof ColumnsElement;
