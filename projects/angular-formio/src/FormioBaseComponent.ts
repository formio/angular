import { Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { FormioService } from './formio.service';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { FormioAppConfig } from './formio.config';
import { FormioError, FormioForm, FormioOptions, FormioRefreshValue } from './formio.common';
import { assign, get, isEmpty } from 'lodash';
import { CustomTagsService } from './custom-component/custom-tags.service';
import Evaluator from 'formiojs/utils/Evaluator';
import { fastCloneDeep } from 'formiojs/utils/utils';
import { AlertsPosition } from './types/alerts-position';

@Component({
  template: ''
})
export class FormioBaseComponent implements OnInit, OnChanges, OnDestroy {
  @Input() form?: FormioForm;
  @Input() submission?: any = {};
  @Input() src?: string;
  @Input() url?: string;
  @Input() service?: FormioService;
  @Input() options?: FormioOptions;
  @Input() noeval ? = Evaluator.noeval;
  @Input() formioOptions?: any;
  @Input() renderOptions?: any;
  @Input() readOnly ? = false;
  @Input() viewOnly ? = false;
  @Input() hideLoading ? = false;
  @Input() hideComponents?: string[];
  @Input() refresh?: EventEmitter<FormioRefreshValue>;
  @Input() error?: EventEmitter<any>;
  @Input() success?: EventEmitter<object>;
  @Input() submitDone?: EventEmitter<object>;
  @Input() language?: EventEmitter<string>;
  @Input() hooks?: any = {};
  @Input() renderer?: any;
  @Input() watchSubmissionErrors ? = false;
  @Input() dataTableActions? : any = []
  @Output() render = new EventEmitter<object>();
  @Output() customEvent = new EventEmitter<object>();
  @Output() fileUploadingStatus = new EventEmitter<string>();
  @Output() submit = new EventEmitter<object>();
  @Output() prevPage = new EventEmitter<object>();
  @Output() nextPage = new EventEmitter<object>();
  @Output() beforeSubmit = new EventEmitter<object>();
  @Output() rowAdd = new EventEmitter<any>();
  @Output() rowAdded = new EventEmitter<any>();
  @Output() rowEdit = new EventEmitter<any>();
  @Output() rowEdited = new EventEmitter<any>();
  @Output() rowDelete = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() rowSelectChange = new EventEmitter<any>();
  @Output() change = new EventEmitter<object>();
  @Output() invalid = new EventEmitter<boolean>();
  @Output() errorChange = new EventEmitter<any>();
  @Output() formLoad = new EventEmitter<any>();
  @Output() submissionLoad = new EventEmitter<any>();
  @Output() ready = new EventEmitter<FormioBaseComponent>();
  @ViewChild('formio', { static: true }) formioElement?: ElementRef<any>;

  public AlertsPosition = AlertsPosition;
  public formio: any;
  public initialized = false;
  public alerts = new FormioAlerts();
  public formioReady: Promise<any>;

  private formioReadyResolve: any;
  private submitting = false;
  private submissionSuccess = false;
  public isLoading: boolean;
  public noAlerts: boolean;
  public label: string;

  constructor(
    public ngZone: NgZone,
    @Optional() public config: FormioAppConfig,
    @Optional() public customTags?: CustomTagsService,
  ) {
    this.isLoading = true;
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
      ...(this.viewOnly && { renderMode: "html" }),
      i18n: get(this.options, 'i18n', null),
      fileService: get(this.options, 'fileService', null),
      hooks: this.hooks,
      sanitizeConfig: {
        addTags: extraTags
      },
      dataTableActions: this.dataTableActions
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

    if (this.form.title) {
      this.label = this.form.title;
    } else if (this.form.components && this.form.components[0]) {
      this.label = this.form.components[0].label;
    }

    // Clear out the element to render the new form.
    if (this.formioElement && this.formioElement.nativeElement) {
      this.formioElement.nativeElement.innerHTML = '';
    }
    this.formio = this.createRenderer();
    this.formio.setSubmission(this.submission, {
      fromSubmission: false
    });
    if (this.renderOptions && this.renderOptions.validateOnInit) {
      this.formio.setValue(this.submission, {validateOnInit: true});
    }
    if (this.url) {
      this.formio.setUrl(this.url, this.formioOptions || {});
    }
    if (this.src) {
      this.formio.setUrl(this.src, this.formioOptions || {});
    }
    this.formio.nosubmit = true;
    this.formio.on('prevPage', (data: any) => this.ngZone.run(() => this.onPrevPage(data)));
    this.formio.on('nextPage', (data: any) => this.ngZone.run(() => this.onNextPage(data)));
    this.formio.on('change', (value: any, flags: any, isModified: boolean) => this.ngZone.run(() => this.onChange(value, flags, isModified)));
    this.formio.on('rowAdd', (component: any) =>  this.ngZone.run(() => this.rowAdd.emit(component)));
    this.formio.on('rowAdded', (data: any, component: any) =>  this.ngZone.run(() => this.rowAdded.emit({component, row: data})));
    this.formio.on('rowEdit', (data: any, rowIndex: number, index: number, component: any) =>  this.ngZone.run(() => this.rowEdit.emit({component, row: data, rowIndex, index})));
    this.formio.on('rowEdited', (data: any, rowIndex: number, component: any) =>  this.ngZone.run(() => this.rowEdited.emit({component, row: data, rowIndex})));
    this.formio.on('rowDelete', (data: any, rowIndex: number, index: number, component: any) =>  this.ngZone.run(() => this.rowDelete.emit({component, row: data, rowIndex, index})));
    this.formio.on('rowClick', (row: any, rowIndex: number, index: number,component: any) =>  this.ngZone.run(() => this.rowClick.emit({component, row, rowIndex, index})));
    this.formio.on('rowSelectChange', (selectedRows: any[], component: any) =>  this.ngZone.run(() => this.rowSelectChange.emit({selectedRows, component})));
    this.formio.on('customEvent', (event: any) =>
      this.ngZone.run(() => this.customEvent.emit(event))
    );

    ['fileUploadingStart', 'fileUploadingEnd'].forEach((eventName, index) => {
      const status = !!index ? 'end' : 'start';
      this.formio.on(eventName, () =>
        this.ngZone.run(() => this.fileUploadingStatus.emit(status))
      );
    });

    this.formio.on('submit', (submission: any, saved: boolean) =>
      this.ngZone.run(() => this.submitForm(submission, saved))
    );
    this.formio.on('error', (err: any) => this.ngZone.run(() => {
      this.submissionSuccess = false;
      return this.onError(err);
    }));
    this.formio.on('render', () => this.ngZone.run(() => this.render.emit()));
    this.formio.on('formLoad', (loadedForm: any) =>
      this.ngZone.run(() => this.formLoad.emit(loadedForm))
    );

    return this.formio.ready.then(() => {
      this.ngZone.run(() => {
        this.isLoading = false;
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
    const defaultOptions: FormioOptions = {
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
      },
      alertsPosition: AlertsPosition.top,
    };
    this.options = Object.assign(defaultOptions, this.options);
    if (this.options.disableAlerts) {
      this.options.alertsPosition = AlertsPosition.none;
    }
    this.initialized = true;
  }

  ngOnInit() {
    Evaluator.noeval = this.noeval;
    this.initialize();

    if (this.language) {
      if (typeof this.language === 'string') {
        this.formio.language = this.language;
      } else {
        this.language.subscribe((lang: string) => {
          this.formio.language = lang;
        });
      }
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

    if (this.submitDone) {
      this.submitDone.subscribe((submission: object) => {
        this.formio.emit('submitDone', submission);
      });
    }

    if (this.src) {
      if (!this.service) {
        this.service = new FormioService(this.src);
      }
      this.isLoading = true;
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
        this.formio.setSubmission(changes.submission.currentValue, {
          fromSubmission: !changes.submission.firstChange
        });
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
    this.submissionSuccess = true;

    this.formio.setValue(fastCloneDeep(submission), {
      noValidate: true,
      noCheck: true
    });

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
    this.isLoading = false;

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

    if (this.formio && errors.length) {
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
            message: error.details.map((detail) => detail.message),
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

      let shouldErrorDisplay = true;

      if (this.formio) {
        paths.forEach((path, index) => {
          const component = this.formio.getComponent(path);
          if (component) {
            const components = Array.isArray(component) ? component : [component];
            const messageText = Array.isArray(message) ? message[index] : message;
            components.forEach((comp) => comp.setCustomValidity(messageText, true));
            this.alerts.addAlert({
              type: 'danger',
              message: message[index],
              component,
            });
            shouldErrorDisplay = false;
          }
        });

        if ((window as any).VPAT_ENABLED) {
          if (typeof error ==='string' && this.formio.components) {
            this.formio.components.forEach((comp) => {
              if (comp && comp.type !== 'button') {
                comp.setCustomValidity(message, true);
              }
            });
          }
        }

        if (!this.noAlerts) {
          this.formio.showErrors();
        }
      }

      if (shouldErrorDisplay) {
        this.alerts.addAlert({
          type: 'danger',
          message,
          component: error.component,
        });
      }
    });
  }

  focusOnComponet(key: any) {
    if (this.formio) {
      this.formio.focusOnComponent(key);
    }
  }

  submitExecute(submission: object, saved = false) {
    if (this.service && !this.url && !saved) {
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

  submitForm(submission: any, saved = false) {
    // Keep double submits from occurring...
    if (this.submitting) {
      return;
    }
    this.formio.setMetadata(submission);
    this.submissionSuccess = false;
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
        this.submitExecute(sub, saved);
      });
    } else {
      this.submitExecute(submission, saved);
    }
  }

  onChange(value: any, flags: any, isModified: boolean) {
    if (this.watchSubmissionErrors && !this.submissionSuccess) {
      const errors = get(this, 'formio.errors', []);
      const alerts = get(this, 'alerts.alerts', []);
      const submitted = get(this, 'formio.submitted', false);
      if (submitted && (errors.length || alerts.length)) {
        this.onError(errors);
      }
    }
    return this.change.emit({...value, flags, isModified});
  }
}
