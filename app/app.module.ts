import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent }  from './app.component';
import { FormioModule } from '../src/formio';
import { FORMIO_BOOTSTRAP } from '../src/templates/bootstrap';
FormioModule.setTemplate(FORMIO_BOOTSTRAP);
@NgModule({
    imports: [ BrowserModule, ReactiveFormsModule, FormioModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }