import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { FormioComponent } from './formio.component';
import { FormioElement } from './formio-element.component';
import { FormioComponentComponent } from './formio-component.component';
import { FormioComponentsComponent } from './formio-components.component';
import { FormioErrors } from './formio.errors';
import { RegisterComponents } from './components/index';
import { FormioTemplate, RegisterTemplate } from './formio.template';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormioComponent,
        FormioElement,
        FormioComponentComponent,
        FormioComponentsComponent,
        FormioErrors
    ],
    exports: [
        FormioComponent,
        FormioComponentComponent,
        FormioComponentsComponent
    ]
})
export class FormioModule {
    public static setTemplate(template: FormioTemplate) {
        RegisterTemplate(FormioComponent, template.formio, template.styles);
        RegisterTemplate(FormioComponentComponent, template.formio_component);
        RegisterTemplate(FormioComponentsComponent, template.formio_components);
        RegisterTemplate(FormioErrors, template.errors);
        RegisterComponents(template);
    }
}

