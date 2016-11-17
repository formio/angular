"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var survey_1 = require('./survey');
var formio_component_component_1 = require('../../formio-component.component');
describe('SurveyComponent', function () {
    beforeEach(function () {
        _this.form = new forms_1.FormGroup({});
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
    });
    // An easy method for getting new Survey settings.
    var getSettings = function (overrides) {
        var settings = {
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
    var getComponent = function (overrides) {
        var settings = getSettings(overrides);
        var component = new formio_component_component_1.FormioComponentComponent();
        component.component = settings;
        component.form = _this.form;
        component.ngOnInit();
        return component;
    };
    it('Test FormioComponent for Survey', function () {
        var component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof survey_1.SurveyComponent).toEqual(true);
    });
    it('Type should be Survey', function () {
        var settings = getSettings({
            type: "survey"
        });
        // Create the Survey component.
        var survey = new survey_1.SurveyComponent(_this.form, settings);
        expect(survey.settings.type).toEqual("survey");
    });
    it('Should allow label value', function () {
        var settings = getSettings({
            label: 'Survey'
        });
        // Create the Survey component.
        var survey = new survey_1.SurveyComponent(_this.form, settings);
        expect(survey.label).toEqual('Survey');
    });
    it('Should allow Survey component with required', function () {
        var settings = getSettings({
            required: false
        });
        // Create the Survey component.
        var survey = new survey_1.SurveyComponent(_this.form, settings);
        expect(survey.settings.required).toEqual(false);
    });
    it('Check Survey values are available or not', function () {
        var settings = getSettings({
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
        var survey = new survey_1.SurveyComponent(_this.form, settings);
        expect(survey.settings.values.length).not.toEqual(0);
    });
    it('Check Survey values contains labels or not', function () {
        var settings = getSettings({
            values: [
                {
                    value: "Speak",
                    label: "Speak",
                }
            ]
        });
        // Create the Survey component.
        var survey = new survey_1.SurveyComponent(_this.form, settings);
        expect(survey.settings.values[0].label).not.toEqual('');
    });
    it('Check Survey Questions are available or not', function () {
        var settings = getSettings({
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
        var survey = new survey_1.SurveyComponent(_this.form, settings);
        expect(survey.settings.questions.length).not.toEqual(0);
    });
});
