import { BaseComponent, BaseOptions, BaseElement } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface ColumnsOptions extends BaseOptions<any> {
    columns: Array<any>
}

export class ColumnsComponent extends BaseComponent<ColumnsOptions> {}
export class ColumnsElement extends BaseElement<ColumnsComponent> {
    get numComponents() : number {
        return this.component.settings.columns.length;
    }
}
export function ColumnsField(template:FormioTemplate) {
    FormioComponents.register('columns', ColumnsComponent, ColumnsElement, template.components.columns);
    return ColumnsElement;
};