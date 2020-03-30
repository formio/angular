import {
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  Optional,
  ElementRef,
  ViewChild,
  NgZone
} from '@angular/core';
import { FormioService } from './formio.service';
import { FormioLoader } from './components/loader/formio.loader';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { FormioAppConfig } from './formio.config';
import {
  FormioForm,
  FormioOptions,
  FormioError,
  FormioRefreshValue
} from './formio.common';
import { isEmpty, get, assign } from 'lodash';
import { CustomTagsService } from './custom-component/custom-tags.service';
import Evaluator from 'formiojs/utils/Evaluator';

export class FormioBaseComponent implements OnInit, OnChanges, OnDestroy {
  @Input() form?: FormioForm;
  @Input() submission?: any = {};
  @Input() src?: string;
  @Input() url?: string;
  @Input() service?: FormioService;
  @Input() options?: FormioOptions;
  @Input() noeval ? = false;
  @Input() formioOptions?: any;
  @Input() renderOptions?: any;
  @Input() readOnly ? = false;
  @Input() viewOnly ? = false;
  @Input() hideComponents?: string[];
  @Input() refresh?: EventEmitter<FormioRefreshValue>;
  @Input() error?: EventEmitter<any>;
  @Input() success?: EventEmitter<object>;
  @Input() language?: EventEmitter<string>;
  @Input() hooks?: any = {};
  @Input() renderer?: any;
  @Output() render = new EventEmitter<object>();
  @Output() customEvent = new EventEmitter<object>();
  @Output() submit = new EventEmitter<object>();
  @Output() prevPage = new EventEmitter<object>();
  @Output() nextPage = new EventEmitter<object>();
  @Output() beforeSubmit = new EventEmitter<object>();
  @Output() change = new EventEmitter<object>();
  @Output() invalid = new EventEmitter<boolean>();
  @Output() errorChange = new EventEmitter<any>();
  @Output() formLoad = new EventEmitter<any>();
  @Output() submissionLoad = new EventEmitter<any>();
  @Output() ready = new EventEmitter<FormioBaseComponent>();
  @ViewChild('formio', {static: true}) formioElement?: ElementRef<any>;

  public formio: any;
  public initialized = false;
  public alerts = new FormioAlerts();
  public formioReady: Promise<any>;

  private formioReadyResolve: any;
  private submitting = false;

  constructor(
    public ngZone: NgZone,
    public loader: FormioLoader,
    @Optional() public config: FormioAppConfig,
    @Optional() public customTags?: CustomTagsService,
  ) {
    this.formioReady = new Promise((ready) => {
      this.formioReadyResolve = ready;
    });
  }

  getRenderer() {
    return this.renderer;
  }

  getRendererOptions() {
    const extraTags = this.customTags ? this.customTags.tags : [];
    return assign({}, {
      icons: get(this.config, 'icons', 'fontawesome'),
      noAlerts: get(this.options, 'noAlerts', true),
      readOnly: this.readOnly,
      viewAsHtml: this.viewOnly,
      i18n: get(this.options, 'i18n', null),
      fileService: get(this.options, 'fileService', null),
      hooks: this.hooks,
      sanitizeConfig: {
        addTags: extraTags
      }
    }, this.renderOptions || {});
  }

  createRenderer() {
    const Renderer = this.getRenderer();
    const form = (new Renderer(
      this.formioElement ? this.formioElement.nativeElement : null,
      this.form,
      this.getRendererOptions()
    ));
    return form.instance;
  }

  setForm(form: FormioForm) {
    this.form = form;
    if (this.formio) {
      this.formio.destroy();
    }
    // Clear out the element to render the new form.
    if (this.formioElement && this.formioElement.nativeElement) {
      this.formioElement.nativeElement.innerHTML = '';
    }
    this.formio = this.createRenderer();
    this.formio.submission = this.submission;
    if (this.url) {
      this.formio.setUrl(this.url, this.formioOptions || {});
    }
    if (this.src) {
      this.formio.setUrl(this.src, this.formioOptions || {});
    }
    this.formio.nosubmit = true;
    this.formio.on('prevPage', (data: any) => this.ngZone.run(() => this.onPrevPage(data)));
    this.formio.on('nextPage', (data: any) => this.ngZone.run(() => this.onNextPage(data)));
    this.formio.on('change', (value: any) => this.ngZone.run(() => this.change.emit(value)));
    this.formio.on('customEvent', (event: any) =>
      this.ngZone.run(() => this.customEvent.emit(event))
    );
    this.formio.on('submit', (submission: any) =>
      this.ngZone.run(() => this.submitForm(submission))
    );
    this.formio.on('error', (err: any) => this.ngZone.run(() => this.onError(err)));
    this.formio.on('render', () => this.ngZone.run(() => this.render.emit()));
    this.formio.on('formLoad', (loadedForm: any) =>
      this.ngZone.run(() => this.formLoad.emit(loadedForm))
    );

    return this.formio.ready.then(() => {
      this.ngZone.run(() => {
        this.loader.setLoading(false);
        this.ready.emit(this);
        this.formioReadyResolve(this.formio);
        if (this.formio.submissionReady) {
          this.formio.submissionReady.then((submission) => {
            this.submissionLoad.emit(submission);
          });
        }
      });
      return this.formio;
    });
  }

