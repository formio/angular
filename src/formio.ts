import { FormioRegister } from './formio.component';
import { FormioComponentRegister} from './formio-component.component';
import { FormioComponentsComponentRegister } from './formio-components.component';
import { FormioErrorsRegister } from './formio.errors';
import { FORMIO_COMPONENTS } from './components/index';
import { FormioTemplate } from './formio.template';

/**
 * The core engine for the Form.io renderer.
 *
 * @param template
 *   The template you wish to attach to the renderer.
 * @returns {Formio|FormioComponent|any[]}
 * @constructor
 */
export function FORMIO(template: FormioTemplate) {
    return [
        FormioRegister(template),
        FormioComponentRegister(template),
        FormioComponentsComponentRegister(template),
        FormioErrorsRegister(template),
        ...FORMIO_COMPONENTS(template)
    ];
}

