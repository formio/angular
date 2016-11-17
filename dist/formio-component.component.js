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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var components_1 = require('./components/components');
var formio_common_1 = require('./formio.common');
var FormioUtils = require('formio-utils');
var FormioComponentComponent = (function () {
    function FormioComponentComponent() {
        this.show = true;
        this.components = [];
        this.container = new forms_1.FormArray([]);
        this.render = new core_1.EventEmitter();
    }
    FormioComponentComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Add the initial component.
        this.addComponent();
        if (this.data &&
            this.component.multiple &&
            this.data.hasOwnProperty(this.component.key) &&
            (this.data[this.component.key] instanceof Array) &&
            (this.data[this.component.key].length > 1)) {
            // Add other components if this is an array...
            for (var i = 1; i < this.data[this.component.key].length; i++) {
                this.addComponent();
            }
        }
        this.checkConditions();
        // Subscribe to the invalid event.
        if (this.events) {
            this.events.component.subscribe(function (type) {
                _this.components.forEach(function (component) {
                    switch (type) {
                        case 'invalid':
                            component.control.markAsDirty(true);
                            var errors = component.errors;
                            if (errors.length) {
                                _this.events.errors = _this.events.errors.concat(errors);
                            }
                            break;
                        case 'valueChanges':
                            _this.checkConditions();
                            break;
                    }
                });
            });
        }
    };
    FormioComponentComponent.prototype.getData = function (key) {
        if (this.data.hasOwnProperty(key)) {
            return this.data[key];
        }
        else {
            return {};
        }
    };
    FormioComponentComponent.prototype.checkConditions = function () {
        var subData = this.submission ? this.submission.value : {};
        var compData = Object.assign({}, subData, this.form.value);
        this.show = FormioUtils.checkCondition(this.component, compData);
    };
    FormioComponentComponent.prototype.addComponent = function () {
        var component = components_1.FormioComponents.createComponent(this.component.type, this.form, this.component, this.data);
        // Set the index.
        component.index = this.components.length;
        // Add the form controls.
        if (this.component.input && this.component.key) {
            var control = component.getControl();
            if (control) {
                if (this.component.multiple) {
                    this.container.push(control);
                    this.form.addControl(this.component.key, this.container);
                }
                else {
                    this.form.addControl(this.component.key, control);
                }
            }
        }
        // Add this to the instances.
        this.components.push(component);
        return component;
    };
    FormioComponentComponent.prototype.removeAt = function (index) {
        this.container.removeAt(index);
        this.components.splice(index, 1);
    };
    Object.defineProperty(FormioComponentComponent.prototype, "errors", {
        get: function () {
            if (!this.component.input) {
                return [];
            }
            if (!this.form.controls.hasOwnProperty(this.component.key)) {
                return [];
            }
            if (this.form.controls[this.component.key].pristine) {
                return [];
            }
            if (this.form.controls[this.component.key].valid) {
                return [];
            }
            var errors = [];
            this.components.forEach(function (component) {
                var compErrs = component.errors;
                compErrs.forEach(function (compError) {
                    errors.push(compError.message);
                });
            });
            return errors;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioComponentComponent.prototype, "component", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], FormioComponentComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioComponentComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], FormioComponentComponent.prototype, "submission", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', formio_common_1.FormioEvents)
    ], FormioComponentComponent.prototype, "events", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FormioComponentComponent.prototype, "label", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormioComponentComponent.prototype, "render", void 0);
    FormioComponentComponent = __decorate([
        core_1.Component({
            selector: 'formio-component',
            template: '<div></div>'
        }), 
        __metadata('design:paramtypes', [])
    ], FormioComponentComponent);
    return FormioComponentComponent;
}());
exports.FormioComponentComponent = FormioComponentComponent;
