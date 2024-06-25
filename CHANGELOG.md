# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 8.0.0-rc.2
### Changed
 - Angular 18 upgrade
 - Update renderer to 5.x
    
## 7.5.0-rc.2
### Changed
 - Bump follow-redirects from 1.15.4 to 1.15.6
 - Bump es5-ext from 0.10.62 to 0.10.64
 - Bump ip from 2.0.0 to 2.0.1
 - Bump follow-redirects from 1.15.3 to 1.15.4
 - FIO-8004: Fixed loader incorrectly showing in embed reports
 - Bump webpack-dev-middleware from 5.3.3 to 5.3.4
 - FIO-7507: Publish dev tag to npm 

### Fixed
 - FIO-7443: Fixes authorization error recieved after logout, not allowшng to log in again
 - FIO-7369: fixed issue with draft state submission
 - Fixing General access to Manager using formadmin formbuilder roles
 - FIO-7611: DataSource not Triggering on change events due to fromSubmission Flag
 - fixed issue with providing form type   
   
## 7.5.0-rc.1
### Breaking Changes
 - This version supports Angular 17 with the 5.x Renderer. To use Angular 16 with the 5.x renderer, you will need to install this version and then use the following in your application.

```
npm install @formio/js
```

## 7.0.0
### Breaking Changes
 - This version supports Angular 17 with the 4.x Renderer. You would use this version along with this command to install the renderer.

```
npm install formiojs
```

## 6.5.0
### Breaking Changes
 - This version uses the 5.x version of the @formio/js renderer. To use Angular 16 with the 5.x renderer, you will need to install this version and then use the following in your application.

```
npm install @formio/js
```

## 6.0.0
### Breaking Changes
 - Version 6.0 will official deprecate the Custom Components using Angular Elements feature. https://github.com/formio/angular/wiki/Custom-Components-with-Angular-Elements.  If you wish to still use this feature, you will need to manually migrate the component code provided @ https://github.com/formio/angular/tree/5.5.x/projects/angular-formio/src/custom-component into your own application.

 - The **FormioAppConfig** now uses InjectionTokens to properly instantiate the FormioAppConfig class with the proper setBaseUrl and setProjectUrl's.  This technically is not a "breaking" change since nothing should ever really change from your applications. The only thing that is different, however, is that as soon as you inject the FormioAppConfig into your application, it will have already configured the "Formio" class to point to the correct base and project url configurations. To read about InjectionToken's please read https://angular.io/api/core/InjectionToken for information on how this works.

 As with before 6.x, you can provide configurations using the following method.

**app.module.ts**
```ts
import { AppConfig } from './app.config';

@NgModule({
  ...
  providers: [
    {provide: FormioAppConfig, useValue: {
      baseUrl: 'https://api.form.io',
      projectUrl: 'https://myproject.form.io'
    }},
    ...
  ]
})
export class AppModule { }
```

What changes is that this "useValue" becomes the InjectionToken to the FormioAppConfig class, which will now properly instantiate the class with the correct base and project urls.

### New Features
 - 6.x now introduces a new way to easily embed form's, form builders, and the reporting ui into your applications. This leverages the new lazy-loading rendering method described @ https://github.com/formio/formio.js. To use this method, you can do the following within your applications.

 ```ts
 import { FormioEmbedModule } from '@formio/angular/embed';
 
 @NgModule({
   imports: [
    ...,
    FormioEmbedModule
   ]
 })
 ```

 You can now easily embed a lasy-loaded form renderer into your application using the following.

 ```html
 <formio src="https://examples.form.io/example"></formio>
 ```

 The difference between this and the previous method of embedding is that this will only add approximatly 20kb to your application build size since the renderer is lazy-loaded at runtime.

### Changed
 - Upgrade to Angular 16
 - Upgrade to Bootstrap 5
 - Fixed resource module to streamline loading and unloading resources.
 - FIO-6493: added wrapper for the formio report

### Fixed
 - FIO-6197: fixed issue with valid token after logging off
 - FIO-7232 removed permissions button from FormGridBody

## 5.5.0-rc.10
### Changed
 - Upgrade dependencies.

### Fixed
 - fix common ComponentOptions interface for angular 15
 - FIO-6117: fixed an issue where submitDone event is not emitted after submission is saved (need for boxsign action)
 - Fixed change event undefined on template issue

## 5.5.0-rc.9
### Fixed
 - FIO-5042: Logout Oauth Feature
 - Fixing issue where the validation is triggering on pristine forms.

## 5.4.0-rc.2
### Fixed
 - FIO-5423: Reseting the Display after on change

## 5.4.0-rc.1
### Changed
 - Upgrade to Angular 14
 - set renderMode to html when viewOnly flag is set to true
 - FIO-5278: added component instance to Event object
 - FIO-4655: update FJS to fix tippyjs tooltips in formmanager
 - Exporting the custom-tag-service.ts service.
 - Toggle to hide the loading spinner

## 5.3.0
### Changed
 - Official Release off of 5.3.0-rc.3

## 5.3.0-rc.3
### Changed
 - Rebiuld.

### Fixed
 - FIO-4925: Fixes not whole submission present for wizard
 - FIO-5128: allow support for data table row based events for angular formio component
 - FIO-5128 fixed rowClick event
 - FIO-5147: added custom actions and select rows 
 - FIO-5172: Fixes validation errors shown on form load in apps
 - FIO-5307: Fixes ckeditor recreated multiple times on form save

## 5.2.2
### Changed
 - Official Release

## 5.2.1-rc.2
### Changed
 - No changes.

## 5.2.1-rc.1
### Fixed
 - FIO-3969: Initialize the noeval flag correctly.

## 5.2.0
### Changed
 - Official Release
 - Upgrade formiojs@4.13.8
 - Upgrade @angular-devkit/build-angular@12.2.10 @angular/animations@12.2.10 @angular/cli@12.2.10 @angular/common@12.2.10 @angular/compiler@12.2.10 @angular/compiler-cli@12.2.10 @angular/core@12.2.10 @angular/elements@12.2.10 @angular/forms@12.2.10 @angular/platform-browser@12.2.10 @angular/platform-browser-dynamic@12.2.10 @angular/router@12.2.10 ng-packagr@12.2.3 @types/jasmine@3.10.0 jasmine-core@3.10.0 rxjs@7.4.0 ts-node@10.3.0

## 5.2.0-rc.2
### Fixed
 - FIO-3659: Previous Submission in New Submission

## 5.2.0-rc.1
### Changed
 - Adding Angular 12 support.
 - Upgrade dependencies.

### Fixed
 - FMG-108: remove reloading of PDF form after editing
 - Cherry-pick of VPAT-755 Added title to delete buttons in forms grid
 - FMG-15: Routes for manager and permissions

## 5.1.1
### Changed
 - No changes. Released 5.1.1-rc.1 as official release.

## 5.1.1-rc.1
### Added
 - FIO-2841 Added event parameter to onSearch for event usage in FMG
 - FIO-1178: add timeSince lines

### Fixed
 - FIO-2686: Date Time is not attaching timezone metadata to the submission

## 5.1.0
### Changed
 - Upgrade formiojs@4.13.0

## 5.0.3-rc.2
### Changed
 - Upgrade formiojs@4.13.0-rc.20

### Fixed
 - FIO-1482: fixed an issue where form submission object is not updated after submitting and new submission is created after each submission editing

## 5.0.3-rc.1
### Fixed
 - Fix search error during typing and fixing unexpected validation errors
 
### Changed
 - FIO-1178: add classes for customization

## 5.0.2
 - Upgrade formiojs@4.12.7

## 5.0.1
 - Upgrade formiojs@4.12.7
 
## 5.0.1-rc.5
### Fixed
 - Reverse compatibility issue with the Form Manager Delete component.

## 5.0.1-rc.4
### Fixed
 - FMG-131: fix removing a form from the list when it is the only one on the page.

## 5.0.1-rc.3
### Fixed
 - Published package.

## 5.0.1-rc.2
### Changed
 - Upgrade formiojs@4.13.0-rc.6

## 5.0.1-rc.1
### Changed
 - Upgrade formiojs@4.13.0-rc.5
### Changed
 - Changes for 0.2.0 accessibility functionality release of form manager

## 5.0.0
### Changed
 - Upgrade formiojs@4.12.4

### Fixed
 - FMG-61: When there are no forms on the ‘Forms’ page or no submissions on the ‘View Data’ page, 1-0/0 number of forms is displayed

## 5.0.0-rc.5
### Changed
 - NPM package to @formio/angular

