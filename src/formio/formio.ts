import { FormioComponentsTemplate } from './components/components';
import { FormioRegister } from './formio.component';
import { FormioComponentRegister} from './formio-component.component';
import { FormioComponentsComponentRegister } from './formio-components.component';
import { FORMIO_COMPONENTS } from './components/index';

/**
 * The Form.io template interface.
 *
 * Defines all the fields and components necessary to create a Form.io form
 * rendering template.
 */
export interface FormioTemplate {
    formio: string,
    formio_component: string;
    formio_components: string;
    components: FormioComponentsTemplate;
};

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
        ...FORMIO_COMPONENTS(template)
    ];
}
