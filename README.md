Form.io Angular JSON Form Renderer
==========================
This library serves as a Dynamic JSON Powered Form rendering library for [Angular](https://angular.io). This works by
providing a JSON schema to a ```<formio>``` Angular component, where that form is dynamically rendered within the front
end application. This allows forms to be dynamically built using JSON schemas.

Running Demo
--------------------------
To run a demo of the Form.io Angular renderer, please follow these steps.

 1. Download this repo to your local computer.
 2. With your terminal, type ```npm install```
 3. Now type ```npm run demo```
 
This will startup an example application where you can see all the features provided by this module.

Using within your application
---------------------------
You can easily render a form within your Angular 4 application by referencing the URL of that form as follows.

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
npm install --save angular-formio
```

You can now include the module in your Angular application like so.

```
import { FormioModule } from 'angular-formio';
@NgModule({
    imports: [ BrowserModule, ReactiveFormsModule, FormioModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
```

Included Libraries
-----------------
This library is a combination of multiple libraries that enable rapid Serverless application development using Form.io. These libraries are as follows.

1. [Form Renderer](https://github.com/formio/angular-formio/wiki/Form-Renderer) - The form renderer in Angular
2. [Form Builder](https://github.com/formio/angular-formio/wiki/Form-Builder) - The form builder in Angular
3. [Form Manager](https://github.com/formio/angular-formio/wiki/Form-Mananger) - The form management application used to manage forms.
4. [Authentication](https://github.com/formio/angular-formio/wiki/User-Authentication) - Allows an easy way to provide Form.io authentication into your application.
5. [Resource](https://github.com/formio/angular-formio/wiki/Resource-Management) - A way to include the Resources within your application with full CRUDI support (Create, Read, Update, Delete, Index)
6. [Data Table (Grid)](https://github.com/formio/angular-formio/wiki/Data-Table) - A way to render data within a Table format, which includes pagination, sorting, etc.

Click on each of those links to read more about how they work and how to utilize them to their fullest potential.

Application Starter Kit
----------
For help in getting started using this library, we created the [angular-app-starterkit](https://github.com/formio/angular-app-starterkit) repository to help you get started with best practices with using Form.io within an Angular application. You can try this applicatoin by downloading that application and then doing the following.

```
npm install
npm start
```

Full Documentation
------------------
To read up on the full documentation of this library, please check out the [Wiki Page](https://github.com/formio/angular-formio/wiki)

Running in Docker
------------------

Install Docker, then:

```
docker build -t af .
docker run -p 8000:8000 af
```

To stop a container:

```
docker ps  #show list of running containers
docker stop <container id>
```

You should be able to access the app at http://localhost:8000. If it isn't acessible, add this line to webpack.config.ts and restart:

```
        devServer: {
            host: '0.0.0.0',  // ADD THIS
            port: 8000,
            inline: true,
            hot: true,
            historyApiFallback: true,
            overlay: true
        },
```

About Form.io
-----------------
<a href="https://form.io" target="_blank">Form.io</a> is a combined form and data management API platform created for developers who are building "Serverless" form-based applications.  Form.io provides an easy drag-and-drop form builder workflow allowing you to build complex forms for enterprise applications quickly and easily. These forms are then embedded directly into your application with a single line of code that dynamically renders the form (using Angular or React) in your app while at the very same time generating the RESTful API to support those forms. The Form.io platform also offers numerous 3rd-party services that are fully integrated into the form building process allowing you to extend the power and capability of your apps while saving time and effort.

You can use this renderer with Form.io by simply pointing the ```src``` parameter to the URL of the form. For example, the following URL points to the JSON schema of a form built on Form.io.

  https://pjmfogrfqptslvi.form.io/test
  
To render this form, you simply provide that URL to the ```<formio>``` directive like so.

```<formio src="https://pjmfogrfqptslvi.form.io/test"></formio>```

Not only will this render the form, but it will also submit that form to the provided API endpoint.
