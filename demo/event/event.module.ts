import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioAppConfig } from '../../dist';
import { FormioGridModule } from '../../dist/grid';
import { FormioResourceModule, FormioResourceService, FormioResourceConfig, FormioResourceRoutes } from '../../dist/resource';
import { AppConfig } from '../config';
import { EventIndexComponent } from './event.index';

export const eventRoutes = FormioResourceRoutes({
  index: EventIndexComponent
});

@NgModule({
  imports: [
    CommonModule,
    FormioGridModule,
    FormioResourceModule,
    RouterModule.forChild(eventRoutes)
  ],
  declarations: [
    EventIndexComponent
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
export class EventModule {}
