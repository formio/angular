import { FormioTemplate } from '../formio.template';
export const FORMIO_TEMPLATE: FormioTemplate = {
    styles: [
        '.form-group.required .control-label:after { content:"*"; color:red; }',
        '.glyphicon-spin { -webkit-animation: spin-anim 1s infinite; animation: spin-anim 1s infinite; }',
        '@-webkit-keyframes spin-anim {0% { -webkit-transform: rotate(0deg);transform: rotate(0deg);}100% { -webkit-transform: rotate(359deg);transform: rotate(359deg);}}',
        '@keyframes spin-anim {0% { -webkit-transform: rotate(0deg);transform: rotate(0deg);}100% { -webkit-transform: rotate(359deg);transform: rotate(359deg);}}'
    ],
    formio: require('./bootstrap/formio.html'),
    formio_component: require('./bootstrap/formio-component.html'),
    formio_components: require('./bootstrap/formio-components.html'),
    errors: require('./bootstrap/errors.html'),
    components: {
        button: require('./bootstrap/components/button.html'),
        columns: require('./bootstrap/components/columns.html'),
        container: require('./bootstrap/components/container.html'),
        datagrid: require('./bootstrap/components/datagrid.html'),
        input: require('./bootstrap/components/input.html'),
        textarea: require('./bootstrap/components/textarea.html'),
        hidden: require('./bootstrap/components/hidden.html'),
        radio: require('./bootstrap/components/radio.html'),
        checkbox: require('./bootstrap/components/checkbox.html'),
        custom: require('./bootstrap/components/custom.html'),
        table: require('./bootstrap/components/table.html'),
        panel: require('./bootstrap/components/panel.html')
    }
};
