import { describe, expect, it } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { ColumnsComponent, ColumnsOptions } from './columns';

describe('ColumnsComponent', () => {
    beforeEach(() => {
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

    it('Should create the container control.', () => {
        let settings: ColumnsOptions = getSettings({});
        let container = new ColumnsComponent(this.form, settings);
        expect(container.control instanceof FormControl).toEqual(true);
    });
});