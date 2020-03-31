import { ApplicationRef, EventEmitter, Injectable, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioResourceConfig } from './resource.config';
import { FormioResources } from './resources.service';
import { FormioPromiseService } from '../formio-promise.service';
import { FormioAlerts } from '../components/alerts/formio.alerts';
import { FormioLoader } from '../components/loader/formio.loader';
import { FormioAppConfig } from '../formio.config';
import { FormioRefreshValue } from '../formio.common';
import Promise from 'native-promise-only';
import { Formio, Utils } from 'formiojs';
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

  public resourceLoading?: Promise<any>;
  public resourceLoaded?: Promise<any>;
  public resourceId?: string;
  public resources: any;

  public formLoading?: Promise<any>;
  public formLoaded: Promise<any>;
  public formResolve: any;
  public formReject: any;

  constructor(
    public appConfig: FormioAppConfig,
    public config: FormioResourceConfig,
    public loader: FormioLoader,
    @Optional() public resourcesService: FormioResources,
    public appRef: ApplicationRef,
  ) {
    this.alerts = new FormioAlerts();
    this.refresh = new EventEmitter();
    this.formLoaded = new Promise((resolve: any, reject: any) => {
      this.formResolve = resolve;
      this.formReject = reject;
    });
    this.init();
  }

  initialize() {
    console.warn('FormioResourceService.initialize() has been deprecated.');
  }

  init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    if (this.appConfig && this.appConfig.appUrl) {
      Formio.setBaseUrl(this.appConfig.apiUrl);
      Formio.setProjectUrl(this.appConfig.appUrl);
      Formio.formOnly = this.appConfig.formOnly;
    } else {
      console.error('You must provide an AppConfig within your application!');
    }

    // Create the form url and load the resources.
    this.formUrl = this.appConfig.appUrl + '/' + this.config.form;
    this.resource = { data: {} };

    // Add this resource service to the list of all resources in context.
    if (this.resourcesService) {
      this.resources = this.resourcesService.resources;
      this.resources[this.config.name] = this;
    }

    return this.loadForm();
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

  setContext(route: ActivatedRoute) {
    this.resourceId = route.snapshot.params['id'];
    this.resource = { data: {} };
    this.resourceUrl = this.appConfig.appUrl + '/' + this.config.form;
    if (this.resourceId) {
      this.resourceUrl += '/submission/' + this.resourceId;
    }
    this.formio = new FormioPromiseService(this.resourceUrl);
    if (this.resourcesService) {
      this.resources[this.config.name] = this;
    }
    this.loadParents();
  }

  loadForm() {
    this.formFormio = new FormioPromiseService(this.formUrl);
    this.loader.setLoading(true);
    this.formLoading = this.formFormio
      .loadForm()
      .then(
        (form: any) => {
          this.form = form;
          this.formResolve(form);
          this.loader.setLoading(false);
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
  }

  loadResource(route: ActivatedRoute) {
    this.setContext(route);
    this.loader.setLoading(true);
    this.resourceLoading = this.resourceLoaded = this.formio
      .loadSubmission(null, {ignoreCache: true})
      .then(
        (resource: any) => {
          this.resource = resource;
          this.loader.setLoading(false);
          this.refresh.emit({
            property: 'submission',
            value: this.resource
          });
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
