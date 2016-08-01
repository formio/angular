export const FORM: any = {
  "title": "Registration Form",
  "components": [
    {
      "input": true,
      "tree": true,
      "components": [
        {
          "input": false,
          "columns": [
            {
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
                }
              ]
            },
            {
              "components": [
                {
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
                }
              ]
            }
          ],
          "type": "columns",
          "conditional": {
            "show": "",
            "when": null,
            "eq": ""
          }
        },
        {
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
            "required": false
          },
          "persistent": true,
          "unique": false,
          "protected": false,
          "defaultValue": "",
          "multiple": true,
          "suffix": "",
          "prefix": "",
          "placeholder": "Enter your kids names",
          "key": "kids",
          "label": "Kids",
          "inputMask": "",
          "inputType": "text",
          "tableView": true,
          "input": true
        }
      ],
      "tableView": true,
      "label": "",
      "key": "user",
      "protected": false,
      "persistent": true,
      "type": "container",
      "conditional": {
        "show": "",
        "when": null,
        "eq": ""
      },
      "lockKey": true
    },
    {
      "input": true,
      "tree": true,
      "components": [{
        "input": true,
        "tableView": true,
        "inputType": "text",
        "inputMask": "",
        "label": "Make",
        "key": "make",
        "placeholder": "Chevy, Ford, etc.",
        "prefix": "",
        "suffix": "",
        "multiple": false,
        "defaultValue": "",
        "protected": false,
        "unique": false,
        "persistent": true,
        "validate": {
          "required": false,
          "minLength": "",
          "maxLength": "",
          "pattern": "",
          "custom": "",
          "customPrivate": false
        },
        "conditional": {"show": "", "when": null, "eq": ""},
        "type": "textfield",
        "hideLabel": true
      }, {
        "input": true,
        "tableView": true,
        "inputType": "text",
        "inputMask": "",
        "label": "Model",
        "key": "model",
        "placeholder": "Tahoe, F-150, etc.",
        "prefix": "",
        "suffix": "",
        "multiple": false,
        "defaultValue": "",
        "protected": false,
        "unique": false,
        "persistent": true,
        "validate": {
          "required": false,
          "minLength": "",
          "maxLength": "",
          "pattern": "",
          "custom": "",
          "customPrivate": false
        },
        "conditional": {"show": "", "when": null, "eq": ""},
        "type": "textfield",
        "hideLabel": true
      }, {
        "input": true,
        "tableView": true,
        "inputType": "text",
        "inputMask": "",
        "label": "Year",
        "key": "year",
        "placeholder": "2014, 2015, etc",
        "prefix": "",
        "suffix": "",
        "multiple": false,
        "defaultValue": "",
        "protected": false,
        "unique": false,
        "persistent": true,
        "validate": {
          "required": false,
          "minLength": "",
          "maxLength": "",
          "pattern": "",
          "custom": "",
          "customPrivate": false
        },
        "conditional": {"show": "", "when": null, "eq": ""},
        "type": "textfield",
        "hideLabel": true
      }],
      "tableView": true,
      "label": "Cars",
      "key": "cars",
      "protected": false,
      "persistent": true,
      "type": "datagrid",
      "conditional": {"show": "", "when": null, "eq": ""},
      "striped": true,
      "bordered": true
    },
    {
      "input": true,
      "inputType": "checkbox",
      "tableView": false,
      "hideLabel": true,
      "label": "Checkbox",
      "key": "checkbox",
      "defaultValue": '',
      "protected": false,
      "persistent": true,
      "validate": {
        "required": true
      },
      "type": "checkbox",
      "conditional": {
        "show": null,
        "when": null,
        "eq": ""
      }
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
      "disableOnInvalid": false,
      "theme": "primary",
      "type": "button"
    }
  ]
};
