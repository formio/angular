import { FormioTemplate } from '../formio.template';
import { DatepickerModule, TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
//import { SelectModule } from 'ng2-select/ng2-select';

let getTemplate = function(template: string) {
    return {component: {template: template}};
};
export const FORMIO_BOOTSTRAP: FormioTemplate = {
    formio: {
        component: {
            template: require('./bootstrap/formio.html'),
            styles: [
                '.form-group.required .control-label:after { content:"*"; color:red; }',
                '.glyphicon-spin { -webkit-animation: spin-anim 1s infinite; animation: spin-anim 1s infinite; }',
                '@-webkit-keyframes spin-anim {0% { -webkit-transform: rotate(0deg);transform: rotate(0deg);}100% { -webkit-transform: rotate(359deg);transform: rotate(359deg);}}',
                '@keyframes spin-anim {0% { -webkit-transform: rotate(0deg);transform: rotate(0deg);}100% { -webkit-transform: rotate(359deg);transform: rotate(359deg);}}'
            ]
        }
    },
    formio_component: getTemplate(require('./bootstrap/formio-component.html')),
    formio_components: getTemplate(require('./bootstrap/formio-components.html')),
    errors: getTemplate(require('./bootstrap/errors.html')),
    components: {
        button: getTemplate(require('./bootstrap/components/button.html')),
        columns: getTemplate(require('./bootstrap/components/columns.html')),
        container: getTemplate(require('./bootstrap/components/container.html')),
        datagrid: getTemplate(require('./bootstrap/components/datagrid.html')),
        input: getTemplate(require('./bootstrap/components/input.html')),
        textarea: getTemplate(require('./bootstrap/components/textarea.html')),
        hidden: getTemplate(require('./bootstrap/components/hidden.html')),
        radio: getTemplate(require('./bootstrap/components/radio.html')),
        checkbox: getTemplate(require('./bootstrap/components/checkbox.html')),
        custom: getTemplate(require('./bootstrap/components/custom.html')),
        table: getTemplate(require('./bootstrap/components/table.html')),
        panel: getTemplate(require('./bootstrap/components/panel.html')),
        fieldset: getTemplate(require('./bootstrap/components/fieldset.html')),
        well: getTemplate(require('./bootstrap/components/well.html')),
        datetime: {
            component: {
                template:require('./bootstrap/components/datetime.html'),
                styles: []
            },
            module: {
                imports: [DatepickerModule, TimepickerModule]
            }
        },
        selectboxes: getTemplate(require('./bootstrap/components/selectboxes.html')),
        content: getTemplate(require('./bootstrap/components/content.html')),
        html: getTemplate(require('./bootstrap/components/html.html')),
        currency: getTemplate(require('./bootstrap/components/currency.html')),
        select: {
            component: {
                template: require('./bootstrap/components/select.html')
            }/*,
            module: {
                imports: [SelectModule]
            }*/
        },
        survey: getTemplate(require('./bootstrap/components/survey.html')),
        resource: {
            component: {
                template: require('./bootstrap/components/resource.html')
            }/*,
            module: {
                imports: [SelectModule]
            }*/
        },
        address: {
            component: {
                template: require('./bootstrap/components/address.html')
            }/*,
            module: {
                imports: [SelectModule]
            }*/
        }
    }
};
