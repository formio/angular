import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseOptions } from './components/base';
import { FormioEvents } from './formio.common';
export declare class FormioComponentsComponent {
    components: Array<BaseOptions<any>>;
    form: FormGroup;
    submission: FormGroup;
    data: any;
    events: FormioEvents;
    render: EventEmitter<any>;
    private renderCount;
    onRender(): void;
}
