import { OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { BaseOptions, BaseComponent } from './components/base';
import { FormioEvents } from './formio.common';
export declare class FormioComponentComponent<T> implements OnInit {
    show: Boolean;
    components: Array<BaseComponent<any>>;
    container: FormArray;
    component: BaseOptions<T>;
    form: FormGroup;
    events: FormioEvents;
    label: string | boolean;
    render: EventEmitter<any>;
    ngOnInit(): void;
    hasConditions(): string | boolean;
    checkConditions(): void;
    addComponent(): any;
    removeAt(index: number): void;
    readonly errors: Array<string>;
}