## 5.0.0-rc.4
### Fixed
 - Issues where errors would throw on the form edit page.
 - Problem where the Share link can not be clicked.

## 5.0.0-rc.3
### Changed
 - Upgrade formiojs@4.12.4-rc.2
 - FMG-29: Add password reset for users

### Fixed
 - FIO-923 | Form Loading inside FormManager app is causing 3 API requests to the server
 - FMG-135 Regression 1.96.1-rc.2| PDF overlay not saving when I click save

## 5.0.0
### Changed
 - formiojs is now a peerDependency. You need to install it seperately.
 - Upgrade Angular to support v10 and v11.

## 4.11.1-rc.6
### Changed
 - Upgrade formiojs@4.12.1-rc.9

## 4.11.1-rc.5
### Changed
 - Upgrade formiojs@4.12.1-rc.8

## 4.11.1-rc.4
### Changed
 - Upgrade formiojs@4.12.1-rc.7

## 4.11.1-rc.3
### Changed
 - Upgrade formiojs@4.12.1-rc.5

## 4.11.1-rc.2
### Changed
 - Upgrade formiojs@4.12.1-rc.4

## 4.11.0
### Changed
 - Upgrade formiojs@4.12.0

## 4.10.0
### Changed
 - Upgrade formiojs@4.12.0

## 4.10.0
### Changed
 - Upgrade formiojs@4.12.0

## 4.10.0-rc.11
### Changed
 - Upgrade formiojs@4.12.0-rc.19

## 4.10.0-rc.10
### Changed
 - Upgrade formiojs@4.12.0-rc.18

## 4.10.0-rc.9
### Changed
 - Upgrade formiojs@4.12.0-rc.16

## 4.10.0-rc.8
### Changed
 - Upgrade formiojs@4.12.0-rc.16

## 4.10.0-rc.7
### Changed
 - Upgrade formiojs@4.12.0-rc.15

## 7.9.11-rc.16
### Changed
 - Upgrade formiojs@4.11.2-rc.1

## 7.9.3-rc.6
### Changed
 - Upgrade formiojs@4.11.2-rc.1

## 7.9.3-rc.5
### Changed
 - Upgrade formiojs@4.11.2-rc.1

## 7.9.3-rc.5
### Changed
 - Upgrade formiojs@4.11.2-rc.1

## 4.10.0-rc.6
### Changed
 - Upgrade formiojs@4.12.0-rc.14

## 4.10.0-rc.5
### Changed
 - Upgrade formiojs@4.12.0-rc.13

## 4.10.0-rc.4
### Changed
 - Upgrade formiojs@4.12.0-rc.11

## 4.10.0-rc.3
### Changed
 - Upgrade formiojs@4.12.0-rc.10

## 4.10.0-rc.2
### Changed
 - Upgrade formiojs@4.12.0-rc.5

## 4.10.0-rc.1
### Changed
 - Upgrade formiojs@4.12.0-rc.4

## 4.9.6-rc.1
### Changed
 - Upgrade formiojs@4.11.3-rc.1

## 4.9.5
### Changed
 - Upgrade formiojs@4.11.2

## 4.9.5-rc.4
### Changed
 - Upgrade formiojs@4.11.2-rc.5

## 4.9.5-rc.3
### Changed
 - Upgrade formiojs@4.11.2-rc.4

## 4.9.5-rc.2
### Changed
 - Upgrade formiojs@4.11.2-rc.2

## 4.9.5-rc.1
### Changed
 - Upgrade formiojs@4.11.2-rc.1

## 4.9.4-rc.1
### Changed
 - Upgrade formiojs@4.11.2-rc.1

## 4.9.3
### Changed
 - Upgrade formiojs@4.11.1

## 4.9.3-rc.8
### Changed
 - Upgrade formiojs@4.11.1-rc.9

## 4.9.3-rc.7
### Changed
 - Upgrade formiojs@4.11.1-rc.9

## 4.9.3-rc.6
### Changed
 - Upgrade formiojs@4.11.1-rc.8

## 4.9.3-rc.5
### Changed
 - Upgrade formiojs@4.11.1-rc.6

## 4.9.3-rc.4
### Changed
 - Upgrade formiojs@4.11.1-rc.5

### Fixed
 - FVP-008: Fixed an issue for ViewPro where the Server Validation message is not being removed when validation is honored.

