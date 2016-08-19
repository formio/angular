import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { FormioBootstrap } from '../src/bootstrap';
@NgModule({
    imports: [ BrowserModule, FormioBootstrap ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }