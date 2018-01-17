import { Component } from '@angular/core';
@Component({
  template:
    '<div class="card card-primary panel panel-default">' +
    '  <div class="card-header panel-heading">' +
    '    <ul class="nav nav-tabs card-header-tabs">' +
    '      <li class="nav-item" role="presentation" routerLinkActive="active"><a class="nav-link" routerLink="login" routerLinkActive="active">Login</a></li>' +
    '      <li class="nav-item" role="presentation" routerLinkActive="active"><a class="nav-link" routerLink="register" routerLinkActive="active">Register</a></li>' +
    '    </ul>' +
    '  </div>\n' +
    '  <div class="card-body panel-body">' +
    '    <router-outlet></router-outlet>' +
    '  </div>' +
    '</div>'
})
export class FormioAuthComponent {}
