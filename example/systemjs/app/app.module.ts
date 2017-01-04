import {NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormioModule } from 'ng2-formio';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, FormioModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
