"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var resource_config_1 = require("./resource.config");
var index_1 = require("../../index");
var Promise = require('native-promise-only');
var Formio = require('formiojs');
var FormioResourceService = (function () {
    function FormioResourceService(appConfig, config, loader, resourcesService) {
        var _this = this;
        this.appConfig = appConfig;
        this.config = config;
        this.loader = loader;
        this.resourcesService = resourcesService;
        // Allow them to provide different app config per instance.
        if (this.config.app) {
            this.appConfig = this.config.app;
        }
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setAppUrl(this.appConfig.appUrl);
            Formio.formOnly = !!this.appConfig.formOnly;
        }
        else {
            console.warn('You must provide an AppConfig within your application!');
        }
        // Add this resource service to the list of all resources in context.
        if (this.resourcesService) {
            this.resourcesService.resources[this.config.name] = this;
            this.resources = this.resourcesService.resources;
        }
        // Create the form url and load the resources.
        this.formUrl = this.appConfig.appUrl + '/' + this.config.form;
        this.onParents = new core_1.EventEmitter();
        this.onIndexSelect = new core_1.EventEmitter();
        this.refresh = new core_1.EventEmitter();
        this.resource = { data: {} };
        this.resourceLoaded = new Promise(function (resolve, reject) {
            _this.resourceResolve = resolve;
            _this.resourceReject = reject;
        });
        this.formLoaded = new Promise(function (resolve, reject) {
            _this.formResolve = resolve;
            _this.formReject = reject;
        });
        this.loadForm();
        this.setParents();
    }
    FormioResourceService.prototype.onError = function (error) {
        if (this.resourcesService) {
            this.resourcesService.error.emit(error);
        }
    };
    FormioResourceService.prototype.onFormError = function (err) {
        this.formReject(err);
        this.onError(err);
    };
    FormioResourceService.prototype.loadForm = function () {
        var _this = this;
        if (this.formLoading) {
            return this.formLoading;
        }
        this.formFormio = (new Formio(this.formUrl));
        this.loader.loading = true;
        this.formLoading = this.formFormio.loadForm().then(function (form) {
            _this.form = form;
            _this.formResolve(form);
            _this.loader.loading = false;
            return form;
        }, function (err) { return _this.onFormError(err); }).catch(function (err) { return _this.onFormError(err); });
        return this.formLoading;
    };
    FormioResourceService.prototype.setParents = function () {
        var _this = this;
        if (!this.config.parents || !this.config.parents.length) {
            return;
        }
        if (!this.resourcesService) {
            console.warn('You must provide the FormioResourceRegistry within your application to use nested resources.');
            return;
        }
        // Iterate through the list of parents.
        var parentsLoaded = [];
        this.config.parents.forEach(function (parent) {
            // See if this parent is already in context.
            if (_this.resources.hasOwnProperty(parent)) {
                parentsLoaded.push(_this.resources[parent].resourceLoaded.then(function (resource) {
                    if (!_this.resourceLoading) {
                        // Set the value of this parent in the submission data.
                        _this.resource.data[parent] = resource;
                        _this.refresh.emit({
                            property: 'submission',
                            value: _this.resource
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
        Promise.all(parentsLoaded).then(function (parents) { return _this.onParents.emit(parents); });
    };
    FormioResourceService.prototype.onSubmissionError = function (err) {
        this.resourceReject(err);
        this.onError(err);
    };
    FormioResourceService.prototype.loadResource = function (route) {
        var _this = this;
        if (this.resourceLoading) {
            return this.resourceLoading;
        }
        var id = route.snapshot.params['id'];
        this.resourceUrl = this.appConfig.appUrl + '/' + this.config.form;
        this.resourceUrl += '/submission/' + id;
        this.formio = (new Formio(this.resourceUrl));
        this.loader.loading = true;
        this.resourceLoading = this.formio.loadSubmission().then(function (resource) {
            _this.resource = resource;
            _this.resourceResolve(resource);
            _this.loader.loading = false;
            return resource;
        }, function (err) { return _this.onSubmissionError(err); }).catch(function (err) { return _this.onSubmissionError(err); });
        return this.resourceLoading;
    };
    FormioResourceService.prototype.save = function (resource) {
        var _this = this;
        var formio = resource._id ? this.formio : this.formFormio;
        this.loader.loading = true;
        return formio.saveSubmission(resource).then(function (resource) {
            _this.resource = resource;
            _this.loader.loading = false;
            return resource;
        }, function (err) { return _this.onError(err); }).catch(function (err) { return _this.onError(err); });
    };
    FormioResourceService.prototype.remove = function () {
        var _this = this;
        return this.formio.deleteSubmission().then(function () {
            _this.resource = null;
        }, function (err) { return _this.onError(err); }).catch(function (err) { return _this.onError(err); });
    };
    return FormioResourceService;
}());
FormioResourceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [index_1.FormioAppConfig,
        resource_config_1.FormioResourceConfig,
        index_1.FormioLoader,
        resource_config_1.FormioResources])
], FormioResourceService);
exports.FormioResourceService = FormioResourceService;
