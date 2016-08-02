***This library is currently in pre-release and is not yet feature complete.***

***Expected BETA release will be Sept. 1, 2016***

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

Using with Form.io
-----------------
<a href="https://form.io" target="_blank">Form.io</a> is a combined form and data management API platform created for developers who are building "Serverless" form-based applications.  Form.io provides an easy drag-and-drop form builder workflow allowing you to build complex forms for enterprise applications quickly and easily. These forms are then embedded directly into your application with a single line of code that dynamically renders the form (using Angular or React) in your app while at the very same time generating the RESTful API to support those forms. The Form.io platform also offers numerous 3rd-party services that are fully integrated into the form building process allowing you to extend the power and capability of your apps while saving time and effort.

You can use this renderer with Form.io by simply pointing the ```src``` parameter to the URL of the form. For example, the following URL points to the JSON schema of a form built on Form.io.

  https://pjmfogrfqptslvi.form.io/test
  
To render this form, you simply provide that URL to the ```<formio>``` directive like so.

```<formio src="https://pjmfogrfqptslvi.form.io/test"></formio>```

Not only will this render the form, but it will also submit that form to the provided API endpoint.

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
