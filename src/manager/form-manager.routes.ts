import { Routes } from '@angular/router';
import { FormManagerIndexComponent } from './index/index.component';
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
  config = config || {};
  return [
    {
      path: '',
      component: config.formIndex || FormManagerIndexComponent
    },
    {
      path: 'create',
      component: config.formCreate || FormManagerEditComponent
    },
    {
      path: ':id',
      component: config.form || FormManagerFormComponent,
      children: [
        {
          path: '',
          redirectTo: 'view',
          pathMatch: 'full'
        },
        {
          path: 'view',
          component: config.formView || FormManagerViewComponent
        },
        {
          path: 'edit',
          component: config.formEdit || FormManagerEditComponent
        },
        {
          path: 'delete',
          component: config.formDelete || FormManagerDeleteComponent
        },
        {
          path: 'submission',
          component: config.submissionIndex || SubmissionIndexComponent
        },
        {
          path: 'submission/:id',
          component: config.submission || SubmissionComponent,
          children: [
            {
              path: '',
              redirectTo: 'view',
              pathMatch: 'full'
            },
            {
              path: 'view',
              component: config.submissionView || SubmissionViewComponent
            },
            {
              path: 'edit',
              component: config.submissionEdit || SubmissionEditComponent
            },
            {
              path: 'delete',
              component: config.submissionDelete || SubmissionDeleteComponent
            }
          ]
        }
      ]
    }
  ];
}
