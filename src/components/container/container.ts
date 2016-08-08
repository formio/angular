import { Input } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface ContainerOptions extends BaseOptions<{}> {
    tree?: boolean;
    components: Array<any>
}

export class ContainerComponent extends BaseComponent<ContainerOptions> {
    getControl(): FormArray | FormGroup | FormControl {
        if (!this.control) {
            this.control = new FormGroup({});
        }
        return this.control;
    }
}

export class ContainerElement extends BaseElement {
    private renderCount: number = 0;
    @Input() component: ContainerComponent;
    onRender() {
        this.renderCount++;
        if (this.renderCount >= this.component.settings.components.length) {
            this.render.emit(true);
        }
    }
}

export function Container(template:FormioTemplate) {
    FormioComponents.register('container', ContainerComponent, ContainerElement, {
        template: template.components.container
    });
    return ContainerElement;
};