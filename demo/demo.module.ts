/* tslint: disable */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormioDemoComponent } from './demo.component';
import { FormioFormsModule } from './forms';
import { FormioModule } from '../src';
import { FormioGridModule } from '../src/grid';
import { AuthDemoModule } from './auth/auth.module';
import { HomeComponent } from './home.component';
import { DataComponent } from './data.component';
import { EventsModule } from './events/events.module';

@NgModule({
  declarations: [
    FormioDemoComponent,
    HomeComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    FormioModule,
    FormioGridModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'data',
        component: DataComponent
      },
      {
        path: 'forms',
        loadChildren: () => FormioFormsModule
      },
      {
        path: 'auth',
        loadChildren: () => AuthDemoModule
      },
      {
        path: 'event',
        loadChildren: () => EventsModule
      }
    ])
  ],
  bootstrap: [FormioDemoComponent]
})
export class DemoModule {}
/* tslint: enable */
