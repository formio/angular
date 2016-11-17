"use strict";
var _this = this;
/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
var forms_1 = require('@angular/forms');
var bootstrap_tpl_1 = require('../../templates/bootstrap.tpl');
var index_1 = require('../index');
var table_1 = require('./table');
var formio_component_component_1 = require('../../formio-component.component');
var table_2 = require('../../fixtures/fields/table');
describe('TableComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_tpl_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
    });
    // An easy method for getting new Table settings.
    var getSettings = function (overrides) {
        var settings = table_2.TABLE;
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
    it('Test FormioComponent for Table', function () {
        var component = getComponent({});
        expect(component.components[0] instanceof table_1.TableComponent).toEqual(true);
    });
    it('Should allow bootstrap classes of table', function () {
        var settings = getSettings({
            striped: true,
            bordered: true,
            hover: true,
            condensed: false
        });
        // Create the table component.
        var table = new table_1.TableComponent(_this.form, settings);
        expect(table.settings.striped).toEqual(true);
        expect(table.settings.bordered).toEqual(true);
        expect(table.settings.hover).toEqual(true);
        expect(table.settings.condensed).toEqual(false);
    });
    it('Should allow numRows and numCols of table', function () {
        var settings = getSettings({
            numRows: 2,
            numCols: 2
        });
        // Create the table component.
        var table = new table_1.TableComponent(_this.form, settings);
        expect(table.settings.numRows).toEqual(2);
        expect(table.settings.numCols).toEqual(2);
    });
    it('Should allow components inside table', function () {
        var settings = getSettings({
            rows: [
                [{ components: [{
                                input: true,
                                inputType: 'checkbox',
                                tableView: false,
                                hideLabel: true,
                                label: 'Checkbox',
                                key: 'checkbox',
                                defaultValue: '',
                                protected: false,
                                persistent: true,
                                validate: {
                                    required: true
                                },
                                type: 'checkbox',
                                conditional: {
                                    show: null,
                                    when: null,
                                    eq: ""
                                }
                            }], },
                    { components: [{
                                input: true,
                                inputType: 'checkbox',
                                tableView: false,
                                hideLabel: true,
                                label: 'Checkbox',
                                key: 'checkbox',
                                defaultValue: '',
                                protected: false,
                                persistent: true,
                                validate: {
                                    required: true
                                },
                                type: 'checkbox',
                                conditional: {
                                    show: null,
                                    when: null,
                                    eq: ""
                                }
                            }], }],
                [{ components: [], },
                    { components: [], }]
            ]
        });
        // Create the table component.
        var table = new table_1.TableComponent(_this.form, settings);
        expect(table.settings.rows[0][0]).not.toEqual(null);
    });
    it('All components rendered or not', function () {
        var settings = getSettings({
            rows: [
                [{ components: [{
                                input: true,
                                inputType: 'checkbox',
                                tableView: false,
                                hideLabel: true,
                                label: 'Checkbox',
                                key: 'checkbox',
                                defaultValue: '',
                                protected: false,
                                persistent: true,
                                validate: {
                                    required: true
                                },
                                type: 'checkbox',
                                conditional: {
                                    show: null,
                                    when: null,
                                    eq: ""
                                }
                            }], },
                    { components: [{
                                input: true,
                                inputType: 'checkbox',
                                tableView: false,
                                hideLabel: true,
                                label: 'Checkbox',
                                key: 'checkbox',
                                defaultValue: '',
                                protected: false,
                                persistent: true,
                                validate: {
                                    required: true
                                },
                                type: 'checkbox',
                                conditional: {
                                    show: null,
                                    when: null,
                                    eq: ""
                                }
                            }], }],
                [{ components: [], },
                    { components: [], }]
            ]
        });
        // Create the table component.
        var table = new table_1.TableComponent(_this.form, settings);
        var total = 0;
        for (var i in table.settings.rows) {
            for (var j in table.settings.rows[i]) {
                total += table.settings.rows[i][j].components.length;
            }
        }
        expect(total).toEqual(2);
    });
});
