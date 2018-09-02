"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormioAlerts = /** @class */ (function () {
    function FormioAlerts() {
        this.alerts = [];
    }
    FormioAlerts.prototype.setAlert = function (alert) {
        this.alerts = [alert];
    };
    FormioAlerts.prototype.addAlert = function (alert) {
        this.alerts.push(alert);
    };
    FormioAlerts.prototype.setAlerts = function (alerts) {
        this.alerts = alerts;
    };
    return FormioAlerts;
}());
exports.FormioAlerts = FormioAlerts;
