import { BaseComponent, BaseOptions, BaseElement} from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import {OnInit} from "@angular/core";

export interface SurveyOptions extends BaseOptions<string> {
    questions?: Array<any>;
    values?: Array<any>;
    customClass?: string;
}

export class SurveyComponent extends BaseComponent<SurveyOptions> {}
export class SurveyElement extends BaseElement<SurveyComponent> implements OnInit{
    public valueObj: Object;
    public getValue(label: string, value: string): Object {
        this.valueObj[label] = value;
        return this.valueObj;
    }
    ngOnInit() {
        this.valueObj = {};
    }
}

export function SurveyField(template:FormioTemplate) {
    FormioComponents.register('survey', SurveyComponent, SurveyElement, template.components.survey);
    return SurveyElement;
}
