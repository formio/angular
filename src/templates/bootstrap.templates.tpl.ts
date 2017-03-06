/* eslint-disable */
/* tslint-disable */
import { FormioTemplate } from '../formio.template';
import { SelectModule } from 'ng2-select/ng2-select';
import { TextMaskModule } from 'angular2-text-mask';
import { AlignDirective } from '../components/signature/signature';
import { SignaturePadModule } from 'angular2-signaturepad';

let requiredCSS: string = '.required .control-label::after { content:" *"; color:red; }';
let getTemplate = function(template: string, styles: Array<string> = [], module: Object = {}) {
    return {
        component: {
            template: template,
            styles: [requiredCSS].concat(styles)
        },
        module: module
    };
};
export const FORMIO_BOOTSTRAP: FormioTemplate = {
    formio: {
        component: {
            template: { gulp_inject: './bootstrap/formio.html' },
            styles: [
                '.glyphicon-spin{-webkit-animation:a 1s infinite;animation:a 1s infinite}@-webkit-keyframes a{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes a{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}'
            ]
        }
    },
    formio_wizard: {
        component: {
            template:{ gulp_inject: './bootstrap/formio-wizard.html' },
            styles: [
                '.bs-wizard {border-bottom: solid 1px #e0e0e0; padding: 0 0 10px 0;line-height: 1em;}',
                '.bs-wizard > .bs-wizard-step {padding: 0; position: relative;}',
                '.bs-wizard > .bs-wizard-step + .bs-wizard-step {}',
                '.bs-wizard > .bs-wizard-step .bs-wizard-stepnum-wrapper {position:absolute;width:100%}',
                '.bs-wizard > .bs-wizard-step .bs-wizard-stepnum {color: #595959; font-size: 12px; line-height:15px;}',
                '.bs-wizard > .bs-wizard-step .bs-wizard-info {color: #999; font-size: 14px;}',
                '.bs-wizard > .bs-wizard-step > .bs-wizard-dot {position: absolute; width: 30px; height: 30px; display: block; top: 25px; left: 50%; margin-top: -15px; margin-left: -15px; border-radius: 50%; cursor:pointer;z-index:10;}',
                '.bs-wizard.hasTitles > .bs-wizard-step > .bs-wizard-dot {top: 45px;}',
                '.bs-wizard > .bs-wizard-step > .bs-wizard-dot > .bs-wizard-dot-inner {width: 14px; height: 14px; border-radius: 50px; position: absolute; top: 8px; left: 8px; }',
                '.bs-wizard > .bs-wizard-step > .progress {position: relative; border-radius: 0px; height: 10px; box-shadow: none; margin: 20px 0;border: none;padding: 0;}',
                '.bs-wizard.hasTitles > .bs-wizard-step > .progress {margin-top: 40px;}',
                '.bs-wizard > .bs-wizard-step > .progress > .progress-bar {width:0px; box-shadow: none;}',
                '.bs-wizard > .bs-wizard-step.complete > .progress > .progress-bar {width:100%;border-radius:0;}',
                '.bs-wizard > .bs-wizard-step.active > .progress > .progress-bar {width:50%;}',
                '.bs-wizard > .bs-wizard-step:first-child.active > .progress > .progress-bar {width:0%;}',
                '.bs-wizard > .bs-wizard-step:last-child.active > .progress > .progress-bar {width: 100%;}',
                '.bs-wizard > .bs-wizard-step.disabled > .bs-wizard-dot {background-color: #f5f5f5;}',
                '.bs-wizard > .bs-wizard-step.disabled > .bs-wizard-dot > .bs-wizard-dot-inner {opacity: 0;}',
                '.bs-wizard > .bs-wizard-step:first-child  > .progress {left: 50%; width: 50%;}',
                '.bs-wizard > .bs-wizard-step:last-child  > .progress {width: 50%;}',
                '.bs-wizard > .bs-wizard-step.disabled a.bs-wizard-dot{ pointer-events: none; }'
            ]
        }
    },
    formio_component: getTemplate({ gulp_inject: './bootstrap/formio-component.html' }),
    formio_components: getTemplate({ gulp_inject: './bootstrap/formio-components.html' }),
    errors: getTemplate({ gulp_inject: './bootstrap/errors.html' }),
    alerts: getTemplate({ gulp_inject: './bootstrap/alerts.html' }),
    components: {
        button: getTemplate(
            { gulp_inject: './bootstrap/components/button.html' },
            ['.glyphicon-spin{-webkit-animation:a 1s infinite;animation:a 1s infinite}@-webkit-keyframes a{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes a{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}']
        ),
        columns: getTemplate({ gulp_inject: './bootstrap/components/columns.html' }),
        container: getTemplate({ gulp_inject: './bootstrap/components/container.html' }),
        datagrid: getTemplate({ gulp_inject: './bootstrap/components/datagrid.html' }),
        input: getTemplate({ gulp_inject: './bootstrap/components/input.html' }),
        number: getTemplate({ gulp_inject: './bootstrap/components/number.html' }),
        textarea: getTemplate({ gulp_inject: './bootstrap/components/textarea.html' }),
        hidden: getTemplate({ gulp_inject: './bootstrap/components/hidden.html' }),
        radio: getTemplate({ gulp_inject: './bootstrap/components/radio.html' }),
        checkbox: getTemplate({ gulp_inject: './bootstrap/components/checkbox.html' }),
        custom: getTemplate({ gulp_inject: './bootstrap/components/custom.html' }),
        table: getTemplate({ gulp_inject: './bootstrap/components/table.html' }),
        panel: getTemplate({ gulp_inject: './bootstrap/components/panel.html' }),
        fieldset: getTemplate({ gulp_inject: './bootstrap/components/fieldset.html' }),
        well: getTemplate({ gulp_inject: './bootstrap/components/well.html' }),
        day: getTemplate({ gulp_inject: './bootstrap/components/day.html' }),
        datetime: getTemplate(
            { gulp_inject: './bootstrap/components/datetime.html' }
        ),
        selectboxes: getTemplate({ gulp_inject: './bootstrap/components/selectboxes.html' }),
        content: getTemplate({ gulp_inject: './bootstrap/components/content.html' }),
        html: getTemplate({ gulp_inject: './bootstrap/components/html.html' }),
        currency: getTemplate({ gulp_inject: './bootstrap/components/currency.html' }),
        select: getTemplate({ gulp_inject: './bootstrap/components/select.html' }, [], {
            imports: [SelectModule]
        }),
        survey: getTemplate({ gulp_inject: './bootstrap/components/survey.html' }),
        resource: getTemplate({ gulp_inject: './bootstrap/components/resource.html' }, [], {
            imports: [SelectModule]
        }),
        address: getTemplate({ gulp_inject: './bootstrap/components/address.html' }, [], {
            imports: [SelectModule]
        }),
        phoneNumber: getTemplate({gulp_inject: './bootstrap/components/phonenumber.html'}, [], {
            imports: [TextMaskModule]
        }),
        signature: getTemplate(
            { gulp_inject: './bootstrap/components/signature.html' },
            ['.required .footer::after { content:" *"; color:red; }', ".clearButton {position:absolute; left: 0; top: 0; z-index: 1000}", ".footer {text-align: center; color:#C3C3C3;}"],
            {
                imports: [SignaturePadModule],
                declarations: [AlignDirective]
            }
        )
    }
};
