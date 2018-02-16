import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  Optional,
  ElementRef,
  ViewChild
} from '@angular/core';
import { FormioService } from './formio.service';
import { FormioLoader } from './formio.loader';
import { FormioAlerts, FormioAlert } from './formio.alerts';
import { FormioAppConfig } from './formio.config';
import {
  FormioForm,
  FormioOptions,
  FormioError,
  FormioRefreshValue
} from './formio.common';

/* tslint:disable */
const Formio = require('formiojs/full');
const _each = require('lodash/each');
const _get = require('lodash/get');
const _isEmpty = require('lodash/isEmpty');
/* tslint:enable */

@Component({
  selector: 'formio',
  template:
    '<div>' +
    '<formio-loader></formio-loader>' +
    '<formio-alerts *ngIf="!this.options.disableAlerts" [alerts]="alerts"></formio-alerts>' +
    '<div #formio></div>' +
    '</div>',
  styleUrls: ['formio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormioComponent implements OnInit, OnChanges {
  public ready: Promise<object>;
  public readyResolve: any;
  @Input() form: FormioForm;
  @Input() submission: any = {};
  @Input() src: string;
  @Input() url: string;
  @Input() service: FormioService;
  @Input() options: FormioOptions;
  @Input() readOnly: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() hideComponents: string[];
  @Input() refresh: EventEmitter<FormioRefreshValue>;
  @Input() error: EventEmitter<any>;
  @Input() success: EventEmitter<object>;
  @Input() language: EventEmitter<string>;
  @Output() render: EventEmitter<object>;
  @Output() customEvent: EventEmitter<object>;
  @Output() submit: EventEmitter<object>;
  @Output() prevPage: EventEmitter<object>;
  @Output() nextPage: EventEmitter<object>;
  @Output() beforeSubmit: EventEmitter<object>;
  @Output() change: EventEmitter<object>;
  @Output() invalid: EventEmitter<boolean>;
  @Output() errorChange: EventEmitter<any>;
  @Output() formLoad: EventEmitter<any>;
  @ViewChild('formio') formioElement: ElementRef;

  public formio: any;
  public initialized: boolean;
  private alerts: FormioAlerts;
  constructor(
    private loader: FormioLoader,
    @Optional() private config: FormioAppConfig
  ) {
    if (this.config) {
      Formio.Formio.setBaseUrl(this.config.apiUrl);
      Formio.Formio.setProjectUrl(this.config.appUrl);
    } else {
      console.warn('You must provide an AppConfig within your application!');
    }

    this.ready = new Promise((resolve: any) => {
      this.readyResolve = resolve;
    });

    this.alerts = new FormioAlerts();
    this.beforeSubmit = new EventEmitter();
    this.prevPage = new EventEmitter();
    this.nextPage = new EventEmitter();
    this.submit = new EventEmitter();
    this.errorChange = new EventEmitter();
    this.invalid = new EventEmitter();
    this.change = new EventEmitter();
    this.customEvent = new EventEmitter();
    this.render = new EventEmitter();
    this.formLoad = new EventEmitter();
    this.initialized = false;
    this.alerts.alerts = [];
  }
  setForm(form: FormioForm) {
    this.form = form;

    // Only initialize a single formio instance.
    if (this.formio) {
      this.formio.form = this.form;
      return;
    }

    // Create the form.
    return Formio.Formio.createForm(
      this.formioElement.nativeElement,
      this.form,
      {
        icons: this.config ? this.config.icons : '',
        noAlerts: true,
        readOnly: this.readOnly,
        viewAsHtml: this.viewOnly,
        i18n: this.options.i18n,
        fileService: this.options.fileService
      }
    ).then((formio: any) => {
      this.formio = formio;
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
      this.formio.on('customEvent', (event: any) =>
        this.customEvent.emit(event)
      );
      this.formio.on('submit', (submission: any) =>
        this.submitForm(submission)
      );
      this.formio.on('error', (err: any) => this.onError(err));
      this.formio.on('render', () => this.render.emit());
      this.formio.on('formLoad', (loadedForm: any) =>
        this.formLoad.emit(loadedForm)
      );
      this.loader.loading = false;
      this.readyResolve(this.formio);
      return this.formio;
    });
  }

  initialize() {
    if (this.initialized) {
      return;
    }

    this.options = Object.assign(
      {
        errors: {
          message: 'Please fix the following errors before submitting.'
        },
        alerts: {
          submitMessage: 'Submission Complete.'
        },
        disableAlerts: false,
        hooks: {
          beforeSubmit: null
        }
      },
      this.options
    );
    this.initialized = true;
  }

  ngOnInit() {
    this.initialize();

    if (this.language) {
      this.language.subscribe((lang: string) => {
        this.formio.language = lang;
      });
    }

    if (this.refresh) {
      this.refresh.subscribe((refresh: FormioRefreshValue) =>
        this.onRefresh(refresh)
      );
    }

    if (this.error) {
      this.error.subscribe((err: any) => this.onError(err));
    }

    if (this.success) {
      this.success.subscribe((message: string) => {
        this.alerts.setAlert({
          type: 'success',
          message: message || _get(this.options, 'alerts.submitMessage')
        });
      });
    }

    if (this.src) {
      if (!this.service) {
        this.service = new FormioService(this.src);
      }
      this.loader.loading = true;
      this.service.loadForm({ params: { live: 1 } }).subscribe(
        (form: FormioForm) => {
          if (form && form.components) {
            this.setForm(form);
          }

          // if a submission is also provided.
          if (_isEmpty(this.submission) && this.service.formio.submissionId) {
            this.service.loadSubmission().subscribe(
              (submission: any) => {
                if (this.readOnly) {
                  this.formio.options.readOnly = true;
                }
                this.submission = this.formio.submission = submission;
              },
              err => this.onError(err)
            );
          }
        },
        err => this.onError(err)
      );
    }

    if (this.url) {
      if (!this.service) {
        this.service = new FormioService(this.url);
      }
    }
  }
  onRefresh(refresh: FormioRefreshValue) {
    this.ready.then(() => {
      switch (refresh.property) {
        case 'submission':
          this.formio.submission = refresh.value;
          break;
        case 'form':
          this.formio.form = refresh.value;
          break;
      }
    });
  }
  ngOnChanges(changes: any) {
    this.initialize();

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
    this.prevPage.emit(data);
  }
  onNextPage(data: any) {
    this.alerts.setAlerts([]);
    this.nextPage.emit(data);
  }
  onSubmit(submission: any, saved: boolean) {
    if (saved) {
      this.formio.emit('submitDone', submission);
    }
    this.submit.emit(submission);
    if (!this.success) {
      this.alerts.setAlert({
        type: 'success',
        message: _get(this.options, 'alerts.submitMessage')
      });
    }
  }
  onError(err: any) {
    this.alerts.setAlerts([]);
    if (!err) {
      return;
    }

    // Make sure it is an array.
    err = err instanceof Array ? err : [err];

    // Emit these errors again.
    this.errorChange.emit(err);

    // Iterate through each one and set the alerts array.
    _each(err, (error: any) => {
      this.alerts.setAlert({
        type: 'danger',
        message: error.message || error.toString()
      });
    });
  }
  submitExecute(submission: object) {
    if (this.service) {
      this.service
        .saveSubmission(submission)
        .subscribe(
          (sub: {}) => this.onSubmit(sub, true),
          err => this.onError(err)
        );
    } else {
      this.onSubmit(submission, false);
    }
  }
  submitForm(submission: any) {
    this.beforeSubmit.emit(submission);

    // if they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
    // or even provide a custom Error method.
    const beforeSubmit = _get(this.options, 'hooks.beforeSubmit');
    if (beforeSubmit) {
      beforeSubmit(submission, (err: FormioError, sub: object) => {
        if (err) {
          this.onError(err);
          return;
        }
        this.submitExecute(sub);
      });
    } else {
      this.submitExecute(submission);
    }
  }
}
