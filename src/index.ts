import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from './formio.component';
import { FormioAlertsComponent, FormioAlerts } from './formio.alerts';
import { FormioLoader, FormioLoaderComponent } from './formio.loader';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FormioComponent,
        FormioLoaderComponent,
        FormioAlertsComponent
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
export { FormioAppConfig } from './formio.config';
export { FormioLoader } from './formio.loader';
