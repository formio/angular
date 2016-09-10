export const FORM: any = {
  "title": "Simple Form",
  "components": [
      {
          "input": false,
          "type": "well",
          "key": "Well",
          "lockKey": true,
          "components": [{
              "input": true,
              "tableView": true,
              "inputType": "text",
              "inputMask": "",
              "label": "Textfield",
              "key": "text",
              "placeholder": "Enter your text",
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
          }, {
              "input": true,
              "tableView": true,
              "label": "Textarea",
              "key": "textarea",
              "placeholder": "Enter Your Text Here",
              "prefix": "",
              "suffix": "",
              "rows": 3,
              "multiple": false,
              "defaultValue": "",
              "protected": false,
              "persistent": true,
              "validate": {
                  "required": true,
                  "minLength": 5,
                  "maxLength": 100,
                  "pattern": "",
                  "custom": ""
              },
              "type": "textarea",
              "conditional": {
                  "show": null,
                  "when": null,
                  "eq": ""
              }
          }],
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
      "disableOnInvalid": true,
      "theme": "primary",
      "type": "button"
    }
  ]
};
