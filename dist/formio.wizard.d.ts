/// <reference types="chai" />
import { EventEmitter, OnInit, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioService } from './formio.service';
import { FormioForm, FormioEvents, FormioOptions } from './formio.common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class FormioWizardComponent implements OnInit {
    private elementRef;
    formGroup: FormGroup;
    events: FormioEvents;
    ready: BehaviorSubject<boolean>;
    page: any;
    pages: Array<any>;
    currentPage: number;
    storage: Object;
    margin: number;
    colClass: string;
    localStorageKey: string;
    options: FormioOptions;
    form: FormioForm;
    submission: any;
    src: string;
    service: FormioService;
    change: EventEmitter<any>;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    onChange(event: any): void;
    checkErrors(): boolean;
    next(): void;
    prev(): void;
    onSubmitWizard(): void;
    goto(index: number): void;
    updatePages(): void;
}