## 4.9.3-rc.3
### Changed
 - Downgrade corejs@3.5.0 to resolve IE11 issues.

### Fixed
 - FMG-54 Restoring grid query

## 4.9.3-rc.2
### Changed
 - Upgrade formiojs@4.11.1-rc.3

## 4.9.3-rc.1
### Changed
 - Upgrade formiojs@4.11.1-rc.1

## 4.9.2
### Changed
 - Upgrade formiojs@4.11.0

## 4.9.1-rc.2
### Changed
 - Upgrade formiojs@4.11.0-rc.4

## 4.9.1-rc.1
### Changed
 - Upgrade formiojs@4.11.0-rc.2

### Fixed
 - Fix (Grid): footer is not visible using FormComponents

## 4.9.0
### Changed
 - Upgrade formiojs@4.10.5

## 4.9.0-rc.4
### Changed
 - Upgrade formiojs@4.10.5-rc.5

## 4.9.0-rc.3
### Changed
 - Upgrade formiojs@4.10.5-rc.4

## 4.9.0-rc.2
### Changed
 - Upgrade formiojs@4.10.5-rc.2	
 
## 4.9.0-rc.1
### Fixed
 - FJS-1014: Fixed an issue where Required fields are validating when form is initialized when using a form in FormManager

### Added
 - Feat (Grid): added ability to specify footer positions: top, bottom, both

## 4.8.4
### Changed
 - Upgrade formiojs@4.10.4

## 4.8.3
### Changed
 - Upgrade formiojs@4.10.3

## 4.8.3-rc.6
### Changed
 - Upgrade formiojs@4.10.3-rc.6

## 4.8.3-rc.5
### Changed
 - Upgrade formiojs@4.10.3-rc.5

## 4.8.3-rc.4
### Changed
 - Upgrade formiojs@4.10.3-rc.4

## 4.8.3-rc.3
### Changed
 - Upgrade formiojs@4.10.3-rc.3

## 4.8.3-rc.2
### Changed
 - Upgrade formiojs@4.10.3-rc.2

## 4.8.3-rc.1
### Added
 - FormioBaseComponent: add validateOnInit logic
 - Upgrade formiojs@4.10.3-rc.1

## 4.8.2
### Changed
 - Upgrade formiojs@4.10.2

## 4.8.1
### Changed
 - Upgrade formiojs@4.10.1

## 4.8.0
### Changed
 - Upgrade formiojs@4.10.0

## 4.8.0-rc.9
### Changed
 - Upgrade formiojs@4.10.0-rc.13
 
## 4.8.0-rc.8
### Changed
 - Upgrade formiojs@4.10.0-rc.12

## 4.8.0-rc.7
### Changed
 - Upgrade formiojs@4.10.0-rc.11
 
## 4.8.0-rc.6
### Changed
 - Upgrade formiojs@4.10.0-rc.9
 - Upgrade @types/node@14.0.10, fs-extra@9.0.1, karma-coverage-istanbul-reporter@3.0.3, ts-node@8.10.2, karma-jasmine@3.3.1, rollup@2.13.1

## 4.8.0-rc.5
???

## 4.8.0-rc.4
### Changed
 - Upgrade formiojs@4.10.0-rc.5

## 4.8.0-rc.3
### Changed
 - Upgrade formiojs@4.10.0-rc.4

## 4.8.0-rc.2
### Added
 - ``FormioMetadata`` interface

### Changed
 - Upgrade formiojs@4.10.0-rc.3

## 4.8.0-rc.1
### Changed
 - Upgraded formiojs@4.10.0-rc.2

## 4.8.0-beta.7
### Changed
 - Upgrade formiojs@4.10.0-beta.19

### Fixed
 - Fix(manager): bug with default page number
 - Fix(FormioAlert): add html content parser

## 4.8.0-beta.6
### Changed
 - Upgrade formiojs@4.10.0-beta.16

## 4.8.0-beta.5
### Fixed
 - `FormioResourceIndexComponent` navigating outside of `ngZone` on row click and on creating new submission

### Changed
 - Upgrade formiojs@4.10.0-beta.15

## 4.8.0-beta.4
### Changed
 - Make stateless component of formio-loader instead of injectable service.
 - Upgrade formiojs@4.9.23

## 4.8.0-beta.3
### Fixed
 - Build error: `File not found with singular glob: <path_to_repo>/build/index.js`

