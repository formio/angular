import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewEncapsulation }  from '@angular/core';
import { FormioService } from './formio.service';
import { FormioLoader } from './formio.loader';
import { FormioAlerts } from './formio.alerts';
import { FormioForm, FormioOptions, FormioError } from './formio.common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
let FormioFormCore = require('formiojs/build/formio.form.js');

@Component({
    selector: 'formio',
    template: '<div>' +
        '<formio-loader></formio-loader>' +
        '<formio-alerts></formio-alerts>' +
    '</div>',
    styles: ['@@import formio.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FormioComponent implements OnInit {
    public ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
    @Input() form: FormioForm = null;
    @Input() submission: any = {};
    @Input() src: string;
    @Input() service: FormioService;
    @Input() options: FormioOptions;
    @Input() readOnly: boolean = false;
    @Output() render: EventEmitter<Object>;
    @Output() submit: EventEmitter<Object>;
    @Output() beforeSubmit: EventEmitter<Object>;
    @Output() change: EventEmitter<Object>;
    @Output() invalid: EventEmitter<boolean>;
    @Output() error: EventEmitter<any>;
    private formio: any;
    constructor(
        private elementRef: ElementRef,
        private loader: FormioLoader,
        private alerts: FormioAlerts
    ) {
        this.formio = new FormioFormCore(null, {
            noAlerts: true
        });
        this.beforeSubmit = new EventEmitter();
        this.submit = new EventEmitter();
        this.error = new EventEmitter();
        this.invalid = new EventEmitter();
        this.change = new EventEmitter();
        this.render = new EventEmitter();
    }
    ngOnInit() {
        this.formio.options.readOnly = this.readOnly;
        this.options = Object.assign({
            errors: {
                message: 'Please fix the following errors before submitting.'
            },
            alerts: {
                submitMessage: 'Submission Complete.'
            },
            hooks: {
                beforeSubmit: null
            }
        }, this.options);

        if (this.form) {
            this.formio.form = this.form;
            this.loader.loading = false;
            this.ready.next(true);
        }
        else if (this.src) {
            if (!this.service) {
                this.service = new FormioService(this.src);
            }
            this.loader.loading = true;
            this.service.loadForm().subscribe((form: FormioForm) => {
                if (form && form.components) {
                    this.form = this.formio.form = form;
                    this.loader.loading = false;
                    this.ready.next(true);
                }

                // If a submission is also provided.
                if (!this.submission && this.service.formio.submissionId) {
                    this.service.loadSubmission().subscribe((submission: any) => {
                        this.submission = this.formio.submission = submission;
                    }, (err) => this.onError(err));
                }
            }, (err) => this.onError(err));
        }

        this.formio.on('change', (value: any) => this.change.emit(value));
        this.formio.on('submit', (submission: any) => this.submitForm(submission));
        this.formio.on('error', (err: any) => this.onError(err));
        this.formio.on('render', () => this.render.emit(true));
        this.formio.setElement(this.elementRef.nativeElement);
    }
    ngOnChanges(changes: any) {
        if (changes.form) {
            this.formio.form = changes.form.currentValue;
        }
        if (changes.submission) {
            this.formio.submission = changes.submission.currentValue;
        }
    }
    onSubmit(submission:any) {
        this.submit.emit(submission);
        this.alerts.setAlert({
            type: 'success',
            message: this.options.alerts.submitMessage
        });
    }
    onError(err: any) {
        this.error.emit(err);
        this.alerts.setAlert({
            type: 'danger',
            message: err.message || err.toString()
        });
    }
    submitExecute(submission: Object) {
        if (this.service) {
            this.service.saveSubmission(submission).subscribe(
                (sub: {}) => this.onSubmit(sub),
                (err) => this.onError(err)
            );
        }
        else {
            this.onSubmit(submission);
        }
    }
    submitForm(submission: any) {
        this.beforeSubmit.emit(submission);

        // If they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        if (this.options.hooks.beforeSubmit) {
            this.options.hooks.beforeSubmit(submission, (err: FormioError, sub:Object) => {
                if (err) {
                    this.onError(err);
                    return;
                }
                this.submitExecute(sub);
            });
        }
        else {
            this.submitExecute(submission);
        }
    }
}
