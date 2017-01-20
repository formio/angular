import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseOptions } from './components/base';

@Component({
    selector: 'formio-components',
    template: '<div></div>'
})
export class FormioComponentsComponent {
    @Input() components: Array<BaseOptions<any>>;
    @Input() form: FormGroup;
    @Input() submission: FormGroup;
    @Input() data: any;
    @Output() render: EventEmitter<any> = new EventEmitter();
    private renderCount: number = 0;
    onRender() {
        if (this.renderCount >= this.components.length) {
            return;
        }
        this.renderCount++;
        if (this.renderCount >= this.components.length) {
            this.render.emit(true);
        }
    }
}
