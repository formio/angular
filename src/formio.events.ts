import { EventEmitter, Injectable }  from '@angular/core';
import { FormioError, FormioAlert } from './formio.common';

export interface FormioEvent {
    type: string,
    data?: Object
}

@Injectable()
export class FormioEvents {
    public onBeforeSubmit: EventEmitter<Object>;
    public onSubmit: EventEmitter<Object>;
    public onError: EventEmitter<FormioError>;
    public onInvalid: EventEmitter<boolean>;
    public onChange: EventEmitter<Object>;
    public onRender: EventEmitter<any>;
    public errors: Array<FormioError>;
    public alerts: Array<FormioAlert>;
    constructor() {
        this.onBeforeSubmit = new EventEmitter();
        this.onSubmit = new EventEmitter();
        this.onError = new EventEmitter();
        this.onInvalid = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onRender = new EventEmitter();
        this.errors = [];
        this.alerts = [];
    }
}
