import { Component, Injectable } from '@angular/core';

export interface FormioAlert {
    type: string;
    message: string;
}

@Injectable()
export class FormioAlerts {
    public alerts: Array<FormioAlert> = [];
    setAlert(alert: FormioAlert) {
        this.alerts = [alert];
    }
    addAlert(alert: FormioAlert) {
        this.alerts.push(alert);
    }
    setAlerts(alerts: Array<FormioAlert>) {
        this.alerts = alerts;
    }
}

@Component({
    selector: 'formio-alerts',
    template: '<div *ngFor="let alert of alerts.alerts" class="alert alert-{{ alert.type }}" role="alert">{{ alert.message }}</div>'
})
export class FormioAlertsComponent {
    constructor(public alerts: FormioAlerts) {}
}
