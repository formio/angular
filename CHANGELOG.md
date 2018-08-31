# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 3.0.0
This is a reverse-compatible release that has the following changes over 2.x branch.

#### Changes
 - This release introduces the Form Manager system, see Wiki for documentation.
 - You now no longer need a separate module to bring in each component. You can mount the components using the ```Component.forChild()``` method. For example, if you wish to bring in the Authentication system into your application, you just need to do the following.
 
 ```js
 @NgModule({
   declarations: [
     AppComponent,
     HomeComponent,
     HeaderComponent
   ],
   imports: [
     BrowserModule,
     RouterModule.forRoot([
       {
         path: '',
         redirectTo: '/home',
         pathMatch: 'full'
       },
       {
         path: 'home',
         component: HomeComponent
       },
       {
         path: 'auth',
         loadChildren: () => FormioAuth.forChild({
           login: CustomLoginComponent
         })
       },
       {
         path: 'form',
         loadChildren: () => FormManagerModule.forChild()
       }
     ])
   ],
   providers: [
     FormioAuthService,
     FormManagerService,
     {provide: FormioAuthConfig, useValue: AuthConfig},
     {provide: FormioAppConfig, useValue: AppConfig},
     {provide: FormManagerConfig, useValue: FormConfig},
   ],
   bootstrap: [AppComponent]
 })
 export class AppModule { }
 ```
 
 This is still reverse compatible with 2.x where you can also still register Routes using the following method.
 
 ```js
 RouterModule.forChild(FormioAuthRoutes({
   login: CustomLoginComponent
 ))
 ```
 
 But this is now no longer necessary since you can do the same when you "mount" the authentication system.

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
