"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormioError = (function () {
    function FormioError(message, component) {
        if (component === void 0) { component = null; }
        this.message = message;
        this.component = component;
    }
    return FormioError;
}());
exports.FormioError = FormioError;
