/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { TableComponent, TableOptions } from './table';
import { FormioComponentComponent } from '../../formio-component.component';
import { TABLE } from '../../fixtures/fields/table';

describe('TableComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    // An easy method for getting new Table settings.
    var getSettings = (overrides: {}): TableOptions => {
        let settings: TableOptions = TABLE;
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:TableOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for Table', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof TableComponent).toEqual(true);
    });

    it('Should allow bootstrap classes of table', () => {
        let settings: TableOptions = getSettings({
            striped: true,
            bordered: true,
            hover: true,
            condensed: false
        });

        // Create the table component.
        let table = new TableComponent(this.form, settings);
        expect(table.settings.striped).toEqual(true);
        expect(table.settings.bordered).toEqual(true);
        expect(table.settings.hover).toEqual(true);
        expect(table.settings.condensed).toEqual(false);
    });

    it('Should allow numRows and numCols of table', () => {
        let settings: TableOptions = getSettings({
            numRows: 2,
            numCols: 2
        });

        // Create the table component.
        let table = new TableComponent(this.form, settings);
        expect(table.settings.numRows).toEqual(2);
        expect(table.settings.numCols).toEqual(2);
    });

    it('Should allow components inside table', () => {
        let settings: TableOptions = getSettings({
            rows: [
                [{components: [{
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
                }],},
                    {components: [{
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
                    }],}],
                [{components: [],},
                    {components: [],}]
            ]
        });

        // Create the table component.
        let table = new TableComponent(this.form, settings);
        expect(table.settings.rows[0][0]).not.toEqual(null);
    });

    it('All components rendered or not', () => {
        let settings: TableOptions = getSettings({
            rows: [
                [{components: [{
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
                }],},
                    {components: [{
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
                    }],}],
                [{components: [],},
                    {components: [],}]
            ]
        });

        // Create the table component.
        let table = new TableComponent(this.form, settings);
        let total = 0;
        for (let i in table.settings.rows) {
            for (let j in table.settings.rows[i]) {
                total += table.settings.rows[i][j].components.length;
            }
        }
        expect(total).toEqual(2);
    });

});
