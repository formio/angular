import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormioAlerts } from './formio.alerts';

@Component({
  selector: 'formio-alerts',
  template: "<div *ngFor=\"let alert of alerts.alerts\" class=\"alert alert-{{ alert.type }}\" role=\"alert\" (click)=\"getComponent($event, alert)\"> {{alert.message | parseHtmlContent}} </div> "
})
export class FormioAlertsComponent implements OnInit {
  @Input() alerts: FormioAlerts;
  @Output() focusComponent = new EventEmitter<object>();
  ngOnInit() {
    if (!this.alerts) {
      this.alerts = new FormioAlerts();
    }
  }
  getComponent (event, alert) {
    this.focusComponent.emit(alert.component.key);
  }
}
