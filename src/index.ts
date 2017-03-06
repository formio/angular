import { ModuleWithProviders } from '@angular/core';
import { FormioBaseModule } from './formio.base';
import { FORMIO_BOOTSTRAP } from './templates/bootstrap.templates';
export const FormioModule = FormioBaseModule.forRoot(FORMIO_BOOTSTRAP);
export { FormioEvents } from './formio.events';
export { FormioAppConfig } from './formio.config';
