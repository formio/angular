export interface FormioAlert {
    type: string;
    message: string;
}
export declare class FormioAlerts {
    alerts: Array<FormioAlert>;
    setAlert(alert: FormioAlert): void;
    addAlert(alert: FormioAlert): void;
    setAlerts(alerts: Array<FormioAlert>): void;
}
export declare class FormioAlertsComponent {
    private alerts;
    constructor(alerts: FormioAlerts);
}
