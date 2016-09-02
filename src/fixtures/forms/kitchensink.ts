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
                  "inputType": "checkbox",
                  "tableView": true,
                  "hideLabel": true,
                  "label": "Do you have a phone number?",
                  "key": "havePhoneNumber",
                  "defaultValue": false,
                  "protected": false,
                  "persistent": true,
                  "validate": {
                    "required": false
                  },
                  "type": "checkbox",
                  "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                  },
                  "lockKey": true
                },
                {
                  "input": true,
                  "tableView": true,
                  "inputMask": "(999) 999-9999",
                  "label": "Phone Number",
                  "key": "phoneNumber",
                  "placeholder": "",
                  "prefix": "",
                  "suffix": "",
                  "multiple": false,
                  "protected": false,
                  "unique": false,
                  "persistent": true,
                  "defaultValue": "",
                  "validate": {
                    "required": false
                  },
                  "type": "textfield",
                  "conditional": {
                    "show": "true",
                    "when": "havePhoneNumber",
                    "eq": "true"
                  }
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
                },
                {
                  "input": true,
                  "tableView": true,
                  "inputType": "number",
                  "inputMask": "",
                  "label": "Number",
                  "key": "number",
                  "placeholder": "Enter Number",
                  "prefix": "",
                  "suffix": "",
                  "multiple": false,
                  "defaultValue": 0,
                  "protected": false,
                  "unique": false,
                  "persistent": true,
                  "validate": {
                    "required": true,
                    "minLength": 2,
                    "maxLength": 10,
                    "custom": "",
                    "customPrivate": false
                  },
                  "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                  },
                  "type": "number"
                },
                {
                  "input": true,
                  "tableView": false,
                  "inputType": "password",
                  "label": "Password",
                  "key": "password",
                  "placeholder": "Enter Your Password",
                  "prefix": "$",
                  "suffix": "@",
                  "defaultValue": "",
                  "protected": true,
                  "persistent": true,
                  "type": "password",
                  "conditional": {
                    "show": null,
                    "when": null,
                    "eq": ""
                  },
                  "validate": {
                    "required": true,
                    "minLength": 8,
                    "maxLength": 20,
                    "pattern": "",
                    "custom": "",
                    "customPrivate": false
                  },
                  "unique": true
                }
              ]
            }
          ],
          "type": "columns",
          "key": "columns",
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
      "input": false,
      "numRows": 2,
      "numCols": 2,
      "rows": [
        [{"components": [ {
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
        } ],}, {"components": [ {
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
        } ],}],
        [{"components": [ {
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
        } ],}, {"components": [ {
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
        } ],}]
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
    },
    {
      "input": true,
      "tableView": true,
      "label": "Textarea",
      "key": "textarea",
      "placeholder": "Enter Your Text Here",
      "prefix": "$",
      "suffix": "@",
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
    },
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
      "tableView": true,
      "inputType": "radio",
      "label": "Options",
      "key": "radio",
      "values": [
        {
          "value": "1",
          "label": "option1"
        },
        {
          "value": "2",
          "label": "option2"
        },
        {
          "value": "3",
          "label": "option3"
        }
      ],
      "defaultValue": true,
      "protected": false,
      "persistent": true,
      "validate": {
        "required": false,
        "custom": "",
        "customPrivate": false
      },
      "type": "radio",
      "inline": false,
      "multiple":false,
      "conditional": {
        "show": null,
        "when": null,
        "eq": ""
      }
    },
    {
          "input": false,
          "tableView": true,
          "legend": "FieldSet",
          "type": "fieldset",
          "conditional": {
              "show": null,
              "when": null,
              "eq": ""
          },
          "components": [{
              "input": true,
              "tableView": true,
              "inputType": "text",
              "inputMask": "",
              "label": "FirstName",
              "key": "firstName",
              "placeholder": "Enter FirstName",
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
              "conditional": {
                  "show": null,
                  "when": null,
                  "eq": ""
              },
              "type": "textfield"
          },
              {
                  "input": true,
                  "tableView": true,
                  "inputType": "text",
                  "inputMask": "",
                  "label": "LastName",
                  "key": "lastName",
                  "placeholder": "Enter LastName",
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
                  "conditional": {
                      "show": null,
                      "when": null,
                      "eq": ""
                  },
                  "type": "textfield"
              }]
      },
    {
      "input": true,
      "tableView": true,
      "inputType": "text",
      "inputMask": "",
      "customClass": "customClass",
      "multiple": false,
      "label": "Currency",
      "key": "currency",
      "placeholder": "currency",
      "prefix": "$",
      "suffix": "@",
      "defaultValue": "",
      "protected": false,
      "persistent": true,
      "validate": {
        "required": false,
        "multiple": "",
        "custom": ""
      },
      "conditional": {
        "show": null,
        "when": null,
        "eq": ""
      },
      "type": "currency",
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
      "input": false,
      "title": "Panel",
      "theme": "primary",
      "components": [{
        "input": true,
        "tableView": true,
        "inputType": "text",
        "inputMask": "",
        "label": "Name",
        "key": "name",
        "placeholder": "Enter your Name",
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
      },{
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
      "type": "panel",
      "conditional": {
        "show": null,
        "when": null,
        "eq": ""
      }
    },
    {
      "input": true,
      "tableView": true,
      "key": "name",
      "label": "Name",
      "protected": false,
      "unique": true,
      "persistent": true,
      "type": "hidden",
      "conditional": {
        "show": true,
        "when": "",
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
