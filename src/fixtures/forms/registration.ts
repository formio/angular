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
