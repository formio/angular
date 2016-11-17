/* eslint-disable */
/* tslint-disable */
import { FormioTemplate } from '../formio.template';
import { DatepickerModule, TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SelectModule } from 'ng2-select/ng2-select';
import { TextMaskModule } from 'angular2-text-mask';

let getTemplate = function(template: string) {
    return {component: {template: template}};
};
export const FORMIO_BOOTSTRAP: FormioTemplate = {
    formio: {
        component: {
            template: { gulp_inject: './bootstrap/formio.html' },
            styles: [
                '.form-group.required .control-label:after { content:"*"; color:red; }',
                '.glyphicon-spin { -webkit-animation: spin-anim 1s infinite; animation: spin-anim 1s infinite; }',
                '@-webkit-keyframes spin-anim {0% { -webkit-transform: rotate(0deg);transform: rotate(0deg);}100% { -webkit-transform: rotate(359deg);transform: rotate(359deg);}}',
                '@keyframes spin-anim {0% { -webkit-transform: rotate(0deg);transform: rotate(0deg);}100% { -webkit-transform: rotate(359deg);transform: rotate(359deg);}}'
            ]
        }
    },
    formio_component: getTemplate({ gulp_inject: './bootstrap/formio-component.html' }),
    formio_components: getTemplate({ gulp_inject: './bootstrap/formio-components.html' }),
    errors: getTemplate({ gulp_inject: './bootstrap/errors.html' }),
    components: {
        button: getTemplate({ gulp_inject: './bootstrap/components/button.html' }),
        columns: getTemplate({ gulp_inject: './bootstrap/components/columns.html' }),
        container: getTemplate({ gulp_inject: './bootstrap/components/container.html' }),
        datagrid: getTemplate({ gulp_inject: './bootstrap/components/datagrid.html' }),
        input: getTemplate({ gulp_inject: './bootstrap/components/input.html' }),
        textarea: getTemplate({ gulp_inject: './bootstrap/components/textarea.html' }),
        hidden: getTemplate({ gulp_inject: './bootstrap/components/hidden.html' }),
        radio: getTemplate({ gulp_inject: './bootstrap/components/radio.html' }),
        checkbox: getTemplate({ gulp_inject: './bootstrap/components/checkbox.html' }),
        custom: getTemplate({ gulp_inject: './bootstrap/components/custom.html' }),
        table: getTemplate({ gulp_inject: './bootstrap/components/table.html' }),
        panel: getTemplate({ gulp_inject: './bootstrap/components/panel.html' }),
        fieldset: getTemplate({ gulp_inject: './bootstrap/components/fieldset.html' }),
        well: getTemplate({ gulp_inject: './bootstrap/components/well.html' }),
        datetime: {
            component: {
                template:{ gulp_inject: './bootstrap/components/datetime.html' },
                styles: []
            },
            module: {
                imports: [DatepickerModule, TimepickerModule]
            }
        },
        selectboxes: getTemplate({ gulp_inject: './bootstrap/components/selectboxes.html' }),
        content: getTemplate({ gulp_inject: './bootstrap/components/content.html' }),
        html: getTemplate({ gulp_inject: './bootstrap/components/html.html' }),
        currency: getTemplate({ gulp_inject: './bootstrap/components/currency.html' }),
        select: {
            component: {
                template: { gulp_inject: './bootstrap/components/select.html' }
            },
            module: {
                imports: [SelectModule]
            }
        },
        survey: getTemplate({ gulp_inject: './bootstrap/components/survey.html' }),
        resource: {
            component: {
                template: { gulp_inject: './bootstrap/components/resource.html' }
            },
            module: {
                imports: [SelectModule]
            }
        },
        address: {
            component: {
                template: { gulp_inject: './bootstrap/components/address.html' }
            },
            module: {
                imports: [SelectModule]
            }
        },
        phoneNumber: {
            component: {
                template: { gulp_inject: './bootstrap/components/phonenumber.html' }
            },
            module: {
                imports: [TextMaskModule]
            }
        }
    }
};
