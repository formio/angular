import { FormioBaseModule } from './formio';
import { FORMIO_BOOTSTRAP } from './templates/bootstrap.tpl.build';
FormioBaseModule.setTemplate(FORMIO_BOOTSTRAP);
export const FormioModule = FormioBaseModule;