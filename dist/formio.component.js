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
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
/**
 * The <formio> component.
 */
var FormioComponent = (function () {
    function FormioComponent() {
        this.formGroup = new forms_1.FormGroup({});
        this.events = new formio_common_1.FormioEvents();
        this.ready = new BehaviorSubject_1.BehaviorSubject(false);
        this.form = null;
        this.submission = {};
        this.render = new core_1.EventEmitter();
        this.submit = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
    }
    FormioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = Object.assign({
            errors: {
                message: 'Please fix the following errors before submitting.'
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
            });
        }
        // Subscribe to value changes.
        //noinspection TypeScriptUnresolvedFunction
        this.formGroup.valueChanges
            .debounceTime(100)
            .subscribe(function (value) {
            _this.change.emit(value);
            _this.events.component.emit('valueChanges');
        });
    };
    FormioComponent.prototype.onRender = function () {
        // The form is done rendering.
        this.render.emit(true);
    };
    FormioComponent.prototype.onSubmit = function ($event) {
        var _this = this;
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        // Reset the errors.
        this.events.errors = [];
        // Check if the form is valid.
        if (!this.formGroup.valid) {
            this.formGroup.markAsDirty(true);
            this.events.component.emit('invalid');
            return;
        }
        var submission = { data: this.formGroup.value };
        if (this.service) {
            this.service.saveSubmission(submission).subscribe(function (sub) {
                _this.submit.emit(sub);
            });
        }
        else {
            this.submit.emit(submission);
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
    ], FormioComponent.prototype, "change", void 0);
    FormioComponent = __decorate([
        core_1.Component({
            selector: 'formio',
            template: '<div></div>'
        }), 
        __metadata('design:paramtypes', [])
    ], FormioComponent);
    return FormioComponent;
}());
exports.FormioComponent = FormioComponent;
