import { FormioBaseModule } from './src/formio';
import { FORMIO_BOOTSTRAP } from './src/templates/bootstrap';
FormioBaseModule.setTemplate(FORMIO_BOOTSTRAP);
export const FormioModule = FormioBaseModule;