### Changed
 - Updated `typescript@3.8.2`

## 4.8.0-beta.2
### Changed
 - Upgrade formiojs@4.9.21

### Added
 - `options.alertsPosition` setting with `top`, `bottom`, `both` and `none` options that allows choosing where to render alerts. 
    - `options.alertsPosition = AlertsPosition.none` is equal to `options.disableAlerts = true`

## 4.8.0-beta.1
### Changed
 - Add strong typing for grids components
 
### Added
 - Add possibility to set `columns` via property
 - `ComponentInstance`, `GridHeader`, `GridColumn`, `FormioSubmission` interfaces
 - `SortType`, `FormioSubmissionState` enums

### Fixed 
 - Bug with setting `data.key` instead of full path to the header

## 4.7.6
### Changed
 - Upgrade formiojs@4.9.20

## 4.7.5
### Changed
 - Upgrade formiojs@4.9.19

## 4.7.5-rc.3
### Changed
 - Upgrade formiojs@4.9.19-rc.3

## 4.7.5-rc.2
### Changed
 - Upgrade formiojs@4.9.19-rc.2

### Added
 - Add possibility to pass columns

## 4.7.5-rc.1
### Changed
 - Upgrade formiojs@4.9.19-rc.1

## 4.7.4
### Changed
 - Upgrade formiojs@4.9.17

## 4.7.3
### Changed
 - Upgrade formiojs@4.9.16
 - Upgrade @angular/cli@9.1.1, @angular/common@9.1.1, @angular/compiler@9.1.1, @angular/compiler-cli@9.1.1, @angular/core@9.1.1, @angular/elements@9.1.1, @angular/forms@9.1.1, @angular/platform-browser@9.1.1, @angular/platform-browser-dynamic@9.1.1, @angular/router@9.1.1, @types/node@13.11.1, fork-ts-checker-webpack-plugin@4.1.3, rollup@2.3.4, url-loader@4.1.0

## 4.7.2
### Fixed
 - Fixed `FormioResourceComponent` re-initializing on any URL change even if it's not submission id change

### Removed
 - Excess `.js` files

### Changed
 - Upgrade formiojs@4.9.15

## 4.7.1
### Changed
 - Upgrade formiojs@4.9.12

## 4.7.0
### Changed
 - Upgrade formiojs@4.9.10
 - Refactored request service.

## 4.6.20
### Changed
 - Upgrade formiojs@4.9.9
 - Separate elements definition from core

## 4.6.19
### Changed
 - Upgrade formiojs@4.9.8

### Fixed
 - Hide components property.

## 4.6.18
### Changed
 - Upgrade formiojs@4.9.7

## 4.6.17
### Changed
 - Upgrade formiojs@4.9.5

## 4.6.15
### Chnaged
 - Upgrade formiojs@4.9.3

## 4.6.14
### Changed
 - Upgrade formiojs@4.9.2

## 4.6.13
### Chnaged
 - Upgrade formiojs@4.9.0

## 4.6.12
### Changed
 - Upgrade formiojs@4.9.0-rc.12
 - Upgrade @angular/cli@9.0.7, @angular/common@9.0.7, @angular/compiler@9.0.7, @angular/compiler-cli@9.0.7, @angular/core@9.0.7, @angular/elements@9.0.7, @angular/forms@9.0.7, @angular/platform-browser@9.0.7, @angular/platform-browser-dynamic@9.0.7, @angular/router@9.0.7, @types/node@13.9.2, rollup@2.1.0, ts-node@8.7.0

## 4.6.11
### Changed
 - Upgrade formiojs@4.9.0-rc.11
 - Made formioReady public so it can be used from the outside.

## 4.6.9
### Fixed
 - Resource Service `loadForm` changes not being reflected on the view

## 4.6.7, 4.6.8
### Fixed
 - Reverted changes to override the noValidate flag on setting submissions. Was able to do this with fixes to core renderer.

### Changed
 - Upgrade formiojs@4.9.0-rc.8

## 4.6.6
### Fixed
 - Problem where an error would get thrown if a non Form.io error is thrown.

## 4.6.5
### Fixed
 - Issues with index view for resources not always updating content.
 
### Changed
 - Upgrade formiojs@4.9.0-rc.7

