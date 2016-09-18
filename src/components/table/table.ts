import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

export interface TableOptions extends BaseOptions<any> {
    numRows: number,
    numCols: number,
    caption: string,
    striped: boolean,
    bordered: boolean,
    hover: boolean,
    condensed: boolean,
    rows?: Array<any>,
    header: Array<any>,
    components?: Array<any>
}

export class TableComponent extends BaseComponent<TableOptions> {
    getControl(): FormArray | FormGroup | FormControl {
        if (!this.control) {
            this.control = new FormArray([
                new FormGroup({})
            ]);
        }
        return this.control;
    }
}

export class TableElement extends BaseElement<TableComponent> {
    get numComponents() : number {
        let total = 0;
        for (let i in this.component.settings.rows) {
            for (let j in this.component.settings.rows[i]) {
                total += this.component.settings.rows[i][j].components.length;
            }
        }
        return total;
    }
}

export function TableField(template:FormioTemplate) {
    FormioComponents.register('table', TableComponent, TableElement, template.components.table);
    return TableElement;
}
