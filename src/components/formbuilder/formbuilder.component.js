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
var formiojs_1 = require("formiojs");
/* tslint:disable */
var FormBuilderComponent = /** @class */ (function () {
    function FormBuilderComponent(config) {
        var _this = this;
        this.config = config;
        if (this.config) {
            formiojs_1.Formio.setBaseUrl(this.config.apiUrl);
            formiojs_1.Formio.setProjectUrl(this.config.appUrl);
        }
        else {
            console.warn('You must provide an AppConfig within your application!');
        }
        this.change = new core_1.EventEmitter();
        this.ready = new Promise(function (resolve) {
            _this.readyResolve = resolve;
        });
    }
    FormBuilderComponent.prototype.setDisplay = function (display) {
        return this.builder.setDisplay(display);
    };
    FormBuilderComponent.prototype.buildForm = function (form) {
        var _this = this;
        if (!form || !this.builderElement || !this.builderElement.nativeElement) {
            return;
        }
        if (this.builder) {
            return this.builder.instance.form = form;
        }
        this.builder = new formiojs_1.Formio.FormBuilder(this.builderElement.nativeElement, form, this.options || {});
        this.builder.render().then(function (instance) {
            _this.formio = instance;
            instance.on('saveComponent', function () { return _this.change.emit({
                type: 'saveComponent',
                form: instance.schema
            }); });
            instance.on('updateComponent', function () { return _this.change.emit({
                type: 'updateComponent',
                form: instance.schema
            }); });
            instance.on('deleteComponent', function () { return _this.change.emit({
                type: 'deleteComponent',
                form: instance.schema
            }); });
            _this.readyResolve(instance);
            return instance;
        });
    };
    FormBuilderComponent.prototype.ngOnChanges = function (changes) {
        if (changes.form && changes.form.currentValue) {
            this.buildForm(changes.form.currentValue || { components: [] });
        }
    };
    FormBuilderComponent.prototype.ngAfterViewInit = function () {
        this.buildForm(this.form);
    };
    __decorate([
        core_1.Input()
    ], FormBuilderComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input()
    ], FormBuilderComponent.prototype, "options", void 0);
    __decorate([
        core_1.Output()
    ], FormBuilderComponent.prototype, "change", void 0);
    __decorate([
        core_1.ViewChild('builder')
    ], FormBuilderComponent.prototype, "builderElement", void 0);
    FormBuilderComponent = __decorate([
        core_1.Component({
            selector: 'form-builder',
            templateUrl: './formbuilder.component.html',
            styleUrls: ['./formbuilder.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
        /* tslint:enable */
        ,
        __param(0, core_1.Optional())
    ], FormBuilderComponent);
    return FormBuilderComponent;
}());
exports.FormBuilderComponent = FormBuilderComponent;
