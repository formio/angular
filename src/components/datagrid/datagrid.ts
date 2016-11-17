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

            // Add new controls for all rows in the data.
            if (
                this.data &&
                this.data.hasOwnProperty(this.settings.key) &&
                this.data[this.settings.key] &&
                this.data[this.settings.key].length > 1
            ) {
                for (var i = 1; i < this.data[this.settings.key].length; i++) {
                    this.control['push'](new FormGroup({}));
                }
            }
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

export class DataGridElement extends BaseElement<DataGridComponent> {
    get numComponents() : number {
        let total = this.component.control['controls'].length;
        total *= this.component.settings.components.length;
        return total;
    }
}
export function DataGrid(template:FormioTemplate) {
    FormioComponents.register('datagrid', DataGridComponent, DataGridElement, template.components.datagrid);
    return DataGridElement;
};
