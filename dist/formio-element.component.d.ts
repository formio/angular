import { EventEmitter, OnInit, Compiler, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from './components/base';
import { FormioEvents } from './formio.common';
export declare class FormioElement implements OnInit {
    private compiler;
    component: BaseComponent<any>;
    form: FormGroup;
    submission: FormGroup;
    data: any;
    label: string | boolean;
    events: FormioEvents;
    render: EventEmitter<any>;
    element: ViewContainerRef;
    constructor(compiler: Compiler);
    ngOnInit(): void;
}
