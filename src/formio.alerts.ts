import { Injectable } from '@angular/core';

export interface FormioAlert {
  type: string;
  message: string;
}

@Injectable()
export class FormioAlerts {
  public alerts: FormioAlert[] = [];
  setAlert(alert: FormioAlert) {
    this.alerts = [alert];
  }
  addAlert(alert: FormioAlert) {
    this.alerts.push(alert);
  }
  setAlerts(alerts: FormioAlert[]) {
    this.alerts = alerts;
  }
}