## 4.6.4
### Changed
 - Upgrade formiojs@4.9.0-rc.6

## 4.6.3
### Changed
 - Router to be public so it can be extended.

## 4.6.2
### Changed
 - Upgrade formiojs@4.9.0-rc.5

### Added
 - Ability to click on errors to take you to them in the form.

### Fixed
 - `FormioResourceComponent` not refreshing when navigating from one submission to another

## 4.6.0
### Changed
 - Upgrade formio.js@4.9.0-rc.4

## 4.5.8
### Fixed
 - `<formio>` component's `setForm` method not taking into account current submission

## 4.5.7
### Changed
 - Upgrade formio.js@4.9.0-beta.8

## 4.5.5
### Changed
 - Upgrade formio.js@4.9.0-beta.6

## 4.5.4
### Changed
 - Upgrade formio.js@4.9.0-beta.5

## 4.5.3
### Changed
 - Upgrade formio.js@4.9.0-beta.4

## 4.5.1
### Changed
 - Upgrade formio.js@4.8.1

### Fixed
 - Issues with colliding promises.

## 4.5.0
### Changed
 - Upgrade formio.js@4.8.0

## 4.4.6
### Added
 - The ability to import from 'angular-formio/core' to skip over the custom component classes that are only compatible with Angular 7 & 8.

## 4.4.5
### Changed
 - Upgrade formio.js to 4.8.0-rc.14

## 4.4.4
### Changed
 - Upgrade formio.js to 4.8.0-rc.13
 
### Added
 - Support emit event from Custom Component

## 4.4.3
### Fixed
 - Field options for custom components.

### Changed
 - Upgrade formio.js to 4.8.0-rc.12 to resolve builder issues.

## 4.4.2
### Changed
 - Upgrade formio.js to 4.8.0-rc.11 to resolve promise issues with Angular.

## 4.4.1
### Changed
 - Moved noeval code into the base class so Angular Material can use it.
 - Upgrade formio.js to 4.8.0-rc.10

## 4.4.0
### Added
 - Ability to use OAuth for authentication (Okta, SAML)

### Changed
 - Upgrade formio.js to 4.8.0-rc.9

## 4.3.13
### Fixed
 - Issues where this module would not run in Angular 7 applications.

### Changed
 - Upgrade formio.js to 4.8.0-rc.5

## 4.3.12
### Fixed
 - Hard depependency on @angular/elements v8.

### Changed
 - Upgrade formio.js to 4.8.0-rc.3

## 4.3.11
### Changed
 - Upgrade formiojs to 4.8.0-rc.2

## 4.3.10
### Changed
 - Upgrade formiojs to 4.8.0-rc.1

## 4.3.9
### Changed
 - Upgrade formiojs to 4.8.0-beta.9

## 4.3.8
### Fixed
 - The ResourceCompoennt class to not have a private constructor argument which breaks extended classes.

## 4.3.7
### Changed
 - Upgrade formiojs to 4.8.0-beta.8

## 4.3.6
### Fixed
 - UI not updating after getting user permissions in ```FormioResourceComponent```
 
### Changed
 - Upgrade formiojs to 4.8.0-beta.6

## 4.3.5
### Changed
 - Upgraded formiojs to 4.8.0-beta.5

## 4.3.4
### Changed
 - Upgrade formio.js to 4.8.0-beta.4
 - Fixed the noeval paramter to turn off eval into the renderer.
 - Upgraded core-js@3.4.7, @angular/cli@8.3.20, @types/node@12.12.14, css-loader@3.2.1, rollup@1.27.8, style-loader@1.0.1, systemjs@6.1.7, ts-node@8.5.4, url-loader@3.0.0

## 4.3.3
### Changed
 - Explicit field options for custom components
 - Upgrade formio.js to 4.7.8

## 4.3.2
### Fixed
 - Register form within Form Manager.
 
### Changed
 - Upgraded formiojs@4.7.6

## 4.3.1
### Fixed
 - No longer require angular/elements as peer dependencies.

### Changed
 - Upgraded formio.js to 4.7.4

## 4.3.0
### Changed
 - Upgraded formio.js to 4.7.3

## 4.3.0-beta.5
### Fixed
 - Fix gulpfile rollup configuration
 - Fixed updated loader
 
