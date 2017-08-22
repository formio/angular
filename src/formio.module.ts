import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from './formio.component';
import { FormioAlerts } from './formio.alerts';
import { FormioAlertsComponent } from './formio.alerts.component';
import { FormioLoader } from './formio.loader';
import { FormioLoaderComponent } from './formio.loader.component';

@NgModule({
  declarations: [
    FormioComponent,
    FormioLoaderComponent,
    FormioAlertsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormioComponent,
    FormioLoaderComponent,
    FormioAlertsComponent
  ],
  providers: [
    FormioLoader,
    FormioAlerts
  ]
})
export class FormioModule {}
