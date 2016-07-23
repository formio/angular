Form.io Angular 2 Renderer
---------------------------
This library serves as a Dynamic JSON Powered Form rendering library for [Angular 2](https://angular.io). This works by
providing a JSON schema to a ```<formio>``` Angular 2 component, where that form is dynamically rendered within the front
end application. This allows forms to be dynamically built using JSON schemas.

Here is an example of how this library could be used.

```
<formio [form]="{
    title: 'My Test Form',
    components: [
        {
            "type": "textfield",
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
            }
        },
        {
            "type": "textfield",
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
}"></formio>
```

This is a very simple example. This library is capable of building very complex forms which include e-signatures, columns,
panels, field conditionals, validation requirements, and the list goes on and on.

Developing
------------------
To develop within this library, you will need to clone this repo, and then open up your terminal and type the following.

```
npm install
```

You can then run the base application by running the following.

```
npm start
```

The application will now be running @ http://localhost:8080.

You can run tests by typing the following.

```
npm test
```