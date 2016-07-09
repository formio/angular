import { Injectable, Type } from '@angular/core';
import { FormioForm } from '../formio/formio.component';
@Injectable()
export class FormService extends Type {
    getForm() : FormioForm {
        return {
            title: 'Test Form',
            template: 'bootstrap',
            components: [{
                "lockKey": true,
                "conditional": {
                    "eq": "",
                    "when": null,
                    "show": ""
                },
                "type": "container",
                "persistent": true,
                "protected": false,
                "key": "user",
                "label": "",
                "tableView": true,
                "components": [{
                    "conditional": {
                        "eq": "",
                        "when": null,
                        "show": ""
                    },
                    "type": "columns",
                    "columns": [{
                        "components": [{
                            "type": "textfield",
                            "conditional": {
                                "eq": "",
                                "when": null,
                                "show": ""
                            },
                            "validate": {
                                "customPrivate": false,
                                "custom": "",
                                "pattern": "",
                                "maxLength": "",
                                "minLength": "",
                                "required": true
                            },
                            "persistent": true,
                            "unique": false,
                            "protected": false,
                            "defaultValue": "",
                            "multiple": false,
                            "suffix": "",
                            "prefix": "",
                            "placeholder": "Enter your first name",
                            "key": "firstName",
                            "label": "First Name",
                            "inputMask": "",
                            "inputType": "text",
                            "tableView": true,
                            "input": true
                        }]
                    }, {
                        "components": [{
                            "type": "textfield",
                            "conditional": {
                                "eq": "",
                                "when": null,
                                "show": ""
                            },
                            "validate": {
                                "customPrivate": false,
                                "custom": "",
                                "pattern": "",
                                "maxLength": 10,
                                "minLength": 2,
                                "required": true
                            },
                            "persistent": true,
                            "unique": false,
                            "protected": false,
                            "defaultValue": "",
                            "multiple": false,
                            "suffix": "",
                            "prefix": "",
                            "placeholder": "Enter your last name",
                            "key": "lastName",
                            "label": "Last Name",
                            "inputMask": "",
                            "inputType": "text",
                            "tableView": true,
                            "input": true
                        }]
                    }],
                    "input": false
                }],
                "tree": true,
                "input": true
            }, {
                "type": "button",
                "theme": "primary",
                "disableOnInvalid": true,
                "action": "submit",
                "block": false,
                "rightIcon": "",
                "leftIcon": "",
                "size": "md",
                "key": "submit",
                "tableView": false,
                "label": "Submit",
                "input": true
            }]
        };
    }
}