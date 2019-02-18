import { Routes } from '@angular/router';
import {
  FormManagerViewComponent,
  SubmissionComponent, SubmissionDeleteComponent, SubmissionEditComponent,
  SubmissionIndexComponent, SubmissionViewComponent
} from '../manager';
import {UserManagerIndexComponent} from './index/index.component';
import {UserFormManagerFormComponent} from './abstract/abstract.component';
import {UserManagerRouteConfig} from './user-manager.config';
export function UserManagerRoutes(config?: UserManagerRouteConfig ): Routes {
  return [
    {
      path: '',
      component: config && config.userIndex ? config.userIndex : UserManagerIndexComponent
    },
    {
      path: ':category',
      component: config && config.user ? config.user : UserFormManagerFormComponent,
      children: [
        {
          path: '',
          redirectTo: 'view',
          pathMatch: 'full'
        },
        {
          path: 'view',
          component: config && config.userView ? config.userView : FormManagerViewComponent
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
