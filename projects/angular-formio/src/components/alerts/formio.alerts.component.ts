import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormioAlerts } from './formio.alerts';
import { NgFor } from '@angular/common';
import { ParseHtmlContentPipe } from './parse-html-content.pipe';

@Component({
  selector: 'formio-alerts',
  templateUrl: './formio.alerts.component.html',
    imports: [NgFor, ParseHtmlContentPipe]
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
