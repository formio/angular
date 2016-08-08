import { Component, Input, Type, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioComponent } from './formio-component.component';
import { BaseOptions } from './components/base';
import { FormioTemplate, RegisterTemplate } from './formio.template';
import { FormioEvents } from './formio.common';

@Component({
    selector: 'formio-components',
    template: '<div></div>',
    directives: [FormioComponent]
})
export class FormioComponentsComponent extends Type {
    @Input() components: Array<BaseOptions<any>>;
    @Input() form: FormGroup;
    @Input() events: FormioEvents;
    @Output() render: EventEmitter<any> = new EventEmitter();
    private renderCount: number = 0;
    onRender() {
        this.renderCount++;
        if (this.renderCount >= this.components.length) {
            this.render.emit(true);
        }
    }
}

export function FormioComponentsComponentRegister(template: FormioTemplate) {
    RegisterTemplate(FormioComponentsComponent, template.formio_components);
    return FormioComponent;
}