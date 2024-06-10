import { EventEmitter, Injectable, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioResourceConfig } from './resource.config';
import { FormioResources } from './resources.service';
import { FormioPromiseService } from '@formio/angular';
import { FormioAlerts } from '@formio/angular';
import { FormioAppConfig } from '@formio/angular';
import { FormioRefreshValue } from '@formio/angular';
import { Formio, Utils } from '@formio/js';
import _ from 'lodash';

@Injectable()
export class FormioResourceService {
  public initialized = false;
  public form: any;
  public alerts: FormioAlerts;
  public resource: any;
  public resourceUrl?: string;
  public formUrl: string;
  public formFormio: FormioPromiseService;
  public formio: FormioPromiseService;
  public refresh: EventEmitter<FormioRefreshValue>;

  public resourceResolve: any;
  public resourceReject: any;
  public resourceLoaded?: Promise<any>;

  public resourceLoading?: Promise<any>;
  public resourceId?: string;
  public resources: any;

  public ready?: Promise<any>;
  public readyResolve: any;
  public readyReject: any;

  public formLoading?: Promise<any>;
  public formLoaded: Promise<any>;
  public formResolve: any;
  public formReject: any;
  public isLoading: boolean;

  constructor(
    public appConfig: FormioAppConfig,
    public config: FormioResourceConfig,
    @Optional() public resourcesService: FormioResources
  ) {
    this.isLoading = true;
    this.alerts = new FormioAlerts();
    this.refresh = new EventEmitter();
  }

  initialize() {
    console.warn('FormioResourceService.initialize() has been deprecated.');
  }

  setResource(resourceId: any) {
    this.resourceLoading = null;
    this.formLoading = null;
    this.ready = new Promise((resolve: any, reject: any) => {
      this.readyResolve = resolve;
      this.readyReject = reject;
    });
    this.formLoaded = new Promise((resolve: any, reject: any) => {
      this.formResolve = resolve;
      this.formReject = reject;
    });
    this.resourceLoaded = new Promise((resolve: any, reject: any) => {
      this.resourceResolve = resolve;
      this.resourceReject = reject;
    });
    this.resourceId = resourceId;
    this.resourceUrl = this.appConfig.appUrl + '/' + this.config.form;
    if (this.resourceId) {
      this.resourceUrl += '/submission/' + this.resourceId;
    }
    if (this.appConfig && this.appConfig.appUrl) {
      Formio.setBaseUrl(this.appConfig.apiUrl);
      Formio.setProjectUrl(this.appConfig.appUrl);
      Formio.formOnly = this.appConfig.formOnly;
    } else {
      console.error('You must provide an AppConfig within your application!');
    }
    this.formio = new FormioPromiseService(this.resourceUrl);
    this.resource = { data: {} };
  }

  init(route: ActivatedRoute) {
    const snapshot = route.snapshot;
    const reset = snapshot.queryParams?.hasOwnProperty('reset') ? snapshot.queryParams.reset : false;
    const resourceId = snapshot.params['id'];
    if (resourceId && (resourceId === this.resourceId) && !reset) {
      return this.ready;
    }

    // Set the resource.
    this.setResource(resourceId);

    // Add this resource service to the list of all resources in context.
    if (this.resourcesService) {
      this.resources = this.resourcesService.resources;
      this.resources[this.config.name] = this;
    }

    if (this.resourceId) {
      return this.loadForm()
        .then(() => this.loadResource())
        .then(() => this.readyResolve(this.form))
        .catch((err) => this.readyReject(err));
    }

    return this.loadForm()
      .then(() => this.readyResolve(this.form))
      .catch((err) => this.readyReject(err));
  }

  onError(error: any) {
    this.alerts.setAlert({
      type: 'danger',
      message: error.message || error
    });
    if (this.resourcesService) {
      this.resourcesService.error.emit(error);
    }
    throw error;
  }

  onFormError(err: any) {
    this.formReject(err);
    this.onError(err);
  }

  loadForm() {
    if (this.formLoading) {
      return this.formLoading;
    }
    this.formUrl = this.appConfig.appUrl + '/' + this.config.form;
    this.formFormio = new FormioPromiseService(this.formUrl);
    this.isLoading = true;
    this.formLoading = this.formFormio
      .loadForm()
      .then(
        (form: any) => {
          this.form = form;
          this.formResolve(form);
          this.isLoading = false;
          this.loadParents();
          return form;
        },
        (err: any) => this.onFormError(err)
      )
      .catch((err: any) => this.onFormError(err));
    return this.formLoading;
  }

  loadParents() {
    if (!this.config.parents || !this.config.parents.length) {
      return Promise.resolve([]);
    }
    if (!this.resourcesService) {
      console.warn(
        'You must provide the FormioResources within your application to use nested resources.'
      );
      return Promise.resolve([]);
    }
    return this.formLoading.then((form) => {
      // Iterate through the list of parents.
      const _parentsLoaded: Array<Promise<any>> = [];
      this.config.parents.forEach((parent: any) => {
        const resourceName = parent.resource || parent;
        const resourceField = parent.field || parent;
        const filterResource = parent.hasOwnProperty('filter') ? parent.filter : true;
        if (this.resources.hasOwnProperty(resourceName) && this.resources[resourceName].resourceLoaded) {
          _parentsLoaded.push(
            this.resources[resourceName].resourceLoaded.then((resource: any) => {
              let parentPath = '';
              Utils.eachComponent(form.components, (component, path) => {
                if (component.key === resourceField) {
                  component.hidden = true;
                  component.clearOnHide = false;
                  _.set(this.resource.data, path, resource);
                  parentPath = path;
                  return true;
                }
              });
              return {
                name: parentPath,
                filter: filterResource,
                resource
              };
            })
          );
        }
      });

      // When all the parents have loaded, emit that to the onParents emitter.
      return Promise.all(_parentsLoaded).then((parents: any) => {
        this.refresh.emit({
          form: form,
          submission: this.resource
        });
        return parents;
      });
    });
  }

  onSubmissionError(err: any) {
    this.onError(err);
    this.resourceReject(err);
  }

  loadResource() {
    if (this.resourceLoading) {
      return this.resourceLoading;
    }
    this.isLoading = true;
    this.resourceLoading = this.formio
      .loadSubmission(null, {ignoreCache: true})
      .then(
        (resource: any) => {
          this.resource = resource;
          this.isLoading = false;
          this.refresh.emit({
            property: 'submission',
            value: this.resource
          });
          this.resourceResolve(resource);
          return resource;
        },
        (err: any) => this.onSubmissionError(err)
      )
      .catch((err: any) => this.onSubmissionError(err));
    return this.resourceLoading;
  }

  save(resource: any) {
    const formio = resource._id ? this.formio : this.formFormio;
    return formio
      .saveSubmission(resource)
      .then(
        (saved: any) => {
          this.resource = saved;
          return saved;
        },
        (err: any) => this.onError(err)
      )
      .catch((err: any) => this.onError(err));
  }

  remove() {
    return this.formio
      .deleteSubmission()
      .then(
        () => {
          this.resource = null;
        },
        (err: any) => this.onError(err)
      )
      .catch((err: any) => this.onError(err));
  }
}
