import { EventEmitter } from '@angular/core';

export class FormioEvents {
    public componentState: EventEmitter<any>;
    constructor() {
        this.componentState = new EventEmitter();
    }
}

export interface FormioOptions {
    errorMessage: string
}