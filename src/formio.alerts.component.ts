import { Component } from '@angular/core';
import { FormioAlerts } from './formio.alerts';

@Component({
  selector: 'formio-alerts',
  template: '<div *ngFor="let alert of alerts.alerts" class="alert alert-{{ alert.type }}" role="alert">{{ alert.message }}</div>'
})
export class FormioAlertsComponent {
  constructor(public alerts: FormioAlerts) {}
}
