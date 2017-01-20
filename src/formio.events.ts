import { EventEmitter, Injectable }  from '@angular/core';
import { FormioError, FormioAlert } from './formio.common';

export interface FormioEvent {
    type: string,
    data?: Object
}

@Injectable()
export class FormioEvents {
    public beforeSubmit: EventEmitter<Object>;
    public onSubmit: EventEmitter<Object>;
    public onInvalid: EventEmitter<boolean>;
    public onChange: EventEmitter<Object>;
    public errors: Array<FormioError>;
    public alerts: Array<FormioAlert>;
    constructor() {
        this.beforeSubmit = new EventEmitter();
        this.onSubmit = new EventEmitter();
        this.onInvalid = new EventEmitter();
        this.onChange = new EventEmitter();
        this.errors = [];
        this.alerts = [];
    }
}