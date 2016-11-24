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
import { FormioWizardComponent } from './formio.wizard';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormioWizardComponent,
        FormioComponent,
        FormioElement,
        FormioComponentComponent,
        FormioComponentsComponent,
        FormioErrors
    ],
    exports: [
        FormioComponent,
        FormioWizardComponent,
        FormioComponentComponent,
        FormioComponentsComponent
    ]
})
export class FormioBaseModule {
    public static setTemplate(template: FormioTemplate) {
        RegisterTemplate(FormioComponent, template.formio);
        RegisterTemplate(FormioComponentComponent, template.formio_component);
        RegisterTemplate(FormioWizardComponent, template.formio_wizard);
        RegisterTemplate(FormioComponentsComponent, template.formio_components);
        RegisterTemplate(FormioErrors, template.errors);
        RegisterComponents(template);
    }
}

