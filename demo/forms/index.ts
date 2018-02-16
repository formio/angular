import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioModule } from '../../dist';
import { SimpleFormComponent } from './simple';
import { WizardFormComponent } from './wizard';
import { PDFFormComponent } from './pdf';
import { KitchenSinkFormComponent } from './kitchen';
import { LanguageFormComponent } from './language';
import { FormioFormsComponent } from './forms.component';

export const FormRoutes: any = [
  {
    path: '',
    component: FormioFormsComponent,
    children: [
      {
        path: '',
        redirectTo: 'simple',
        pathMatch: 'full'
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
      },
      {
        path: 'kitchen',
        title: 'Kitchen Sink',
        component: KitchenSinkFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, FormioModule, RouterModule.forChild(FormRoutes)],
  declarations: [
    FormioFormsComponent,
    SimpleFormComponent,
    WizardFormComponent,
    LanguageFormComponent,
    PDFFormComponent,
    KitchenSinkFormComponent
  ],
  bootstrap: [FormioFormsComponent]
})
export class FormioFormsModule {}
