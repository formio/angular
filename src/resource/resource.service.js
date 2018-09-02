"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var native_promise_only_1 = require("native-promise-only");
var formiojs_1 = require("formiojs");
var utils_1 = require("formiojs/utils");
var FormioResourceService = /** @class */ (function () {
    function FormioResourceService(appConfig, config, loader, resourcesService) {
        this.appConfig = appConfig;
        this.config = config;
        this.loader = loader;
        this.resourcesService = resourcesService;
        this.onParents = new core_1.EventEmitter();
        this.onIndexSelect = new core_1.EventEmitter();
        this.refresh = new core_1.EventEmitter();
        this.formLoaded = new native_promise_only_1.default(function () { });
        this.resources = {};
        if (this.appConfig && this.appConfig.appUrl) {
            formiojs_1.Formio.setBaseUrl(this.appConfig.apiUrl);
            formiojs_1.Formio.setProjectUrl(this.appConfig.appUrl);
            formiojs_1.Formio.formOnly = this.appConfig.formOnly;
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        // Create the form url and load the resources.
        this.formUrl = this.appConfig.appUrl + '/' + this.config.form;
        this.initialize();
    }
    FormioResourceService.prototype.initialize = function () {
        var _this = this;
        this.onParents = new core_1.EventEmitter();
        this.onIndexSelect = new core_1.EventEmitter();
        this.refresh = new core_1.EventEmitter();
        this.resource = { data: {} };
        this.resourceLoaded = new native_promise_only_1.default(function (resolve, reject) {
            _this.resourceResolve = resolve;
            _this.resourceReject = reject;
        });
        this.formLoaded = new native_promise_only_1.default(function (resolve, reject) {
            _this.formResolve = resolve;
            _this.formReject = reject;
        });
        // Add this resource service to the list of all resources in context.
        if (this.resourcesService) {
            this.resourcesService.resources[this.config.name] = this;
            this.resources = this.resourcesService.resources;
        }
        this.loadForm();
        this.setParents();
    };
    FormioResourceService.prototype.onError = function (error) {
        if (this.resourcesService) {
            this.resourcesService.error.emit(error);
        }
        throw error;
    };
    FormioResourceService.prototype.onFormError = function (err) {
        this.formReject(err);
        this.onError(err);
    };
    FormioResourceService.prototype.loadForm = function () {
        var _this = this;
        this.formFormio = new formiojs_1.Formio(this.formUrl);
        this.loader.loading = true;
        this.formLoading = this.formFormio
            .loadForm()
            .then(function (form) {
            _this.form = form;
            _this.formResolve(form);
            _this.loader.loading = false;
            return form;
        }, function (err) { return _this.onFormError(err); })
            .catch(function (err) { return _this.onFormError(err); });
        return this.formLoading;
    };
    FormioResourceService.prototype.setParents = function () {
        var _this = this;
        if (!this.config.parents || !this.config.parents.length) {
            return;
        }
        if (!this.resourcesService) {
            console.warn('You must provide the FormioResources within your application to use nested resources.');
            return;
        }
        // Iterate through the list of parents.
        var parentsLoaded = [];
        this.config.parents.forEach(function (parent) {
            // See if this parent is already in context.
            if (_this.resources.hasOwnProperty(parent)) {
                parentsLoaded.push(_this.resources[parent].resourceLoaded.then(function (resource) {
                    // Make sure we hide the component that is the parent.
                    _this.formLoaded.then(function (form) {
                        var component = utils_1.default.getComponent(form.components, parent);
                        if (component) {
                            component.hidden = true;
                            _this.refresh.emit({
                                property: 'form',
                                value: form
                            });
                        }
                    });
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
                }));
            }
        });
        // When all the parents have loaded, emit that to the onParents emitter.
        native_promise_only_1.default.all(parentsLoaded).then(function (parents) {
            return _this.onParents.emit(parents);
        });
    };
    FormioResourceService.prototype.onSubmissionError = function (err) {
        this.resourceReject(err);
        this.onError(err);
    };
    FormioResourceService.prototype.loadResource = function (route) {
        var _this = this;
        this.resourceId = route.snapshot.params['id'];
        this.resource = { data: {} };
        this.resourceUrl = this.appConfig.appUrl + '/' + this.config.form;
        this.resourceUrl += '/submission/' + this.resourceId;
        this.formio = new formiojs_1.Formio(this.resourceUrl);
        this.loader.loading = true;
        this.resourceLoading = this.formio
            .loadSubmission()
            .then(function (resource) {
            _this.resource = resource;
            _this.resourceResolve(resource);
            _this.loader.loading = false;
            _this.refresh.emit({
                property: 'submission',
                value: _this.resource
            });
            return resource;
        }, function (err) { return _this.onSubmissionError(err); })
            .catch(function (err) { return _this.onSubmissionError(err); });
        return this.resourceLoading;
    };
    FormioResourceService.prototype.save = function (resource) {
        var _this = this;
        var formio = resource._id ? this.formio : this.formFormio;
        return formio
            .saveSubmission(resource)
            .then(function (saved) {
            _this.resource = saved;
            return saved;
        }, function (err) { return _this.onError(err); })
            .catch(function (err) { return _this.onError(err); });
    };
    FormioResourceService.prototype.remove = function () {
        var _this = this;
        return this.formio
            .deleteSubmission()
            .then(function () {
            _this.resource = null;
        }, function (err) { return _this.onError(err); })
            .catch(function (err) { return _this.onError(err); });
    };
    FormioResourceService = __decorate([
        core_1.Injectable(),
        __param(3, core_1.Optional())
    ], FormioResourceService);
    return FormioResourceService;
}());
exports.FormioResourceService = FormioResourceService;
