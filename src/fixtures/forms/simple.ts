export const FORM: any = {
    "title": "Simple Form",
    "components": [
        {
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
        },
        {
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
        },
        {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": true,
            "theme": "primary",
            "type": "button"
        }
    ]
};
