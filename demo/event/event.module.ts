import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormioAppConfig } from '../../src';
import { FormioResourceModule, FormioResourceService, FormioResourceConfig, FormioResourceRoutes } from '../../src/resource';
import { AppConfig } from '../config';

export const eventRoutes = FormioResourceRoutes({});

@NgModule({
  imports: [
    FormioResourceModule,
    RouterModule.forChild(eventRoutes)
  ],
  providers: [
    FormioResourceService,
    {provide: FormioAppConfig, useValue: AppConfig},
    {provide: FormioResourceConfig, useValue: {
      name: 'event',
      form: 'event'
    }}
  ]
})
export class EventsModule {}
