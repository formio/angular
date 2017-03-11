import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from './formio.component';
import { FormioLoader, FormioLoaderComponent } from './formio.loader';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FormioComponent,
        FormioLoaderComponent
    ],
    exports: [
        FormioComponent,
        FormioLoaderComponent
    ],
    providers: [
        FormioLoader
    ]
})
export class FormioModule {}
export { FormioAppConfig } from './formio.config';
export { FormioLoader } from './formio.loader';
