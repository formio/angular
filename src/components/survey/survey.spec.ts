/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { SurveyComponent, SurveyOptions } from './survey';
import { FormioComponentComponent } from '../../formio-component.component';

describe('SurveyComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
        RegisterComponents(FORMIO_BOOTSTRAP);
    });

    // An easy method for getting new Survey settings.
    var getSettings = (overrides:{}):SurveyOptions => {
        let settings: SurveyOptions = {
            input: true,
            tableView: true,
            label: "Survey",
            key: "survey",
            questions: [
                {
                    value: "English",
                    label: "English",
                },
                {
                    value: "Hindi",
                    label: "Hindi",
                },
                {
                    value: "Marathi",
                    label: "Marathi",
                }
            ],
            values: [
                {
                    value: "Read",
                    label: "Read",
                },
                {
                    value: "Write",
                    label: "Write",
                },
                {
                    value: "Speak",
                    label: "Speak",
                }
            ],
            defaultValue: "",
            protected: false,
            persistent: true,
            validate: {
                required: false,
                custom: "",
                customPrivate: false
            },
            type: "survey",
            conditional: {
                show: null,
                when: null,
                eq: ""
            }
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides:{}):FormioComponentComponent<string> => {
        let settings:SurveyOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for Survey', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof SurveyComponent).toEqual(true);
    });

    it('Type should be Survey', () => {
        let settings: SurveyOptions = getSettings({
            type: "survey"
        });

        // Create the Survey component.
        let survey = new SurveyComponent(this.form, settings);
        expect(survey.settings.type).toEqual("survey");
    });

    it('Should allow label value', () => {
        let settings: SurveyOptions = getSettings({
            label: 'Survey'
        });

        // Create the Survey component.
        let survey = new SurveyComponent(this.form, settings);
        expect(survey.label).toEqual('Survey');
    });

    it('Should allow Survey component with required', () => {
        let settings: SurveyOptions = getSettings({
            required: false
        });

        // Create the Survey component.
        let survey = new SurveyComponent(this.form, settings);
        expect(survey.settings.required).toEqual(false);
    });

    it('Check Survey values are available or not',() => {
        let settings: SurveyOptions = getSettings({
            values: [
                {
                    value: "Read",
                    label: "Read",
                },
                {
                    value: "Write",
                    label: "Write",
                },
                {
                    value: "Speak",
                    label: "Speak",
                }
            ]
        });

        // Create the Survey component.
        let survey = new SurveyComponent(this.form, settings);
        expect(survey.settings.values.length).not.toEqual(0);
    });

    it('Check Survey values contains labels or not',() => {
        let settings: SurveyOptions = getSettings({
            values: [
                {
                    value: "Speak",
                    label: "Speak",
                }
            ]
        });

        // Create the Survey component.
        let survey = new SurveyComponent(this.form, settings);
        expect(survey.settings.values[0].label).not.toEqual('');
    });

    it('Check Survey Questions are available or not',() => {
        let settings: SurveyOptions = getSettings({
            questions: [
                {
                    value: "English",
                    label: "English",
                },
                {
                    value: "Hindi",
                    label: "Hindi",
                },
                {
                    value: "Marathi",
                    label: "Marathi",
                }
            ]
        });

        // Create the Survey component.
        let survey = new SurveyComponent(this.form, settings);
        expect(survey.settings.questions.length).not.toEqual(0);
    });

});
