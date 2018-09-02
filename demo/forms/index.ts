import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioModule } from '../../dist';
import { BuilderComponent } from './builder';
import { SimpleFormComponent } from './simple';
import { WizardFormComponent } from './wizard';
import { PDFFormComponent } from './pdf';
import { LanguageFormComponent } from './language';
import { FormioFormsComponent } from './forms.component';
import { FormRendererComponent } from './renderer/renderer';

export const FormRoutes: any = [
  {
    path: '',
    component: FormioFormsComponent,
    children: [
      {
        path: '',
        redirectTo: 'renderer',
        pathMatch: 'full'
      },
      {
        path: 'renderer',
        title: 'Form Renderer',
        component: FormRendererComponent
      },
      {
        path: 'builder',
        title: 'Form Builder',
        component: BuilderComponent
      },
      {
        path: 'simple',
        title: 'Simple Form',
        component: SimpleFormComponent
      },
      {
        path: 'wizard',
        title: 'Wizard Form',
        component: WizardFormComponent
      },
      {
        path: 'pdf',
        title: 'PDF Form',
        component: PDFFormComponent
      },
      {
        path: 'language',
        title: 'Multi-Language',
        component: LanguageFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, FormioModule, RouterModule.forChild(FormRoutes)],
  declarations: [
    FormioFormsComponent,
    SimpleFormComponent,
    BuilderComponent,
    WizardFormComponent,
    LanguageFormComponent,
    FormRendererComponent,
    PDFFormComponent
  ],
  bootstrap: [FormioFormsComponent]
})
export class FormioFormsModule {}
