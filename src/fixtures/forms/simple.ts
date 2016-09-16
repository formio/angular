export const FORM: any = {
  "title": "Simple Form",
  "components": [
      {
          "input": true,
          "tableView": true,
          "label": "Fruits",
          "key": "fruits",
          "placeholder": "Select favourite",
          "data": {
              "values": [
                  {
                      "value": "opt1",
                      "label": "mango"
                  },
                  {
                      "value": "opt2",
                      "label": "apple"
                  },
                  {
                      "value": "opt3",
                      "label": "pineapple"
                  },
                  {
                      "value": "opt4",
                      "label": "grapes"
                  }],
              "json": [
                  {
                      "label": "one",
                      "test": "opt1"
                  },
                  {
                      "label": "two",
                      "test": "opt2"
                  },
                  {
                      "label": "three",
                      "test": "opt3"
                  }],
              "url": "https://api.github.com/users/hadley/orgs",
              "resource": "manager"
          },
          "dataSrc": "values",
          "valueProperty": "",
          "defaultValue": "",
          "refreshOn": "",
          "filter": "",
          "authenticate": false,
          "template": "<span>{{ item.label }}</span>",
          "multiple": true,
          "protected": false,
          "unique": false,
          "persistent": true,
          "validate": {
              "required": false
          },
          "type": "select",
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
