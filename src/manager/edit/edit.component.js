"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var formbuilder_component_1 = require("../../components/formbuilder/formbuilder.component");
var lodash_1 = require("lodash");
var FormManagerEditComponent = /** @class */ (function () {
    function FormManagerEditComponent(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.form = { components: [] };
        this.formReady = false;
        this.loading = false;
    }
    FormManagerEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.route.url.subscribe(function (url) {
            // See if we are editing a form or creating one.
            if (url[0].path === 'edit') {
                _this.loading = true;
                _this.formReady = _this.service.formio.loadForm().then(function (form) {
                    _this.form = form;
                    _this.builder.buildForm(form);
                    _this.loading = false;
                    _this.formTitle.nativeElement.value = form.title;
                    _this.formType.nativeElement.value = form.display || 'form';
                });
            }
            _this.formType.nativeElement.addEventListener('change', function () {
                _this.builder.setDisplay(_this.formType.nativeElement.value);
            });
        });
    };
    FormManagerEditComponent.prototype.onSave = function () {
        var _this = this;
        this.loading = true;
        this.form.title = this.formTitle.nativeElement.value;
        this.form.display = this.formType.nativeElement.value;
        this.form.components = this.builder.formio.schema.components;
        if (!this.form._id) {
            this.form.name = lodash_1.default.camelCase(this.form.title).toLowerCase();
            this.form.path = this.form.name;
        }
        this.service.formio.saveForm(this.form).then(function (form) {
            _this.form = form;
            _this.loading = false;
            _this.router.navigate(['../', form._id, 'view'], { relativeTo: _this.route });
        });
    };
    __decorate([
        core_1.ViewChild(formbuilder_component_1.FormBuilderComponent)
    ], FormManagerEditComponent.prototype, "builder", void 0);
    __decorate([
        core_1.ViewChild('title')
    ], FormManagerEditComponent.prototype, "formTitle", void 0);
    __decorate([
        core_1.ViewChild('type')
    ], FormManagerEditComponent.prototype, "formType", void 0);
    FormManagerEditComponent = __decorate([
        core_1.Component({
            templateUrl: './edit.component.html'
        })
    ], FormManagerEditComponent);
    return FormManagerEditComponent;
}());
exports.FormManagerEditComponent = FormManagerEditComponent;
