"use strict";
var core_1 = require('@angular/core');
var FormioError = (function () {
    function FormioError(message, component) {
        this.message = message;
        this.component = component;
    }
    return FormioError;
}());
exports.FormioError = FormioError;
var FormioEvents = (function () {
    function FormioEvents() {
        this.component = new core_1.EventEmitter();
        this.errors = [];
    }
    return FormioEvents;
}());
exports.FormioEvents = FormioEvents;
