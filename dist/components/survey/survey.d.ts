/// <reference types="chai" />
import { BaseComponent, BaseOptions, BaseElement } from '../base';
import { FormioTemplate } from '../../formio.template';
import { OnInit } from "@angular/core";
export interface SurveyOptions extends BaseOptions<string> {
    questions?: Array<any>;
    values?: Array<any>;
    customClass?: string;
}
export declare class SurveyComponent extends BaseComponent<SurveyOptions> {
}
export declare class SurveyElement extends BaseElement<SurveyComponent> implements OnInit {
    valueObj: Object;
    getValue(label: string, value: string): Object;
    ngOnInit(): void;
}
export declare function SurveyField(template: FormioTemplate): typeof SurveyElement;
