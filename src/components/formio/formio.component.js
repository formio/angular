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
var formio_service_1 = require("../../formio.service");
var formio_alerts_1 = require("../alerts/formio.alerts");
var lodash_1 = require("lodash");
var formiojs_1 = require("formiojs");
/* tslint:disable */
var FormioComponent = /** @class */ (function () {
    function FormioComponent(loader, config) {
        var _this = this;
        this.loader = loader;
        this.config = config;
        this.submission = {};
        this.readOnly = false;
        this.viewOnly = false;
        this.hooks = {};
        if (this.config) {
            formiojs_1.Formio.setBaseUrl(this.config.apiUrl);
            formiojs_1.Formio.setProjectUrl(this.config.appUrl);
        }
        else {
            console.warn('You must provide an AppConfig within your application!');
        }
        this.ready = new Promise(function (resolve) {
            _this.readyResolve = resolve;
        });
        this.submitting = false;
        this.alerts = new formio_alerts_1.FormioAlerts();
        this.beforeSubmit = new core_1.EventEmitter();
        this.prevPage = new core_1.EventEmitter();
        this.nextPage = new core_1.EventEmitter();
        this.submit = new core_1.EventEmitter();
        this.errorChange = new core_1.EventEmitter();
        this.invalid = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this.customEvent = new core_1.EventEmitter();
        this.render = new core_1.EventEmitter();
        this.formLoad = new core_1.EventEmitter();
        this.initialized = false;
        this.alerts.alerts = [];
    }
    FormioComponent.prototype.setForm = function (form) {
        var _this = this;
        this.form = form;
        // Only initialize a single formio instance.
        if (this.formio) {
            this.formio.form = this.form;
            return;
        }
        // Create the form.
        return formiojs_1.Formio.createForm(this.formioElement ? this.formioElement.nativeElement : null, this.form, {
            icons: this.config ? this.config.icons : '',
            noAlerts: lodash_1.get(this.options, 'noAlerts', true),
            readOnly: this.readOnly,
            viewAsHtml: this.viewOnly,
            i18n: lodash_1.get(this.options, 'i18n', null),
            fileService: lodash_1.get(this.options, 'fileService', null),
            hooks: this.hooks
        }).then(function (formio) {
            _this.formio = formio;
            if (_this.url) {
                _this.formio.url = _this.url;
            }
            if (_this.src) {
                _this.formio.url = _this.src;
            }
            _this.formio.nosubmit = true;
            _this.formio.on('prevPage', function (data) { return _this.onPrevPage(data); });
            _this.formio.on('nextPage', function (data) { return _this.onNextPage(data); });
            _this.formio.on('change', function (value) { return _this.change.emit(value); });
            _this.formio.on('customEvent', function (event) {
                return _this.customEvent.emit(event);
            });
            _this.formio.on('submit', function (submission) {
                return _this.submitForm(submission);
            });
            _this.formio.on('error', function (err) { return _this.onError(err); });
            _this.formio.on('render', function () { return _this.render.emit(); });
            _this.formio.on('formLoad', function (loadedForm) {
                return _this.formLoad.emit(loadedForm);
            });
            _this.loader.loading = false;
            _this.readyResolve(_this.formio);
            return _this.formio;
        });
    };
    FormioComponent.prototype.initialize = function () {
        if (this.initialized) {
            return;
        }
        this.options = Object.assign({
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
        }, this.options);
        this.initialized = true;
    };
    FormioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initialize();
        if (this.language) {
            this.language.subscribe(function (lang) {
                _this.formio.language = lang;
            });
        }
        if (this.refresh) {
            this.refresh.subscribe(function (refresh) {
                return _this.onRefresh(refresh);
            });
        }
        if (this.error) {
            this.error.subscribe(function (err) { return _this.onError(err); });
        }
        if (this.success) {
            this.success.subscribe(function (message) {
                _this.alerts.setAlert({
                    type: 'success',
                    message: message || lodash_1.get(_this.options, 'alerts.submitMessage')
                });
            });
        }
        if (this.src) {
            if (!this.service) {
                this.service = new formio_service_1.FormioService(this.src);
            }
            this.loader.loading = true;
            this.service.loadForm({ params: { live: 1 } }).subscribe(function (form) {
                if (form && form.components) {
                    _this.setForm(form);
                }
                // if a submission is also provided.
                if (lodash_1.isEmpty(_this.submission) &&
                    _this.service &&
                    _this.service.formio.submissionId) {
                    _this.service.loadSubmission().subscribe(function (submission) {
                        if (_this.readOnly) {
                            _this.formio.options.readOnly = true;
                        }
                        _this.submission = _this.formio.submission = submission;
                    }, function (err) { return _this.onError(err); });
                }
            }, function (err) { return _this.onError(err); });
        }
        if (this.url && !this.service) {
            this.service = new formio_service_1.FormioService(this.url);
        }
    };
    FormioComponent.prototype.onRefresh = function (refresh) {
        var _this = this;
        this.ready.then(function () {
            switch (refresh.property) {
                case 'submission':
                    _this.formio.submission = refresh.value;
                    break;
                case 'form':
                    _this.formio.form = refresh.value;
                    break;
            }
        });
    };
    FormioComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.initialize();
        if (changes.form && changes.form.currentValue) {
            this.setForm(changes.form.currentValue);
        }
        this.ready.then(function () {
            if (changes.submission && changes.submission.currentValue) {
                _this.formio.submission = changes.submission.currentValue;
            }
            if (changes.hideComponents) {
                _this.formio.hideComponents(changes.hideComponents.currentValue);
            }
        });
    };
    FormioComponent.prototype.onPrevPage = function (data) {
        this.alerts.setAlerts([]);
        this.prevPage.emit(data);
    };
    FormioComponent.prototype.onNextPage = function (data) {
        this.alerts.setAlerts([]);
        this.nextPage.emit(data);
    };
    FormioComponent.prototype.onSubmit = function (submission, saved) {
        this.submitting = false;
        if (saved) {
            this.formio.emit('submitDone', submission);
        }
        this.submit.emit(submission);
        if (!this.success) {
            this.alerts.setAlert({
                type: 'success',
                message: lodash_1.get(this.options, 'alerts.submitMessage')
            });
        }
    };
    FormioComponent.prototype.onError = function (err) {
        var _this = this;
        this.alerts.setAlerts([]);
        this.submitting = false;
        if (!err) {
            return;
        }
        // Make sure it is an array.
        err = err instanceof Array ? err : [err];
        // Emit these errors again.
        this.errorChange.emit(err);
        // Iterate through each one and set the alerts array.
        lodash_1.each(err, function (error) {
            _this.alerts.addAlert({
                type: 'danger',
                message: error.message || error.toString()
            });
        });
    };
    FormioComponent.prototype.submitExecute = function (submission) {
        var _this = this;
        if (this.service && !this.url) {
            this.service
                .saveSubmission(submission)
                .subscribe(function (sub) { return _this.onSubmit(sub, true); }, function (err) { return _this.onError(err); });
        }
        else {
            this.onSubmit(submission, false);
        }
    };
    FormioComponent.prototype.submitForm = function (submission) {
        var _this = this;
        // Keep double submits from occurring...
        if (this.submitting) {
            return;
        }
        this.submitting = true;
        this.beforeSubmit.emit(submission);
        // if they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        var beforeSubmit = lodash_1.get(this.options, 'hooks.beforeSubmit');
        if (beforeSubmit) {
            beforeSubmit(submission, function (err, sub) {
                if (err) {
                    _this.onError(err);
                    return;
                }
                _this.submitExecute(sub);
            });
        }
        else {
            this.submitExecute(submission);
        }
    };
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "submission", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "src", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "url", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "readOnly", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "viewOnly", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "hideComponents", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "refresh", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "error", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "success", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "language", void 0);
    __decorate([
        core_1.Input()
    ], FormioComponent.prototype, "hooks", void 0);
    __decorate([
        core_1.Output()
    ], FormioComponent.prototype, "render", void 0);
    __decorate([
        core_1.Output()
    ], FormioComponent.prototype, "customEvent", void 0);
    __decorate([
        core_1.Output()
    ], FormioComponent.prototype, "submit", void 0);
    __decorate([
        core_1.Output()
    ], FormioComponent.prototype, "prevPage", void 0);
    __decorate([
        core_1.Output()
    ], FormioComponent.prototype, "nextPage", void 0);
    __decorate([
        core_1.Output()
    ], FormioComponent.prototype, "beforeSubmit", void 0);
    __decorate([
        core_1.Output()
    ], FormioComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output()
    ], FormioComponent.prototype, "invalid", void 0);
    __decorate([
        core_1.Output()
    ], FormioComponent.prototype, "errorChange", void 0);
    __decorate([
        core_1.Output()
    ], FormioComponent.prototype, "formLoad", void 0);
    __decorate([
        core_1.ViewChild('formio')
    ], FormioComponent.prototype, "formioElement", void 0);
    FormioComponent = __decorate([
        core_1.Component({
            selector: 'formio',
            templateUrl: './formio.component.html',
            styleUrls: ['./formio.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
        /* tslint:enable */
        ,
        __param(1, core_1.Optional())
    ], FormioComponent);
    return FormioComponent;
}());
exports.FormioComponent = FormioComponent;
