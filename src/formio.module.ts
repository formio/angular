import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from './components/formio/formio.component';
import { FormBuilderComponent } from './components/formbuilder/formbuilder.component';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { FormioAlertsComponent } from './components/alerts/formio.alerts.component';
import { FormioLoader } from './components/loader/formio.loader';
import { FormioLoaderComponent } from './components/loader/formio.loader.component';
import { CustomTagsService } from './custom-component/custom-tags.service';

@NgModule({
  declarations: [
    FormioComponent,
    FormBuilderComponent,
    FormioLoaderComponent,
    FormioAlertsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormioComponent,
    FormBuilderComponent,
    FormioLoaderComponent,
    FormioAlertsComponent
  ],
  providers: [
    FormioLoader,
    FormioAlerts,
    CustomTagsService
  ],
  entryComponents: [
    FormioComponent,
    FormBuilderComponent
  ]
})
export class FormioModule {}
