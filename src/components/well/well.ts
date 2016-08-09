import { Input, OnInit } from '@angular/core';
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

export interface WellOptions extends BaseOptions<any> {
    components?: Array<any>
}

export class WellComponent extends BaseComponent<WellOptions> {
    getControl(): FormArray | FormGroup | FormControl {
        if (!this.control) {
            this.control = new FormArray([
                new FormGroup({})
            ]);
        }
        return this.control;
    }
}

export class WellElement extends BaseElement<WellComponent> implements OnInit {
    @Input() component: WellComponent;
    ngOnInit() {
        this.render.emit(true);
    }
}

export function Well(template:FormioTemplate) {
    FormioComponents.register('well', WellComponent, WellElement, {
        template: template.components.well
    });
    return WellElement;
};
