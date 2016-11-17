"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var components_1 = require('../components');
var input_1 = require('../input/input');
var base_1 = require('../base');
/**
 * Create an email validator for validating based on Javascript.
 * @param custom
 * @param form
 * @returns {(control:FormControl)=>{validateCustom: boolean}}
 * @constructor
 */
function EmailValidator(control) {
    /**
     *  RFC 5322 compliant emails only:
     *   - http://emailregex.com
     **/
    var EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (control.value && !EMAIL_REGEXP.test(control.value)) {
        return { "invalidEmail": true };
    }
    return null;
}
exports.EmailValidator = EmailValidator;
var EmailComponent = (function (_super) {
    __extends(EmailComponent, _super);
    function EmailComponent(form, settings, data) {
        _super.call(this, 'email', form, settings, data);
    }
    EmailComponent.prototype.getError = function (type, error) {
        var message = _super.prototype.getError.call(this, type, error);
        if (!message && (type === 'invalidEmail')) {
            message = this.label + ' is an invalid email.';
        }
        return message;
    };
    EmailComponent.prototype.addValidators = function () {
        _super.prototype.addValidators.call(this);
        this.validators.push(EmailValidator);
    };
    return EmailComponent;
}(input_1.InputComponent));
exports.EmailComponent = EmailComponent;
var EmailElement = (function (_super) {
    __extends(EmailElement, _super);
    function EmailElement() {
        _super.apply(this, arguments);
    }
    return EmailElement;
}(base_1.BaseElement));
exports.EmailElement = EmailElement;
function EmailField(template) {
    components_1.FormioComponents.register('email', EmailComponent, EmailElement, template.components.input);
    return EmailElement;
}
exports.EmailField = EmailField;
;
