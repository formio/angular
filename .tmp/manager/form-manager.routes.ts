import { Routes } from '@angular/router';
import { FormManagerIndexComponent } from './index/index.component';
import { FormManagerCreateComponent } from './create/create.component';
import { FormManagerFormComponent } from './form/form.component';
import { FormManagerViewComponent } from './view/view.component';
import { FormManagerEditComponent } from './edit/edit.component';
import { FormManagerDeleteComponent } from './delete/delete.component';
import { SubmissionEditComponent } from './submission/edit/edit.component';
import { SubmissionDeleteComponent } from './submission/delete/delete.component';
import { SubmissionViewComponent } from './submission/view/view.component';
import { SubmissionIndexComponent } from './submission/index/index.component';
import { SubmissionComponent } from './submission/submission/submission.component';
import { FormManagerRouteConfig } from './form-manager.config';
export function FormManagerRoutes(config?: FormManagerRouteConfig): Routes {
  return [
    {
      path: '',
      component: config && config.formIndex ? config.formIndex : FormManagerIndexComponent
    },
    {
      path: 'create',
      component: config && config.formCreate ? config.formCreate : FormManagerCreateComponent
    },
    {
      path: ':id',
      component: config && config.form ? config.form : FormManagerFormComponent,
      children: [
        {
          path: '',
          redirectTo: 'view',
          pathMatch: 'full'
        },
        {
          path: 'view',
          component: config && config.formView ? config.formView : FormManagerViewComponent
        },
        {
          path: 'edit',
          component: config && config.formEdit ? config.formEdit : FormManagerEditComponent
        },
        {
          path: 'delete',
          component: config && config.formDelete ? config.formDelete : FormManagerDeleteComponent
        },
        {
          path: 'submission',
          component: config && config.submissionIndex ? config.submissionIndex : SubmissionIndexComponent
        },
        {
          path: 'submission/:id',
          component: config && config.submission ? config.submission : SubmissionComponent,
          children: [
            {
              path: '',
              redirectTo: 'view',
              pathMatch: 'full'
            },
            {
              path: 'view',
              component: config && config.submissionView ? config.submissionView : SubmissionViewComponent
            },
            {
              path: 'edit',
              component: config && config.submissionEdit ? config.submissionEdit : SubmissionEditComponent
            },
            {
              path: 'delete',
              component: config && config.submissionDelete ? config.submissionDelete : SubmissionDeleteComponent
            }
          ]
        }
      ]
    }
  ];
}
