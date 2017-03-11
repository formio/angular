import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent }  from './app.component';
import { FormioModule } from '../dist/index';
@NgModule({
    imports: [ BrowserModule, ReactiveFormsModule, FormioModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
