/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup, FormControl } from '@angular/forms';
import { ColumnsComponent, ColumnsOptions } from './columns';
import { FORMIO_TEMPLATE } from '../../templates/bootstrap';
import { RegisterComponents } from '../index';
import { FormioComponentsComponent } from '../../formio-components.component';
import { FormioComponentComponent } from '../../formio-component.component';

describe('ColumnsComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_TEMPLATE);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): ColumnsOptions => {
        let settings: ColumnsOptions = {
            "input": false,
            "columns": [{
                "components": [{
                    "input": true,
                    "tableView": true,
                    "inputType": "text",
                    "inputMask": "",
                    "label": "First Name",
                    "key": "firstName",
                    "placeholder": "Enter your first name",
                    "prefix": "",
                    "suffix": "",
                    "multiple": false,
                    "defaultValue": "",
                    "protected": false,
                    "unique": false,
                    "persistent": true,
                    "validate": {
                        "required": true,
                        "minLength": 2,
                        "maxLength": 10,
                        "pattern": "",
                        "custom": "",
                        "customPrivate": false
                    },
                    "conditional": {
                        "show": "",
                        "when": null,
                        "eq": ""
                    },
                    "type": "textfield"
                }]
            }, {
                "components": [{
                    "input": true,
                    "tableView": true,
                    "inputType": "text",
                    "inputMask": "",
                    "label": "Last Name",
                    "key": "lastName",
                    "placeholder": "Enter your last name",
                    "prefix": "",
                    "suffix": "",
                    "multiple": false,
                    "defaultValue": "",
                    "protected": false,
                    "unique": false,
                    "persistent": true,
                    "validate": {
                        "required": true,
                        "minLength": 2,
                        "maxLength": 10,
                        "pattern": "",
                        "custom": "",
                        "customPrivate": false
                    },
                    "conditional": {
                        "show": "",
                        "when": null,
                        "eq": ""
                    },
                    "type": "textfield"
                }]
            }],
            "type": "columns",
            "conditional": {
                "show": "",
                "when": null,
                "eq": ""
            }
        };
        Object.assign(settings, overrides);
        return settings;
    };

    it('Should create the columns control.', () => {
        let settings: ColumnsOptions = getSettings({});
        let container = new ColumnsComponent(this.form, settings);
        var index = 0;
        expect(container.control instanceof FormControl).toEqual(true);

        // Iterate through each column and create the component.
        settings.columns.forEach((column: any) => {
            let components = new FormioComponentsComponent();
            components.components = column.components;
            components.form = this.form;
            column.components.forEach((comp: any) => {
                index++;
                let component = new FormioComponentComponent();
                component.component = comp;
                component.form = this.form;
                component.ngOnInit();
                component.form.controls[comp.key]['updateValue']('Test' + index);
                component.form.controls[comp.key]['markAsDirty']();
            });
        });
        expect(this.form.value).toEqual({firstName: 'Test1', lastName: 'Test2'});
    });
});