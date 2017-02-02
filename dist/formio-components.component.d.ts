import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseOptions } from './components/base';
export declare class FormioComponentsComponent {
    components: Array<BaseOptions<any>>;
    form: FormGroup;
    submission: FormGroup;
    data: any;
    render: EventEmitter<any>;
    private renderCount;
    onRender(): void;
}
