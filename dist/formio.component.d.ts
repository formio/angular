import 'core-js/es7/reflect';
import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioService } from './formio.service';
import { FormioForm, FormioOptions } from './formio.common';
import { FormioEvents } from './formio.events';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * The <formio> component.
 */
export declare class FormioComponent implements OnInit {
    events: FormioEvents;
    formGroup: FormGroup;
    ready: BehaviorSubject<boolean>;
    form: FormioForm;
    submission: any;
    src: string;
    service: FormioService;
    options: FormioOptions;
    readOnly: boolean;
    render: EventEmitter<Object>;
    submit: EventEmitter<Object>;
    beforeSubmit: EventEmitter<Object>;
    change: EventEmitter<Object>;
    invalid: EventEmitter<boolean>;
    constructor(events: FormioEvents);
    ngOnInit(): void;
    onRender(): void;
    submitForm(submission: Object): void;
    onSubmit($event: any): void;
}
