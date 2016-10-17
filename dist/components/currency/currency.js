"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../base');
var components_1 = require('../components');
var CurrencyComponent = (function (_super) {
    __extends(CurrencyComponent, _super);
    function CurrencyComponent() {
        _super.apply(this, arguments);
    }
    return CurrencyComponent;
}(base_1.BaseComponent));
exports.CurrencyComponent = CurrencyComponent;
var CurrencyElement = (function (_super) {
    __extends(CurrencyElement, _super);
    function CurrencyElement() {
        _super.apply(this, arguments);
        this.inputs = null;
    }
    CurrencyElement.prototype.onChange = function (value) {
        var splice = function (string, idx, rem, s) {
            return (string.slice(0, idx) + s + string.slice(idx + Math.abs(rem)));
        };
        while (value.charAt(0) === '0') {
            value = value.substr(1);
        }
        value = value.replace(/[^\d.\',']/g, '');
        var point = value.indexOf('.');
        if (point >= 0) {
            value = value.slice(0, point + 3);
        }
        var decimalSplit = value.split('.');
        var intPart = decimalSplit[0];
        var decPart = decimalSplit[1];
        intPart = intPart.replace(/[^\d]/g, '');
        if (intPart.length > 3) {
            var intDiv = Math.floor(intPart.length / 3);
            while (intDiv > 0) {
                var lastComma = intPart.indexOf(',');
                if (lastComma < 0) {
                    lastComma = intPart.length;
                }
                if (lastComma - 3 > 0) {
                    intPart = splice(intPart, lastComma - 3, 0, ',');
                }
                intDiv--;
            }
        }
        if (decPart === undefined) {
            decPart = '';
        }
        else {
            decPart = '.' + decPart;
        }
        var res = intPart + decPart;
        return res;
    };
    return CurrencyElement;
}(base_1.BaseElement));
exports.CurrencyElement = CurrencyElement;
function CurrencyField(template) {
    components_1.FormioComponents.register('currency', CurrencyComponent, CurrencyElement, template.components.currency);
    return CurrencyElement;
}
exports.CurrencyField = CurrencyField;
