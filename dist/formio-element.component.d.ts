import { EventEmitter, OnInit, Compiler, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from './components/base';
import { FormioEvents } from './formio.events';
export declare class FormioElement implements OnInit {
    private compiler;
    private events;
    component: BaseComponent<any>;
    form: FormGroup;
    submission: FormGroup;
    data: any;
    label: string | boolean;
    render: EventEmitter<any>;
    element: ViewContainerRef;
    constructor(compiler: Compiler, events: FormioEvents);
    ngOnInit(): void;
}
