Form.io Angular 2 Renderer
---------------------------
This library serves as a Dynamic JSON Powered Form rendering library for [Angular 2](https://angular.io). This works by
providing a JSON schema to a ```<formio>``` Angular 2 component, where that form is dynamically rendered within the front
end application. This allows forms to be dynamically built using JSON schemas.

Example
---------------------------
You can easily render a form within your Angular 2 application by referencing the URL of that form as follows.

```
<formio src='https://examples.form.io/example'></formio>
```

You can also pass the JSON form directly to the renderer as follows.

```
<formio [form]='{
    "title": "My Test Form",
    "components": [
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
}'></formio>
```

This is a very simple example. This library is capable of building very complex forms which include e-signatures, columns,
panels, field conditionals, validation requirements, and the list goes on and on.

Usage
----------------
To use this library within your project, you will first need to install it as a dependency.

```
npm install --save ng2-formio
```

You can now include the module in your Angular 2.0 application like so.

```
import { FormioModule } from 'ng2-formio';
@NgModule({
    imports: [ BrowserModule, ReactiveFormsModule, FormioModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
```

Application Starter Kit
----------
For help in getting started using this library, we created the [ng2-app-starterkit](https://github.com/formio/ng2-app-starterkit) repository to help you get started with best practices with using Form.io within an Angular 2 application.

Inputs
----------
The inputs for the ```<formio>``` directive allow you to control how the form renderer behaves. For example, to set the ```submission``` of a form (which will pre-populate the form with data), you can provide the following code which will set the form.

```html
<formio src="https://examples.form.io/example" [submission]='{
  "data": {
    "firstName": "Joe",
    "lastName": "Smith",
    "email": "joe@example.com"
  }
}'></formio>
```

The following inputs are accepted.

<table>
    <thead>
        <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
    </thead>
    <tr>
        <td>src</td>
        <td>To set the source URL of the form (or submission) to be rendered. Example: <code>src="https://examples.form.io/example"</code></td>
    </tr>
    <tr>
        <td>form</td>
        <td>To render the JSON schema of a form. Example: <code>[form]='{"components":[...]}'</code></td>
    </tr>
    <tr>
        <td>submission</td>
        <td>The submission JSON to pre-poulate the form. Example: <code>[submission]='{"data": {"name": "Joe Smith"}}'</code></td>
    </tr>
    <tr>
        <td>service</td>
        <td>Your own instance of the <a href="https://github.com/formio/ng2-formio/blob/master/src/formio.service.ts">FormioService</a> object to perform the requests.</td>
    </tr>
    <tr>
        <td>readOnly</td>
        <td>Make the form (and submission) read only. Great for when you are rendering a previous submission that should not be editable.</td>
    </tr>
    <tr>
        <td>options</td>
        <td>A JSON object of the follwoing options.
            <table>
                <tr>
                    <td>hooks</td>
                    <td>Hooks that allow you to hook into the behavior of the form directly. For now there are only the following.
                        <ul>
                        <li><strong>beforeSubmit</strong> - Called before the form submits. See section below on <strong>Hooking into form submissions.</strong></li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>alerts</td>
                    <td>Provide configuration for the alters that are triggered.
                        <ul>
                        <li><strong>submitMessage</strong> - Provide the submit message that is shown when the form submits.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>errors</td>
                    <td>Provide configuration for the errors that are triggered.
                        <ul>
                        <li><strong>message</strong> - Provide the submit message that is shown when an error occurs.</li>
                        </ul>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

### Hooking into Form Submissions
Let's suppose you need to hook into the Form submission, make a call to your own service to perform a custom validation on that submission, and then when your validation passes, allow the submission to be handled. You may also want to tell the form that an error occurred within the Form submission and then provide the error. To do this, you will need to provide the ```options.hooks.beforeSubmit``` callback, which works as follows.

```html
<formio src='https://examples.form.io/example' options='{
  "hooks": {
    "beforeSubmit": function(submission, callback) {
        console.log(submission);
        // Do something asynchronously.
        setTimeout(function() {
          // Callback with a possibly manipulated submission.
          callback(null, submission);
        }, 1000);
    }
  }
}'></formio>
```

You may also wish to provide your own custom error.

```html
<formio src='https://examples.form.io/example' options='{
  "hooks": {
    "beforeSubmit": function(submission, callback) {
        console.log(submission);
        // Do something asynchronously.
        setTimeout(function() {
          // Callback with a possibly manipulated submission.
          callback({
            message: "Something bad happened.",
            component: null
          }, null);
        }, 1000);
    }
  }
}'></formio>
```

Outputs (Events)
------------
With the ```<formio>``` directive, you can register for a number of different events that fire as the Form is being used and submitted. These events can be attached with the typical Angular 2 way using the following syntax.

```
<formio src="https://examples.form.io/example" (submit)="onSubmit($event)"></formio>
```

The following events are provided.

<table>
    <thead>
        <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
    </thead>
    <tr>
        <td>(submit)</td>
        <td>Called when the form is submitted. The submission object is passed to the callback function.</td>
    </tr>
    <tr>
        <td>(render)</td>
        <td>Called when the form is done rendering.</td>
    </tr>
    <tr>
        <td>(beforeSubmit)</td>
        <td>Called before a submission is made. The submission object is passed to the callback function. <strong>Note: </strong> If you need to manipulate the data, or even provide custom validations, then you should use the <code>options.hooks.beforeSubmit</code> handler instead. See documentation above.</td>
    </tr>
    <tr>
        <td>(change)</td>
        <td>Called when the form has been changed as in when someone is filling it out.</td>
    </tr>
    <tr>
        <td>(invalid)</td>
        <td>Called when the form is invalid.</td>
    </tr>
</table>

For an example of an application using Form.io, you can look at the [Examples Folder](https://github.com/formio/ng2-formio/tree/master/example)

Try it out
-----------------
To see this working within a live application, you can clone our fork of the amazing [ng2-admin](https://github.com/formio/ng2-admin) theme. Then do the following.

```
npm install
npm start
```

You can now see the Form.io section within the **Forms | Dynamic Forms** section. 

For a visual of the changes that needed to happen to incorporate Form.io into this theme, then [take a look at the following diff](https://github.com/formio/ng2-admin/compare/20031c3980a57291c211dee669b36e933adb751e...master)


Using with Form.io
-----------------
<a href="https://form.io" target="_blank">Form.io</a> is a combined form and data management API platform created for developers who are building "Serverless" form-based applications.  Form.io provides an easy drag-and-drop form builder workflow allowing you to build complex forms for enterprise applications quickly and easily. These forms are then embedded directly into your application with a single line of code that dynamically renders the form (using Angular or React) in your app while at the very same time generating the RESTful API to support those forms. The Form.io platform also offers numerous 3rd-party services that are fully integrated into the form building process allowing you to extend the power and capability of your apps while saving time and effort.

You can use this renderer with Form.io by simply pointing the ```src``` parameter to the URL of the form. For example, the following URL points to the JSON schema of a form built on Form.io.

  https://pjmfogrfqptslvi.form.io/test
  
To render this form, you simply provide that URL to the ```<formio>``` directive like so.

```<formio src="https://pjmfogrfqptslvi.form.io/test"></formio>```

Not only will this render the form, but it will also submit that form to the provided API endpoint.

