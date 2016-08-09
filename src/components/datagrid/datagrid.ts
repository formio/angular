import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface DataGridOptions extends BaseOptions<{}> {
    components: Array<any>
}

export class DataGridComponent extends BaseComponent<DataGridOptions> {
    getControl(): FormArray | FormGroup | FormControl {
        if (!this.control) {
            this.control = new FormArray([
                new FormGroup({})
            ]);
        }
        return this.control;
    }
    addAnother() {
        this.control['push'](new FormGroup({}));
    }
    removeAt(index: number) {
        this.control['removeAt'](index);
    }
}

export class DataGridElement extends BaseElement<DataGridComponent> {}
export function DataGrid(template:FormioTemplate) {
    FormioComponents.register('datagrid', DataGridComponent, DataGridElement, {
        template: template.components.datagrid
    });
    return DataGridElement;
};