"use strict";
exports.FORM = { "_id": "57981520ff9b236800b09b31", "modified": "2016-07-27T01:57:53.025Z", "title": "Test Form", "display": "form", "type": "form", "name": "testForm", "path": "test", "project": "579814a4ff9b236800b09b22", "created": "2016-07-27T01:57:52.976Z", "components": [{
            "input": false,
            "numRows": 2,
            "numCols": 2,
            "rows": [
                [{
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
                                    "required": false,
                                    "minLength": 6,
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
                            }],
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
                                    "required": false,
                                    "minLength": 6,
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
                            }],
                    }],
                [{
                        "components": [{
                                "type": "email",
                                "persistent": true,
                                "unique": false,
                                "protected": false,
                                "defaultValue": "",
                                "suffix": "",
                                "prefix": "",
                                "placeholder": "Enter your email address",
                                "key": "email",
                                "label": "Email",
                                "inputType": "email",
                                "tableView": true,
                                "input": true
                            }],
                    }, {
                        "components": [{
                                "input": true,
                                "inputType": "checkbox",
                                "tableView": false,
                                "hideLabel": true,
                                "label": "Checkbox",
                                "key": "checkbox",
                                "defaultValue": true,
                                "protected": false,
                                "persistent": true,
                                "validate": {
                                    "required": false
                                },
                                "type": "checkbox",
                                "conditional": {
                                    "show": null,
                                    "when": null,
                                    "eq": ""
                                }
                            }],
                    }]
            ],
            "header": [],
            "caption": "",
            "striped": true,
            "bordered": true,
            "hover": true,
            "condensed": false,
            "type": "table",
            "conditional": {
                "show": null,
                "when": null,
                "eq": ""
            }
        }], "owner": "553dbfc08d22d5cb1a7024f2", "submissionAccess": [], "access": [{ "type": "read_all", "roles": ["579814a4ff9b236800b09b23", "579814a4ff9b236800b09b24", "579814a5ff9b236800b09b25"] }], "tags": [] };
//# sourceMappingURL=test.js.map