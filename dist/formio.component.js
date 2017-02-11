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
require('core-js/es7/reflect');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var formio_service_1 = require('./formio.service');
var formio_common_1 = require('./formio.common');
var formio_events_1 = require('./formio.events');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
/**
 * The <formio> component.
 */
var FormioComponent = (function () {
    function FormioComponent(events) {
        this.events = events;
        this.formGroup = new forms_1.FormGroup({});
        this.ready = new BehaviorSubject_1.BehaviorSubject(false);
        this.form = null;
        this.submission = {};
        this.readOnly = false;
        this.beforeSubmit = this.events.onBeforeSubmit;
        this.submit = this.events.onSubmit;
        this.change = this.events.onChange;
        this.render = this.events.onRender;
        this.invalid = this.events.onInvalid;
        this.error = this.events.onError;
    }
    FormioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = Object.assign({
            errors: {
                message: 'Please fix the following errors before submitting.'
            },
            alerts: {
                submitMessage: 'Submission Complete.'
            },
            hooks: {
                beforeSubmit: null
            }
        }, this.options);
        if (this.form) {
            this.ready.next(true);
        }
        else if (this.src && !this.service) {
            this.service = new formio_service_1.FormioService(this.src);
            this.service.loadForm().subscribe(function (form) {
                if (form && form.components) {
                    _this.form = form;
                    _this.ready.next(true);
                }
                // If a submission is also provided.
                if (_this.service.formio.submissionId) {
                    _this.service.loadSubmission().subscribe(function (submission) {
                        _this.submission = submission;
                        _this.formGroup.patchValue(submission.data);
                        _this.formGroup.disable();
                    }, function (err) { return _this.onError(err); });
                }
            }, function (err) { return _this.onError(err); });
        }
        // Subscribe to value changes.
        //noinspection TypeScriptUnresolvedFunction
        this.formGroup.valueChanges
            .debounceTime(100)
            .subscribe(function (value) {
            _this.events.onChange.emit(value);
        });
        // If this is a read only form, then disable the formGroup.
        if (this.readOnly) {
            this.formGroup.disable();
        }
    };
    FormioComponent.prototype.onRender = function () {
        this.events.onRender.emit(true);
    };
    FormioComponent.prototype.onError = function (err) {
        var error = new formio_common_1.FormioError(err);
        this.events.onError.emit(err);
        this.events.errors.push(error);
    };
    FormioComponent.prototype.submitForm = function (submission) {
        var _this = this;
        if (this.service) {
            this.service.saveSubmission(submission).subscribe(function (sub) {
                _this.events.onSubmit.emit(sub);
                _this.events.alerts.push({
                    type: 'success',
                    message: _this.options.alerts.submitMessage
                });
            }, function (err) { return _this.onError(err); });
        }
        else {
            this.events.onSubmit.emit(submission);
            this.events.alerts.push({
                type: 'success',
                message: this.options.alerts.submitMessage
            });
        }
    };
    FormioComponent.prototype.onSubmit = function ($event) {
        var _this = this;
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        // Reset the errors and alerts.
        this.events.errors = [];
        this.events.alerts = [];
        // Check if the form is valid.
        if (!this.formGroup.valid) {
            this.formGroup.markAsDirty(true);
            this.events.onInvalid.emit(true);
            return;
        }
        var submission = { data: this.formGroup.value };
        this.events.onBeforeSubmit.emit(submission);
        // If they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        if (this.options.hooks.beforeSubmit) {
            this.options.hooks.beforeSubmit(submission, function (err, sub) {
                if (err) {
                    _this.onError(err);
                    return;
                }
                _this.submitForm(sub);
            });
        }
        else {
            this.submitForm(submission);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioComponent.prototype, "submission", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormioComponent.prototype, "src", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', formio_service_1.FormioService)
    ], FormioComponent.prototype, "service", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FormioComponent.prototype, "readOnly", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormioComponent.prototype, "render", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormioComponent.prototype, "submit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormioComponent.prototype, "beforeSubmit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormioComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormioComponent.prototype, "invalid", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormioComponent.prototype, "error", void 0);
    FormioComponent = __decorate([
        core_1.Component({
            selector: 'formio',
            template: '<div></div>'
        }), 
        __metadata('design:paramtypes', [formio_events_1.FormioEvents])
    ], FormioComponent);
    return FormioComponent;
}());
exports.FormioComponent = FormioComponent;
//# sourceMappingURL=formio.component.js.map