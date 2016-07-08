import { OnInit, Injectable } from '@angular/core';
import { BaseComponent, BaseOptions, ComponentsOptions } from './base';
import { FormioComponents } from './components';
import { FormioTemplate } from '../formio';

export interface ColumnsOptions extends BaseOptions<any> {
    columns: Array<ComponentsOptions>
}

@Injectable()
class _Columns extends BaseComponent<ColumnsOptions> {
    constructor() {
        super();
    }
}

export function Columns(template:FormioTemplate) {
    FormioComponents.register('columns', _Columns, {
        selector: 'formio-columns',
        template: template.components.columns
    });
    return _Columns;
};