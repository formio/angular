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
var common_1 = require('@angular/common');
var forms_1 = require("@angular/forms");
var formio_component_1 = require('./formio.component');
var formio_element_component_1 = require('./formio-element.component');
var formio_component_component_1 = require('./formio-component.component');
var formio_components_component_1 = require('./formio-components.component');
var formio_errors_1 = require('./formio.errors');
var formio_alerts_1 = require('./formio.alerts');
var formio_events_1 = require('./formio.events');
var index_1 = require('./components/index');
var formio_template_1 = require('./formio.template');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var formio_wizard_1 = require('./formio.wizard');
var FormioBaseModule = (function () {
    function FormioBaseModule() {
    }
    FormioBaseModule.forRoot = function () {
        return {
            ngModule: FormioBaseModule,
            providers: [formio_events_1.FormioEvents]
        };
    };
    FormioBaseModule.setTemplate = function (template) {
        formio_template_1.RegisterTemplate(formio_component_1.FormioComponent, template.formio);
        formio_template_1.RegisterTemplate(formio_component_component_1.FormioComponentComponent, template.formio_component);
        formio_template_1.RegisterTemplate(formio_wizard_1.FormioWizardComponent, template.formio_wizard);
        formio_template_1.RegisterTemplate(formio_components_component_1.FormioComponentsComponent, template.formio_components);
        formio_template_1.RegisterTemplate(formio_errors_1.FormioErrors, template.errors);
        formio_template_1.RegisterTemplate(formio_alerts_1.FormioAlerts, template.alerts);
        index_1.RegisterComponents(template);
    };
    FormioBaseModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                ng2_bootstrap_1.DatepickerModule.forRoot(),
                ng2_bootstrap_1.TimepickerModule.forRoot()
            ],
            declarations: [
                formio_wizard_1.FormioWizardComponent,
                formio_component_1.FormioComponent,
                formio_element_component_1.FormioElement,
                formio_component_component_1.FormioComponentComponent,
                formio_components_component_1.FormioComponentsComponent,
                formio_errors_1.FormioErrors,
                formio_alerts_1.FormioAlerts
            ],
            exports: [
                formio_component_1.FormioComponent,
                formio_wizard_1.FormioWizardComponent,
                formio_component_component_1.FormioComponentComponent,
                formio_components_component_1.FormioComponentsComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FormioBaseModule);
    return FormioBaseModule;
}());
exports.FormioBaseModule = FormioBaseModule;
//# sourceMappingURL=formio.js.map