### Changed
 - Upgraded formiojs@4.7.2
 - Upgraded core-js@3.3.6, @angular/cli@8.3.17, @angular/common@8.2.13, @angular/compiler@8.2.13, @angular/compiler-cli@8.2.13, @angular/core@8.2.13, @angular/elements@8.2.13, @angular/forms@8.2.13, @angular/platform-browser@8.2.13, @angular/platform-browser-dynamic@8.2.13, @angular/router@8.2.13, @types/jasmine@3.4.6, rollup@1.26.3, tslint@5.20.1, webpack-cli@3.3.10, formiojs@4.7.2, @types/node@12.12.6, fork-ts-checker-webpack-plugin@3.0.1

### 4.3.0-beta.3
### Changed
 - Run formio outside of ngZone: https://github.com/formio/angular-formio/pull/388
 - `NgZone` service is required for main components.
 - The `FormioLoader` service is updated. Added `setLoading` method. `loading$` flag is available as Observable.
 - Upgraded dependencies and formiojs@4.6.0

### 4.3.0-beta.2
### Changed
 - Upgraded dependencies and formiojs@4.5.0

### 4.3.0-beta.1
### Added
 - Added Custom Angular Fields: https://github.com/formio/angular-formio/pull/374
 - `@angular/elements` added as peer dependency.

### 4.2.6
### Changed
 - Upgrade formiojs@4.3.3, webpack@4.41.1

### 4.2.5
### Changed
 - Upgrade formiojs@4.3.2

### 4.2.4
### Changed
 - Upgrade formiojs@4.3.1

### Added
 - A way to refresh the form externally with form builder.

### 4.2.1
### Changed
 - Upgraded formiojs@4.2.3

### 4.2.0
### Changed
 - Upgraded formiojs@4.2.0

### Fixed
 - Crashes in the FormioBaseComponent when errors are thrown.
 - Crashes in the submission grid components.

### 4.1.0
### Changed
 - Upgraded dependencies and formiojs@4.1.0
 
### Added
 - Added a submitError event when an error occurs.

### 4.0.2
### Changed
 - Upgraded dependencies and formiojs@4.0.6

### 4.0.0
### Breaking Changes
 - Only those described @ https://github.com/formio/formio.js/blob/master/Changelog.md#breaking-changes

### Changed
 - Upgraded core renderer to 4.x.

### 3.18.0
### Changed
 - Upgraded rollup@1.14.6, formiojs@3.22.0, ngx-bootstrap@4.3.0, typescript@3.5.1

### 3.17.0
### Changed
 - Upgraded support for Angular 8
 - Upgraded dependencies including core renderer

### Fixed
 - Build routine to use a better rollup gulp method.

### 3.16.0
### Fixed
 - Major memory leak issues.
 - Streamlined the form building process and form builder instanciation.

### 3.12.0
### Added
 - Exports of Formio and FormioUtils so that the same instances can be used.
 - Added all grid exports so they can be extended.
 - Alerts to the resource components.

### 3.11.6
### Fixed
 - Skip early attempts to set grid footer createText.
 - Allow extended form manager edit components to extend the save form method.

### 3.11.5
### Fixed
 - Fix Clear Search, Fix Pagination on Refresh

### 3.11.3
### Added
 - The ability to delay the authentication initialization.

### 3.11.2
### Fixed
 - Honor token namespacing when saving and loading the formio user object.

### 3.10.2
### Fixed
 - Issue with the edit permissions in the form resource view pages.

### 3.10.1
### Fixed
 - Issues with the pagination where it would hard-code the number of items per page.

### 3.10.0
### Changed
 - Upgraded all dependencies.
 
### Fixed
 - Issue where delete and edit tabs would show up when they do not have permissions for those operations.

### 3.9.6
#### Changed
 - The saveDraft feature to use the core version of the implementation.
 - Added a way to stop the emit of onSubmit handler when onSubmit is called.

### 3.9.5
#### Fixed
 - Problem where the form manager would add duplicate tags.
 - Issues where the form renderer would sometimes duplicate entries when re-rendered.

### 3.9.4
#### Fixed
 - Issues where the form could get reset when the display type changes.
 - Only show the builder when it is ready.
 
#### Added
 - PDF downloads.
 
