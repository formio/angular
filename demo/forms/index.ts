import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioModule } from '../../src';
import { SimpleFormComponent } from './simple';
import { WizardFormComponent } from './wizard';
import { KitchenSinkFormComponent } from './kitchen';
import { FormioFormsComponent } from './forms.component';

export const FormRoutes: any = [
  {
    path: '',
    component: FormioFormsComponent,
    children: [
      {
        path: '',
        redirectTo: 'simple',
        pathMatch: 'full',
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
        path: 'kitchen',
        title: 'Kitchen Sink',
        component: KitchenSinkFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    RouterModule.forChild(FormRoutes)
  ],
  declarations: [
    FormioFormsComponent,
    SimpleFormComponent,
    WizardFormComponent,
    KitchenSinkFormComponent
  ],
  bootstrap: [FormioFormsComponent]
})
export class FormioFormsModule {}
