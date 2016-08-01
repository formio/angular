import { FormioTemplate } from '../formio.template';
export const FORMIO_TEMPLATE: FormioTemplate = {
    styles: [
        '.form-group.required .control-label:after { content:"*"; color:red; }'
    ],
    formio: require('./bootstrap/formio.html'),
    formio_component: require('./bootstrap/formio-component.html'),
    formio_components: require('./bootstrap/formio-components.html'),
    components: {
        textfield: require('./bootstrap/components/textfield.html'),
        button: require('./bootstrap/components/button.html'),
        columns: require('./bootstrap/components/columns.html'),
        container: require('./bootstrap/components/container.html'),
        datagrid: require('./bootstrap/components/datagrid.html'),
        radio: require('./bootstrap/components/radio.html')
    }
};