import { FormioTemplate } from '../formio';
export const FORMIO_TEMPLATE: FormioTemplate = {
    formio: require('./bootstrap/formio.html'),
    formio_component: require('./bootstrap/formio-component.html'),
    formio_components: require('./bootstrap/formio-components.html'),
    components: {
        textfield: require('./bootstrap/components/textfield.html'),
        button: require('./bootstrap/components/button.html'),
        columns: require('./bootstrap/components/columns.html')
    }
};