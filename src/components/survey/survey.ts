import { BaseComponent, BaseOptions, BaseElement} from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface SurveyOptions extends BaseOptions<string> {
    questions?: Array<any>;
    values?: Array<any>;
    customClass?: string;
}

export class SurveyComponent extends BaseComponent<SurveyOptions> {}
export class SurveyElement extends BaseElement<SurveyComponent> {}
export function Survey(template:FormioTemplate) {
    FormioComponents.register('survey', SurveyComponent, SurveyElement, {
        template: template.components.survey
    });
    return SurveyElement;
}
