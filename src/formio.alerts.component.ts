import { Component, Input } from '@angular/core';
import { FormioAlerts } from './formio.alerts';

@Component({
  selector: 'formio-alerts',
  template:
    '<div *ngFor="let alert of alerts.alerts" class="alert alert-{{ alert.type }}" role="alert">{{ alert.message }}</div>'
})
export class FormioAlertsComponent {
  @Input() alerts: FormioAlerts;
  constructor() {}
}
