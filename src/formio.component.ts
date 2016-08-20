import 'reflect-metadata';
import { Component, Input, Output, Type, EventEmitter, OnInit }  from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioService } from './formio.service';
import { FormioForm, FormioEvents, FormioOptions } from './formio.common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * The <formio> component.
 */
@Component({
    selector: 'formio',
    template: '<div></div>'
})
export class FormioComponent extends Type implements OnInit {
    public formGroup: FormGroup = new FormGroup({});
    public events: FormioEvents = new FormioEvents();
    public ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
    @Input() form: FormioForm = null;
    @Input() src: string;
    @Input() service: FormioService;
    @Input() options: FormioOptions;
    @Output() render: EventEmitter<any> = new EventEmitter();
    @Output() submit: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    constructor() {
        super();
    }
    ngOnInit() {
        this.options = Object.assign({
            errors: {
                message: 'Please fix the following errors before submitting.'
            }
        }, this.options);

        if (this.form) {
            this.ready.next(true);
        }
        else if (this.src && !this.service) {
            this.service = new FormioService(this.src);
            this.service.loadForm().subscribe((form: FormioForm) => {
                if (form && form.components) {
                    this.form = form;
                    this.ready.next(true);
                }
            });
        }

        // Subscribe to value changes.
        //noinspection TypeScriptUnresolvedFunction
        this.formGroup.valueChanges
            .debounceTime(200)
            .subscribe((value: any) => {
                this.change.emit(value);
                this.events.component.emit('valueChanges');
            });
    }
    onRender() {
        // The form is done rendering.
        this.render.emit(true);
    }
    onSubmit() {
        // Reset the errors.
        this.events.errors = [];

        // Check if the form is valid.
        if (!this.formGroup.valid) {
            this.formGroup.markAsDirty(true);
            this.events.component.emit('invalid');
            return;
        }

        let submission = {data: this.formGroup.value};
        if (this.service) {
            this.service.saveSubmission(submission).subscribe((sub: {}) => {
                this.submit.emit(sub);
            });
        }
    }
}
