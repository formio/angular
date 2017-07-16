import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, Optional, ElementRef, ViewChild }  from '@angular/core';
import { FormioService } from './formio.service';
import { FormioLoader } from './formio.loader';
import { FormioAlerts } from './formio.alerts';
import { FormioAppConfig } from './formio.config';
import { FormioForm, FormioOptions, FormioError, FormioRefreshValue } from './formio.common';
let Promise = require('native-promise-only');
let Formio = require('formiojs/full');
let _each = require('lodash/each');

@Component({
    selector: 'formio',
    template: '<div>' +
        '<formio-loader></formio-loader>' +
        '<formio-alerts></formio-alerts>' +
        '<div #formio></div>' +
    '</div>',
    styles: ['@@import formio.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FormioComponent implements OnInit {
    public ready: Promise<boolean>;
    public readyResolve: any;
    @Input() form: FormioForm = null;
    @Input() submission: any = {};
    @Input() src: string;
    @Input() url: string;
    @Input() service: FormioService;
    @Input() options: FormioOptions;
    @Input() readOnly: boolean = false;
    @Input() hideComponents: Array<string>;
    @Input() refresh: EventEmitter<FormioRefreshValue>;
    @Output() render: EventEmitter<Object>;
    @Output() customEvent: EventEmitter<Object>;
    @Output() submit: EventEmitter<Object>;
    @Output() prevPage: EventEmitter<Object>;
    @Output() nextPage: EventEmitter<Object>;
    @Output() beforeSubmit: EventEmitter<Object>;
    @Output() change: EventEmitter<Object>;
    @Output() invalid: EventEmitter<boolean>;
    @Output() error: EventEmitter<any>;
    @Output() formLoad: EventEmitter<any>;
    @ViewChild('formio') formioElement:ElementRef;

    private formio: any;
    constructor(
        private loader: FormioLoader,
        private alerts: FormioAlerts,
        @Optional() private config: FormioAppConfig
    ) {
        if (this.config) {
            Formio.Formio.setBaseUrl(this.config.apiUrl);
            Formio.Formio.setAppUrl(this.config.appUrl);
        }
        else {
            console.warn('You must provide an AppConfig within your application!');
        }

        this.ready = new Promise((resolve: any) => {
            this.readyResolve = resolve;
        });

        this.beforeSubmit = new EventEmitter();
        this.prevPage = new EventEmitter();
        this.nextPage = new EventEmitter();
        this.submit = new EventEmitter();
        this.error = new EventEmitter();
        this.invalid = new EventEmitter();
        this.change = new EventEmitter();
        this.customEvent = new EventEmitter();
        this.render = new EventEmitter();
        this.formLoad = new EventEmitter();
        this.alerts.alerts = [];
    }
    setForm(form: FormioForm) {
        this.form = form;

        // Only initialize a single formio instance.
        if (this.formio) {
            this.formio.form = this.form;
            return;
        }
        if (this.form.display === 'wizard') {
            this.formio = new Formio.FormioWizard(null, {
                noAlerts: true,
                readOnly: this.readOnly
            });
        }
        else {
            this.formio = new Formio.FormioForm(null, {
                noAlerts: true,
                readOnly: this.readOnly
            });
        }

        if (this.url) {
            this.formio.url = this.url;
        }
        if (this.src) {
            this.formio.url = this.src;
        }
        this.formio.nosubmit = true;
        this.formio.on('prevPage', (data: any) => this.onPrevPage(data));
        this.formio.on('nextPage', (data: any) => this.onNextPage(data));
        this.formio.on('change', (value: any) => this.change.emit(value));
        this.formio.on('customEvent', (event: any) => this.customEvent.emit(event));
        this.formio.on('submit', (submission: any) => this.submitForm(submission));
        this.formio.on('error', (err: any) => this.onError(err));
        this.formio.on('render', () => this.render.emit(true));
        this.formio.on('formLoad', (form: any) => this.formLoad.emit(form));
        this.formio.setElement(this.formioElement.nativeElement);
        this.formio.form = this.form;
        this.loader.loading = false;
        this.readyResolve();
    }
    ngOnInit() {
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

        if (this.refresh) {
            this.refresh.subscribe((refresh: FormioRefreshValue) => this.onRefresh(refresh));
        }

        if (this.src) {
            if (!this.service) {
                this.service = new FormioService(this.src);
            }
            this.loader.loading = true;
            this.service.loadForm().subscribe((form: FormioForm) => {
                if (form && form.components) {
                    this.setForm(form);
                }

                // if a submission is also provided.
                if (!this.submission && this.service.formio.submissionId) {
                    this.service.loadSubmission().subscribe((submission: any) => {
                        this.submission = this.formio.submission = submission;
                    }, (err) => this.onError(err));
                }
            }, (err) => this.onError(err));
        }
    }
    onRefresh(refresh: FormioRefreshValue) {
        switch (refresh.property) {
            case 'submission':
                this.formio.submission = refresh.value;
                break;
            case 'form':
                this.formio.form = refresh.value;
                break;
        }
    }
    ngOnChanges(changes: any) {
        if (changes.form && changes.form.currentValue) {
            this.setForm(changes.form.currentValue);
        }

        this.ready.then(() => {
            if (changes.submission && changes.submission.currentValue) {
                this.formio.submission = changes.submission.currentValue;
            }

            if (changes.hideComponents) {
                this.formio.hideComponents(changes.hideComponents.currentValue);
            }
        });
    }
    onPrevPage(data: any) {
        this.alerts.setAlerts([]);
        this.prevPage.emit(data)
    }
    onNextPage(data: any) {
        this.alerts.setAlerts([]);
        this.nextPage.emit(data)
    }
    onSubmit(submission: any, saved: boolean) {
        if (saved) {
            this.formio.emit('submitDone', submission);
        }
        this.submit.emit(submission);
        this.alerts.setAlert({
            type: 'success',
            message: this.options.alerts.submitMessage
        });
    }
    onError(err: any) {
        this.alerts.setAlerts([]);
        if (!err) {
            return;
        }

        // Make sure it is an array.
        err = (err instanceof Array) ? err : [err];

        // Emit these errors again.
        this.error.emit(err);

        // Iterate through each one and set the alerts array.
        _each(err, (error: any) => {
            this.alerts.setAlert({
                type: 'danger',
                message: error.message || error.toString()
            });
        });
    }
    submitExecute(submission: Object) {
        if (this.service) {
            this.service.saveSubmission(submission).subscribe(
                (sub: {}) => this.onSubmit(sub, true),
                (err) => this.onError(err)
            );
        }
        else {
            this.onSubmit(submission, false);
        }
    }
    submitForm(submission: any) {
        this.beforeSubmit.emit(submission);

        // if they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        if (this.options.hooks.beforeSubmit) {
            this.options.hooks.beforeSubmit(submission, (err: FormioError, sub: Object) => {
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
