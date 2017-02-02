import { EventEmitter } from '@angular/core';
import { FormioError, FormioAlert } from './formio.common';
export interface FormioEvent {
    type: string;
    data?: Object;
}
export declare class FormioEvents {
    beforeSubmit: EventEmitter<Object>;
    onSubmit: EventEmitter<Object>;
    onInvalid: EventEmitter<boolean>;
    onChange: EventEmitter<Object>;
    errors: Array<FormioError>;
    alerts: Array<FormioAlert>;
    constructor();
}
