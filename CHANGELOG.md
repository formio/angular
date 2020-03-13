# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 4.6.7
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
