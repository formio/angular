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
    private events;
    formGroup: FormGroup;
    ready: BehaviorSubject<boolean>;
    form: FormioForm;
    submission: any;
    src: string;
    service: FormioService;
    options: FormioOptions;
    readOnly: boolean;
    render: EventEmitter<any>;
    submit: EventEmitter<any>;
    change: EventEmitter<any>;
    constructor(events: FormioEvents);
    ngOnInit(): void;
    onRender(): void;
    onSubmit($event: any): void;
}
