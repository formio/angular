import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from './components/formio/formio.component';
import { FormioReportComponent } from './components/formioreport/formioreport.component';
import { FormBuilderComponent } from './components/formbuilder/formbuilder.component';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { ParseHtmlContentPipe } from './components/alerts/parse-html-content.pipe';
import { FormioAlertsComponent } from './components/alerts/formio.alerts.component';
import { FormioLoaderComponent } from './components/loader/formio.loader.component';
import { CustomTagsService } from './custom-component/custom-tags.service';
import { FormioBaseComponent } from './FormioBaseComponent';

@NgModule({
  declarations: [
    FormioComponent,
    FormioBaseComponent,
    FormioReportComponent,
    FormBuilderComponent,
    FormioLoaderComponent,
    FormioAlertsComponent,
    ParseHtmlContentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormioComponent,
    FormBuilderComponent,
    FormioReportComponent,    
    FormioLoaderComponent,
    FormioAlertsComponent
  ],
  providers: [
    FormioAlerts,
    CustomTagsService
  ],
  entryComponents: [
    FormioComponent,
    FormBuilderComponent,
    FormioReportComponent,
  ]
})
export class FormioModule {}
