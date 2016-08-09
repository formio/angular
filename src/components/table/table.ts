import { Input, OnInit } from '@angular/core';
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

export interface TableOptions extends BaseOptions<any> {
    numRows: number,
    numCols: number,
    rows?: Array<any>,
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

export class TableElement extends BaseElement<TableComponent> implements OnInit {
    @Input() component: TableComponent;
    ngOnInit() {
        this.render.emit(true);
    }
}

export function Table(template:FormioTemplate) {
    FormioComponents.register('table', TableComponent, TableElement, {
        template: template.components.table
    });
    return TableElement;
};
