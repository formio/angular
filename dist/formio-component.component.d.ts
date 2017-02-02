import { OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { BaseOptions, BaseComponent } from './components/base';
import { FormioEvents } from './formio.events';
export declare class FormioComponentComponent<T> implements OnInit {
    private events;
    show: Boolean;
    components: Array<BaseComponent<any>>;
    container: FormArray;
    component: BaseOptions<T>;
    form: FormGroup;
    data: any;
    submission: FormGroup;
    label: string | boolean;
    render: EventEmitter<any>;
    constructor(events: FormioEvents);
    ngOnInit(): void;
    getData(key: number | string): any;
    checkConditions(): void;
    addComponent(): any;
    removeAt(index: number): void;
    readonly errors: Array<string>;
}
