import { ModuleWithProviders } from '@angular/core';
import { FormioBaseModule } from './formio';
import { FORMIO_BOOTSTRAP } from './templates/bootstrap.templates';
export const FormioModule = FormioBaseModule.forRoot(FORMIO_BOOTSTRAP);
