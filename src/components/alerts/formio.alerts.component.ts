import { Component, Input, OnInit } from '@angular/core';
import { FormioAlerts } from './formio.alerts';

@Component({
  selector: 'formio-alerts',
  templateUrl: './formio.alerts.component.html'
})
export class FormioAlertsComponent implements OnInit {
  @Input() alerts: FormioAlerts;
  ngOnInit() {
    if (!this.alerts) {
      this.alerts = new FormioAlerts();
    }
  }
}
