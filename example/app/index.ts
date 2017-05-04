import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './routes';
import { FormioModule } from '../..';
import { MainComponent } from './components/main';
import { HeaderComponent } from './components/header';
import { FooterComponent } from './components/footer';
import { HomeComponent } from './components/home';
import { FormComponents } from './forms';

@NgModule({
  imports: [
    BrowserModule,
    FormioModule,
    AppRoutes
  ],
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ...FormComponents
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
