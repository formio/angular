import { EventEmitter, Injectable, Optional }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioResourceConfig, FormioResources, FormioResourceMap } from './resource.config';
import { FormioLoader, FormioAppConfig } from '../../index';
import { FormioRefreshValue } from '../../formio.common';
let Promise = require('native-promise-only');
let Formio = require('formiojs');
let FormioUtils = require('formiojs/utils');

@Injectable()
export class FormioResourceService {
    public form: any;
    public resource: any;
    public resourceUrl: string;
    public formUrl: string;
    public formFormio: any;
    public formio: any;

    public onParents: EventEmitter<Array<Object>>;
    public onIndexSelect: EventEmitter<Object>;
    public refresh: EventEmitter<FormioRefreshValue>;

    public resourceLoading: Promise<any>;
    public resourceLoaded: Promise<any>;
    public resourceResolve: any;
    public resourceReject: any;
    public resourceId: string;

    public formLoading: Promise<any>;
    public formLoaded: Promise<any>;
    public formResolve: any;
    public formReject: any;
    public resources: FormioResourceMap;

    constructor(
        public appConfig: FormioAppConfig,
        public config: FormioResourceConfig,
        public loader: FormioLoader,
        @Optional() public resourcesService: FormioResources
    ) {
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setAppUrl(this.appConfig.appUrl);
            Formio.formOnly = this.appConfig.formOnly;
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }

        // Create the form url and load the resources.
        this.formUrl = this.appConfig.appUrl + '/' + this.config.form;
        this.initialize();
    }

    initialize() {
        this.onParents = new EventEmitter();
        this.onIndexSelect = new EventEmitter();
        this.refresh = new EventEmitter();
        this.resourceLoading = null;
        this.formLoading = null;
        this.resource = {data: {}};
        this.resourceLoaded = new Promise((resolve: any, reject: any) => {
            this.resourceResolve = resolve;
            this.resourceReject = reject;
        });
        this.formLoaded = new Promise((resolve: any, reject: any) => {
            this.formResolve = resolve;
            this.formReject = reject;
        });

        // Add this resource service to the list of all resources in context.
        if (this.resourcesService) {
            this.resourcesService.resources[this.config.name] = this;
            this.resources = this.resourcesService.resources;
        }

        this.loadForm();
        this.setParents();
    }

    onError(error: any) {
        if (this.resourcesService) {
            this.resourcesService.error.emit(error);
        }
    }

    onFormError(err: any) {
        this.formReject(err);
        this.onError(err);
    }

    loadForm() {
        if (this.formLoading) {
            return this.formLoading;
        }
        this.formFormio = (new Formio(this.formUrl));
        this.loader.loading = true;
        this.formLoading = this.formFormio.loadForm().then((form: any) => {
            this.form = form;
            this.formResolve(form);
            this.loader.loading = false;
            return form;
        }, (err: any) => this.onFormError(err)).catch((err: any) => this.onFormError(err));
        return this.formLoading;
    }

    setParents() {
        if (!this.config.parents || !this.config.parents.length) {
            return;
        }

        if (!this.resourcesService) {
            console.warn('You must provide the FormioResources within your application to use nested resources.');
            return;
        }

        // Iterate through the list of parents.
        let parentsLoaded: Array<Promise<any>> = [];
        this.config.parents.forEach((parent: string) => {
            // See if this parent is already in context.
            if (this.resources.hasOwnProperty(parent)) {
                parentsLoaded.push(this.resources[parent].resourceLoaded.then((resource: any) => {
                    // Make sure we hide the component that is the parent.
                    this.formLoaded.then((form) => {
                        let component = FormioUtils.getComponent(form.components, parent);
                        if (component) {
                            component.hidden = true;
                            this.refresh.emit({
                                property: 'form',
                                value: form
                            });
                        }
                    });

                    if (!this.resourceLoading) {
                        // Set the value of this parent in the submission data.
                        this.resource.data[parent] = resource;
                        this.refresh.emit({
                            property: 'submission',
                            value: this.resource
                        });

                        return {
                            name: parent,
                            resource: resource
                        };
                    }
                    return null;
                }));
            }
        });

        // When all the parents have loaded, emit that to the onParents emitter.
        Promise.all(parentsLoaded).then((parents: any) => this.onParents.emit(parents));
    }

    onSubmissionError(err: any) {
        this.resourceReject(err);
        this.onError(err);
    }

    loadResource(route: ActivatedRoute) {
        if (route.snapshot.params['id'] !== this.resourceId) {
            this.resourceLoading = null;
        }

        if (this.resourceLoading) {
            return this.resourceLoading;
        }
        this.resourceId = route.snapshot.params['id'];
        this.resource = {data: {}};
        this.resourceUrl = this.appConfig.appUrl + '/' + this.config.form;
        this.resourceUrl += '/submission/' + this.resourceId;
        this.formio = (new Formio(this.resourceUrl));
        this.loader.loading = true;
        this.resourceLoading = this.formio.loadSubmission().then((resource: any) => {
            this.resource = resource;
            this.resourceResolve(resource);
            this.loader.loading = false;
            return resource;
        }, (err: any) => this.onSubmissionError(err)).catch((err: any) => this.onSubmissionError(err));
        return this.resourceLoading;
    }

    save(resource:any) {
        let formio = resource._id ? this.formio : this.formFormio;
        return formio.saveSubmission(resource).then((resource: any) => {
            this.resource = resource;
            return resource;
        }, (err: any) => this.onError(err)).catch((err: any) => this.onError(err));
    }

    remove() {
        return this.formio.deleteSubmission().then(() => {
           this.resource = null;
        }, (err: any) => this.onError(err)).catch((err: any) => this.onError(err));
    }
}