#### Changed
 - Upgraded formiojs@3.9.4, ngx-bootstrap@3.1.3, @angular/cli@7.1.3, @angular/common@7.1.3, @angular/compiler@7.1.3, @angular/compiler-cli@7.1.3, @angular/core@7.1.3, @angular/forms@7.1.3, @angular/platform-browser@
            7.1.3, @angular/platform-browser-dynamic@7.1.3, @angular/router@7.1.3, @types/jasmine@3.3.2, @types/node@10.12.15, karma@3.1.4, node-sass@4.11.0, fork-ts-checker-webpack-plugin@0.5.2, rollup@0.68.0

### 3.9.2
#### Added
 - Ability to provide your own renderer and builder.

### 3.9.0
#### Added
 - The save draft feature.

### 3.8.0
#### Changed
 - Refactored the form manager and fixed many bugs.

### 3.4.0
### Fixed
 - Problems with the Form Manager overriding existing forms.

### 3.1.8
### Fixed
 - Issue with nested resources not getting set properly.
 - Remove cache on resource load to fix problem where ZoneAwarePromise's were setting cached values to incorrect values.

### 3.1.7
### Changed
 - Upgrade formiojs library.

### 3.1.6
### Fixed
 - Problems where the context would not get restart when changing between resources.

### Changed
 - Upgraded the core formiojs library.

### 3.1.5
#### Fixed
 - Cosmetic changes to the builder for Bootstrap 4
 - Default builder to use fontawesome for bootstrap 4.

### 3.1.4
#### Fixed
 - The route declarations to make it more AOT compatible (although still more work to do I think).

#### Added
 - A formioOptions parameter to the <formio> component to allow you to pass options to the Formio instance.
 - A renderOptions parameter to the <formio> component to allow you to pass options to the createForm method and Webform instance.

### 3.1.3
#### Fixed
 - Issues with nested resources where it would provide a filter when you don't want it to.

### 3.1.2
#### Changed
 - Upgraded dependencies.

### 3.1.1
#### Fixed
 - Problems with the data grid throwing change errors.

### 3.1.0
#### Fixed
 - Many issues related to resources, and nested resources.

### 3.0.0
This is a reverse-compatible release that has the following changes over 2.x branch.

#### Changes
 - This release introduces the Form Manager system, see Wiki for documentation.
 - Now defaults to Bootstrap 4 instead of Bootstrap 3 and provides Font Awesome by default.
 - Changed the (click) event for formio-grid to (rowSelect).
 - Another major change to the 3.x branch is the FormioGrid component. This can now handle both Forms and Submissions.
 
 #### For Submissions
 ```<formio-grid [src]="'https://examples.form.io/example''"></formio-grid>```
 
 #### For Forms
 ```<formio-grid [src]="'https://examples.form.io'" [gridType]="'form'"></formio-grid>'```
 
 - Custom Grid Headers, Body, and Footers: The latest 3.x also allows you to pass along custom Headers, Body, and Footers to the GridComponent, like so.
 
 ```js
 @Component({
   template: `....`
 })
 export class CustomHeader extends SubmissionGridHeaderComponent {}
 ```
 
 ```html
 <formio-grid [src]="'https://examples.form.io/example'" [components]="{
   header: CustomHeader,
   body: SubmissionGridBodyComponent,
   footer: SubmissionGridFooterComponent
 }"></formio-grid>
 ```
 
 This enables you to fully customize the Grid output.

<a name="2.0.0-alpha.1"></a>
# [2.0.0-alpha.1](https://github.com/formio/angular-formio/compare/v2.0.0-alpha.1...v1.18.0) (2018-03-22)

### Possible Breaking Changes
 - Fixed how the styles are included so that the renderer will work with AOT compilation.
 - Restructured the sub-modules for "auth", "resource", and "grid". There should not be any application changes that need to be made.
 - Changed the required peerDependencies to allow Angular 4 or Angular 5
 - Added a new UDM version of the built module.

<a name="0.10.0"></a>
# [0.10.0](https://github.com/formio/angular-formio/compare/v0.2.0...v0.10.0) (2017-08-22)



<a name="0.4.0"></a>
# [0.4.0](https://github.com/formio/angular-formio/compare/v0.2.0...v0.4.0) (2017-08-22)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/formio/angular-formio/compare/v0.2.0...v0.3.0) (2017-08-22)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/formio/angular-formio/compare/v0.1.0...v0.2.0) (2017-08-22)



<a name="0.1.0"></a>
# 0.1.0 (2017-08-22)
