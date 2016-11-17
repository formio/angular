import 'core-js/es7/reflect';
import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioService } from './formio.service';
import { FormioForm, FormioEvents, FormioOptions } from './formio.common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * The <formio> component.
 */
export declare class FormioComponent implements OnInit {
    formGroup: FormGroup;
    events: FormioEvents;
    ready: BehaviorSubject<boolean>;
    form: FormioForm;
    submission: any;
    src: string;
    service: FormioService;
    options: FormioOptions;
    render: EventEmitter<any>;
    submit: EventEmitter<any>;
    change: EventEmitter<any>;
    ngOnInit(): void;
    onRender(): void;
    onSubmit($event: any): void;
}
