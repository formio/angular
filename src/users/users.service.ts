import { EventEmitter, Injectable, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioLoader } from '../components/loader/formio.loader';
import { FormioAppConfig } from '../formio.config';
import { FormioRefreshValue } from '../formio.common';
import Promise from 'native-promise-only';
import { Formio, Utils } from 'formiojs';
import _ from 'lodash';
import {FormioUsersConfig} from './users.config';
import {FormioUsers} from './user.service';

@Injectable()
export class FormioUsersService {
  public initialized = false;
  public form: any;
  public resource: any;
  public resourceUrl?: string;
  public formUrl: string;
  public formFormio: any;
  public formio: Formio;
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
    public config: FormioUsersConfig,
    public loader: FormioLoader,
    @Optional() public resourcesService: FormioUsers
  ) {
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
    this.resource = { data: {} };
    this.formio = new Formio(this.appConfig.appUrl);
  }

  onError(error: any) {
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
    this.resourceUrl = this.appConfig.appUrl + '/' + route.snapshot.params['name'];
    if (this.resourceId) {
      this.resourceUrl += '/submission/' + this.resourceId;
    }
    this.formio = new Formio(this.resourceUrl);
    this.loadForm();
  }

  loadForm() {
    this.formFormio = new Formio(this.resourceUrl);
    this.loader.loading = true;
    this.formLoading = this.formFormio
      .loadForm()
      .then(
        (form: any) => {
          this.form = form;
          this.formResolve(form);
          this.loader.loading = false;
          return form;
        },
        (err: any) => this.onFormError(err)
      )
      .catch((err: any) => this.onFormError(err));
    return this.formLoading;
  }

  onSubmissionError(err: any) {
    this.onError(err);
  }

  loadResource(route: ActivatedRoute) {
    this.setContext(route);
    this.loader.loading = true;
    this.resourceLoading = this.resourceLoaded = this.formio
      .loadSubmission(null, {ignoreCache: true})
      .then(
        (resource: any) => {
          this.resource = resource;
          this.loader.loading = false;
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
