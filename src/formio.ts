import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { FormioComponent } from './formio.component';
import { FormioElement } from './formio-element.component';
import { FormioComponentComponent } from './formio-component.component';
import { FormioComponentsComponent } from './formio-components.component';
import { FormioErrors } from './formio.errors';
import { FormioAlerts } from './formio.alerts';
import { FormioEvents } from './formio.events';
import { RegisterComponents } from './components/index';
import { FormioTemplate, RegisterTemplate } from './formio.template';
import { DatepickerModule, TimepickerModule } from 'ng2-bootstrap';
import { FormioWizardComponent } from './formio.wizard';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DatepickerModule.forRoot(),
        TimepickerModule.forRoot()
    ],
    declarations: [
        FormioWizardComponent,
        FormioComponent,
        FormioElement,
        FormioComponentComponent,
        FormioComponentsComponent,
        FormioErrors,
        FormioAlerts
    ],
    exports: [
        FormioComponent,
        FormioWizardComponent,
        FormioComponentComponent,
        FormioComponentsComponent
    ]
})
export class FormioBaseModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FormioBaseModule,
            providers: [FormioEvents]
        };
    }
    public static setTemplate(template: FormioTemplate) {
        RegisterTemplate(FormioComponent, template.formio);
        RegisterTemplate(FormioComponentComponent, template.formio_component);
        RegisterTemplate(FormioWizardComponent, template.formio_wizard);
        RegisterTemplate(FormioComponentsComponent, template.formio_components);
        RegisterTemplate(FormioErrors, template.errors);
        RegisterTemplate(FormioAlerts, template.alerts);
        RegisterComponents(template);
    }
}

