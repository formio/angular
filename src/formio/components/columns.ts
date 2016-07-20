import { Input } from '@angular/core';
import { BaseComponent, BaseOptions, BaseElement, ComponentsOptions } from './base';
import { FormioComponents } from './components';
import { FormioTemplate } from '../formio';

export interface ColumnsOptions extends BaseOptions<any> {
    columns: Array<ComponentsOptions>
}

export class ColumnsComponent extends BaseComponent<ColumnsOptions> {}
export class ColumnsElement extends BaseElement {
    @Input() component: ColumnsComponent;
}
export function Columns(template:FormioTemplate) {
    FormioComponents.register('columns', ColumnsComponent, ColumnsElement, {
        template: template.components.columns
    });
    return ColumnsElement;
};