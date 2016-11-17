"use strict";
var forms_1 = require('@angular/forms');
var formio_common_1 = require('../formio.common');
/**
 * Create the custom validator for validating based on Javascript.
 * @param custom
 * @param form
 * @returns {(control:FormControl)=>{validateCustom: boolean}}
 * @constructor
 */
function CustomValidator(custom, form) {
    return function (control) {
        var valid = true;
        /*eslint-disable no-unused-vars */
        var input = control.value;
        /*eslint-enable no-unused-vars */
        custom = custom.replace(/({{\s+(.*)\s+}})/, function (match, $1, $2) {
            return form.value[$2];
        });
        /* jshint evil: true */
        eval(custom);
        return (valid === true) ? null : { custom: valid };
    };
}
exports.CustomValidator = CustomValidator;
var BaseComponent = (function () {
    function BaseComponent(form, settings, data) {
        if (data === void 0) { data = {}; }
        this.form = form;
        this.settings = settings;
        this.data = data;
        this.index = 0;
        this.validators = [];
        this.getControl();
    }
    BaseComponent.prototype.getData = function (index) {
        if (this.data.hasOwnProperty(this.settings.key)) {
            var data = this.data[this.settings.key];
            if (typeof index !== 'undefined') {
                data = data[index];
            }
            return data;
        }
        else {
            return {};
        }
    };
    BaseComponent.prototype.setValue = function (value) {
        if (this.control && (this.control instanceof forms_1.FormControl)) {
            var formControl = this.control;
            formControl.setValue(value);
            formControl.markAsDirty();
        }
    };
    Object.defineProperty(BaseComponent.prototype, "label", {
        get: function () {
            if (this._label === false) {
                return false;
            }
            if (this._label) {
                return this._label;
            }
            if (this.index > 0) {
                return '';
            }
            if (this.settings.label) {
                return this.settings.label;
            }
            return this.settings.key;
        },
        set: function (label) {
            this._label = label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "defaultValue", {
        get: function () {
            if (this.settings.defaultValue) {
                var isArray = (this.settings.defaultValue instanceof Array);
                return isArray ? this.settings.defaultValue[this.index] : this.settings.defaultValue;
            }
            return this.settings.defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.getControl = function () {
        if (!this.settings.input) {
            return null;
        }
        if (!this.control) {
            this.addValidators();
            this.control = new forms_1.FormControl(this.defaultValue, this.validators);
        }
        return this.control;
    };
    BaseComponent.prototype.getError = function (type, error) {
        if ((type === 'required') && error) {
            return this.label + ' is required';
        }
        if ((type === 'custom') && error) {
            return error;
        }
        return '';
    };
    BaseComponent.prototype.getFormioError = function (type, error) {
        var message = this.getError(type, error);
        return new formio_common_1.FormioError(message, this.settings);
    };
    Object.defineProperty(BaseComponent.prototype, "errors", {
        get: function () {
            var errors = [];
            if (this.control &&
                this.control.errors) {
                for (var err in this.control.errors) {
                    var error = this.getFormioError(err, this.control.errors[err]);
                    if (error) {
                        errors.push(error);
                    }
                }
            }
            return errors;
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.addValidators = function () {
        if (!this.settings.validate) {
            return;
        }
        if (this.settings.validate.required) {
            this.validators.push(forms_1.Validators.required);
        }
        if (this.settings.validate.custom) {
            this.validators.push(CustomValidator(this.settings.validate.custom, this.form));
        }
    };
    BaseComponent.prototype.allowMultiple = function () {
        return this.settings.multiple;
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
var BaseElement = (function () {
    function BaseElement() {
        this.renderCount = 0;
    }
    Object.defineProperty(BaseElement.prototype, "numComponents", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    BaseElement.prototype.ngOnInit = function () {
        this.onRender();
    };
    BaseElement.prototype.onRender = function () {
        if (!this.render) {
            return;
        }
        if (this.renderCount > this.numComponents) {
            return;
        }
        this.renderCount++;
        if (this.renderCount > this.numComponents) {
            this.render.emit(true);
        }
    };
    return BaseElement;
}());
exports.BaseElement = BaseElement;
