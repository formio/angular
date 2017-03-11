import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewEncapsulation }  from '@angular/core';
import { FormioService } from './formio.service';
import { FormioLoader } from './formio.loader';
import { FormioForm, FormioOptions, FormioError } from './formio.common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
let FormioFormCore = require('formiojs/build/formio.form.js');

@Component({
    selector: 'formio',
    template: '<div><formio-loader></formio-loader></div>',
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
    constructor(private elementRef: ElementRef, private loader: FormioLoader) {
        this.beforeSubmit = new EventEmitter();
        this.submit = new EventEmitter();
        this.error = new EventEmitter();
        this.invalid = new EventEmitter();
        this.change = new EventEmitter();
        this.render = new EventEmitter();
    }
    ngOnInit() {
        this.formio = new FormioFormCore(null, {
            readOnly: this.readOnly
        });
        this.options = Object.assign({
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
                    }, (err) => this.error.emit(err));
                }
            }, (err) => this.error.emit(err));
        }

        // Add the submission if it was provided.
        if (this.submission) {
            this.formio.submission = this.submission;
        }

        this.formio.on('change', (value: any) => this.change.emit(value));
        this.formio.on('submit', (submission: any) => this.onSubmit(submission));
        this.formio.on('error', (err: any) => this.error.emit(err));
        this.formio.on('render', () => this.render.emit(true));
        this.formio.setElement(this.elementRef.nativeElement);
    }
    submitForm(submission: Object) {
        if (this.service) {
            this.service.saveSubmission(submission).subscribe(
                (sub: {}) => this.submit.emit(sub),
                (err) => this.error.emit(err)
            );
        }
        else {
            this.submit.emit(submission);
        }
    }
    onSubmit(submission: any) {
        this.beforeSubmit.emit(submission);

        // If they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        if (this.options.hooks.beforeSubmit) {
            this.options.hooks.beforeSubmit(submission, (err: FormioError, sub:Object) => {
                if (err) {
                    this.error.emit(err);
                    return;
                }
                this.submitForm(sub);
            });
        }
        else {
            this.submitForm(submission);
        }
    }
}
