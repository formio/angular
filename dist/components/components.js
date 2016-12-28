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
var formio_1 = require('../formio');
var find = require('lodash/find');
var cloneDeep = require('lodash/cloneDeep');
var FormioComponents = (function () {
    function FormioComponents() {
    }
    FormioComponents.register = function (name, component, element, template) {
        var compTemplate = cloneDeep(template);
        compTemplate.module = compTemplate.module || {};
        compTemplate.component.selector = compTemplate.component.selector || 'formio-' + name;
        compTemplate.component.inputs = compTemplate.component.inputs || ['component', 'form'];
        var decoratedCmp = core_1.Component(compTemplate.component)(element);
        if (!compTemplate.module.declarations) {
            compTemplate.module.declarations = [];
        }
        compTemplate.module.declarations.push(decoratedCmp);
        if (!compTemplate.module.imports) {
            compTemplate.module.imports = [];
        }
        compTemplate.module.imports.push(common_1.CommonModule);
        compTemplate.module.imports.push(forms_1.ReactiveFormsModule);
        compTemplate.module.imports.push(formio_1.FormioBaseModule);
        var DynamicComponentModule = (function () {
            function DynamicComponentModule() {
            }
            DynamicComponentModule = __decorate([
                core_1.NgModule(compTemplate.module), 
                __metadata('design:paramtypes', [])
            ], DynamicComponentModule);
            return DynamicComponentModule;
        }());
        FormioComponents.components[name] = {
            component: component,
            element: element,
            metadata: compTemplate.component,
            module: DynamicComponentModule,
            factory: null
        };
    };
    FormioComponents.createComponent = function (name, form, component, data) {
        if (!FormioComponents.components.hasOwnProperty(name)) {
            name = 'custom';
        }
        var comp = FormioComponents.components[name];
        return new comp.component(form, component, data);
    };
    FormioComponents.element = function (name, compiler) {
        if (!FormioComponents.components.hasOwnProperty(name)) {
            name = 'custom';
        }
        if (FormioComponents.components[name].factoryPromise) {
            return FormioComponents.components[name].factoryPromise;
        }
        FormioComponents.components[name].factoryPromise = compiler.compileModuleAndAllComponentsAsync(FormioComponents.components[name].module)
            .then(function (moduleWithFactories) {
            var factory = find(moduleWithFactories.componentFactories, { selector: 'formio-' + name });
            return factory;
        });
        return FormioComponents.components[name].factoryPromise;
    };
    FormioComponents.components = {};
    return FormioComponents;
}());
exports.FormioComponents = FormioComponents;
