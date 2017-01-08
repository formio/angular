import { FormioBaseModule } from './formio';
import { FORMIO_BOOTSTRAP } from './templates/bootstrap.templates';
FormioBaseModule.setTemplate(FORMIO_BOOTSTRAP);
export const FormioModule = FormioBaseModule;