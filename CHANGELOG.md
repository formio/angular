# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
