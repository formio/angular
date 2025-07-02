Form.io Angular JSON Form Renderer
==========================
This library serves as a Dynamic JSON Powered Form rendering library for [Angular](https://angular.io). This works by
providing a JSON schema to a ```<formio>``` Angular component, where that form is dynamically rendered within the front
end application. This allows forms to be dynamically built using JSON schemas.

Angular Versions
-------------------------
This library supports many different Angular Versions. If you wish to use this library with your specific version of Angular, then you will need to install the following versions.


*Angular Compatibility*
| **@formio/angular** | **Angular Version** | **formiojs*** |
|---------------------|---------------------|--------------|
| 6.0.0               | 16                  | 4.x          |
| 6.5.0               | 16                  | 5.x          |
| 7.0.0               | 17                  | 4.x          |
| 7.5.0               | 17                  | 5.x          |
| 8.0.0               | 18                  | 5.x          |
| 9.0.0               | 19                  | 5.x          |

_*Note: The formiojs namespace changes from formiojs (4.x) to @formio/js (5.x)_

## Angular 17
Angular 17 versions are currently released as "latest" so you can install with Angular 17 with the following commands.

### NPM
    npm install --save @formio/angular

### Yarn
    yarn add --save @formio/angular

## Angular 16
### NPM
    npm install --save @formio/angular@a16

### Yarn
    yarn add --save @formio/angular@a16

Running Demo
--------------------------
To run a demo of the Form.io Angular renderer, please follow these steps.
 
 1. Make sure you have the [Angular CLI](https://angular.io) installed on your machine.
 2. Download the [Angular Demo Application](https://github.com/formio/angular-demo) to your computer.
 3. With your terminal, type ```npm install```
 4. Now type ```ng serve```
 
This will startup an example application where you can see all the features provided by this module.

Here is the hosted demo application [https://formio.github.io/angular-demo/](https://formio.github.io/angular-demo)

### Note: If you wish to see the Angular Demo for Angular 16, then use the 6.0.x branch of this repo.

Using within your application
---------------------------
You can easily render a form within your Angular application by referencing the URL of that form as follows.

```html
<formio src='https://examples.form.io/example'></formio>
```

You can also pass the JSON form directly to the renderer as follows.

```html
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
npm install --save @formio/angular@rc @formio/js
```

You can now include the module in your Angular application like so.

```js
import { FormioModule } from '@formio/angular';
@NgModule({
    imports: [ BrowserModule, CommonModule, FormioModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
```

Bootstrap Versions
-----------------
By default, this library will use Bootstrap 5 as the template and rendering CSS framework. This, however, can be changed by adding different templates into your application and using them like the following.

```
npm install --save @formio/bootstrap@rc
```

Then perform the following in your application.

```
import { Formio } from '@formio/angular';
import bootstrap4 from '@formio/bootstrap/bootstrap4';
(Formio as any).use(bootstrap4);
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

Demo Application
----------
If you would like to run a demonstration of all the features of this module, then you can check out the [Angular Demo Application](https://github.com/formio/angular-demo), which is the code behind the following hosted application @ [https://formio.github.io/angular-demo](https://formio.github.io/angular-demo)

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

About Form.io
-----------------
<a href="https://form.io" target="_blank">Form.io</a> is a combined form and data management API platform created for developers who are building "Serverless" form-based applications.  Form.io provides an easy drag-and-drop form builder workflow allowing you to build complex forms for enterprise applications quickly and easily. These forms are then embedded directly into your application with a single line of code that dynamically renders the form (using Angular or React) in your app while at the very same time generating the RESTful API to support those forms. The Form.io platform also offers numerous 3rd-party services that are fully integrated into the form building process allowing you to extend the power and capability of your apps while saving time and effort.

You can use this renderer with Form.io by simply pointing the ```src``` parameter to the URL of the form. For example, the following URL points to the JSON schema of a form built on Form.io.

  https://pjmfogrfqptslvi.form.io/test
  
To render this form, you simply provide that URL to the ```<formio>``` directive like so.

```<formio src="https://pjmfogrfqptslvi.form.io/test"></formio>```

Not only will this render the form, but it will also submit that form to the provided API endpoint.
