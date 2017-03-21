import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home';
import { FormRoutes } from './forms';
export const AppRoutes = RouterModule.forRoot([
  {
    path: '',
    component: HomeComponent,
    children: FormRoutes
  }
]);
