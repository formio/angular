import { NgModule } from '@angular/core';
import { FormioResourceModule, FormioResourceService, FormioResourceConfig } from '../../src/resource';
import { AppConfig } from '../config';

@NgModule({
  imports: [
    FormioResourceModule
  ],
  providers: [
    FormioResourceService,
    {provide: FormioResourceConfig, useValue: {
      app: AppConfig,
      name: 'event',
      form: 'event'
    }}
  ]
})
export class EventsModule {}
