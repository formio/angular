import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { FormioComponent } from './formio.component';
import { FormioElement } from './formio-element.component';
import { FormioComponentComponent } from './formio-component.component';
import { FormioComponentsComponent } from './formio-components.component';
import { FormioErrors } from './formio.errors';
import { RegisterComponents } from './components/index';
import { FormioTemplate, RegisterTemplate } from './formio.template';

/**
 * The core engine for the Form.io renderer.
 *
 * @param template
 *   The template you wish to attach to the renderer.
 * @returns {Formio|FormioComponent|any[]}
 * @constructor
 */
export function FORMIO(template: FormioTemplate) {
    RegisterTemplate(FormioComponent, template.formio, template.styles);
    RegisterTemplate(FormioComponentComponent, template.formio_component);
    RegisterTemplate(FormioComponentsComponent, template.formio_components);
    RegisterTemplate(FormioErrors, template.errors);
    RegisterComponents(template);
    return {
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
    };
}

