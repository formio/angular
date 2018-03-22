import { Component, Input } from '@angular/core';
import { FormioAlerts } from './formio.alerts';

@Component({
  selector: 'formio-alerts',
  templateUrl: './formio.alerts.component.html'
})
export class FormioAlertsComponent {
  @Input() alerts: FormioAlerts;
  constructor() {
    this.alerts = new FormioAlerts();
  }
}