  initialize() {
    if (this.initialized) {
      return;
    }

    const extraTags = this.customTags ? this.customTags.tags : [];
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
        },
        sanitizeConfig: {
          addTags: extraTags
        }
      },
      this.options
    );
    this.initialized = true;
  }

  ngOnInit() {
    Evaluator.noeval = this.noeval;
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
          message: message || get(this.options, 'alerts.submitMessage')
        });
      });
    }

    if (this.src) {
      if (!this.service) {
        this.service = new FormioService(this.src);
      }
      this.loader.setLoading(true);
      this.service.loadForm({ params: { live: 1 } }).subscribe(
        (form: FormioForm) => {
          if (form && form.components) {
            this.ngZone.runOutsideAngular(() => {
              this.setForm(form);
            });
          }

          // if a submission is also provided.
          if (
            isEmpty(this.submission) &&
            this.service &&
            this.service.formio.submissionId
          ) {
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
    if (this.url && !this.service) {
      this.service = new FormioService(this.url);
    }
  }

  ngOnDestroy() {
    if (this.formio) {
      this.formio.destroy();
    }
  }

  onRefresh(refresh: FormioRefreshValue) {
    this.formioReady.then(() => {
      if (refresh.form) {
        this.formio.setForm(refresh.form).then(() => {
          if (refresh.submission) {
            this.formio.setSubmission(refresh.submission);
          }
        });
      } else if (refresh.submission) {
        this.formio.setSubmission(refresh.submission);
      } else {
        switch (refresh.property) {
          case 'submission':
            this.formio.submission = refresh.value;
            break;
          case 'form':
            this.formio.form = refresh.value;
            break;
        }
      }
    });
  }

  ngOnChanges(changes: any) {
    Evaluator.noeval = this.noeval;
    this.initialize();

    if (changes.form && changes.form.currentValue) {
      this.ngZone.runOutsideAngular(() => {
        this.setForm(changes.form.currentValue);
      });
    }

    this.formioReady.then(() => {
      if (changes.submission && changes.submission.currentValue) {
        this.formio.submission = changes.submission.currentValue;
      }

      if (changes.hideComponents && changes.hideComponents.currentValue) {
        const hiddenComponents = changes.hideComponents.currentValue;
        this.formio.options.hide = hiddenComponents;
        this.formio.everyComponent((component) => {
          component.options.hide = hiddenComponents;
          if (hiddenComponents.includes(component.component.key)) {
            component.visible = false;
          }
        });
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

  onSubmit(submission: any, saved: boolean, noemit?: boolean) {
    this.submitting = false;
    if (saved) {
      this.formio.emit('submitDone', submission);
    }
    if (!noemit) {
      this.submit.emit(submission);
    }
    if (!this.success) {
      this.alerts.setAlert({
        type: 'success',
        message: get(this.options, 'alerts.submitMessage')
      });
    }
  }

  onError(err: any) {
    this.alerts.setAlerts([]);
    this.submitting = false;
    this.loader.setLoading(false);

    if (!err) {
      return;
    }

    // Make sure it is an array.
    const errors = Array.isArray(err) ? err : [err];

    // Emit these errors again.
    this.errorChange.emit(errors);

    if (err.silent) {
      return;
    }

    if (this.formio) {
      this.formio.emit('submitError', errors);
    }

    // Iterate through each one and set the alerts array.
    errors.forEach((error: any) => {
      const {
        message,
        paths,
      } = error
        ? error.details
          ? {
            message: error.details.map((detail) => detail.message).join(' '),
            paths: error.details.map((detail) => detail.path),
          }
          : {
            message: error.message || error.toString(),
            paths: error.path ? [error.path] : [],
          }
        : {
          message: '',
          paths: [],
        };

      this.alerts.addAlert({
        type: 'danger',
        message,
        component: error.component,
      });

      if (this.formio) {
        paths.forEach((path) => {
          const component = this.formio.getComponent(path);
          if (component) {
            const components = Array.isArray(component) ? component : [component];
            components.forEach((comp) => comp.setCustomValidity(message, true));
          }
        });
      }
    });
  }

  focusOnComponet(key: any) {
    if (this.formio) {
      this.formio.focusOnComponent(key);
    }
  }

  submitExecute(submission: object) {
    if (this.service && !this.url) {
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
    // Keep double submits from occurring...
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    this.beforeSubmit.emit(submission);

    // if they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
    // or even provide a custom Error method.
    const beforeSubmit = get(this.options, 'hooks.beforeSubmit');
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
