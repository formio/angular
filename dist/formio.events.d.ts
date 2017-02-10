import { EventEmitter } from '@angular/core';
import { FormioError, FormioAlert } from './formio.common';
export interface FormioEvent {
    type: string;
    data?: Object;
}
export declare class FormioEvents {
    onBeforeSubmit: EventEmitter<Object>;
    onSubmit: EventEmitter<Object>;
    onError: EventEmitter<FormioError>;
    onInvalid: EventEmitter<boolean>;
    onChange: EventEmitter<Object>;
    onRender: EventEmitter<any>;
    errors: Array<FormioError>;
    alerts: Array<FormioAlert>;
    constructor();
}
