import { BaseComponent, BaseElement } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { InputOptions } from '../input/input';

export class CurrencyComponent extends BaseComponent<InputOptions> {}
export class CurrencyElement extends BaseElement<CurrencyComponent> {
    public inputs: any = null;
    public onChange(value: any): any {
        var splice = function(string: any, idx: any, rem: any, s: any) {
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
   }
}
export function CurrencyField(template: FormioTemplate) {
    FormioComponents.register('currency', CurrencyComponent, CurrencyElement, template.components.currency);
    return CurrencyElement;
}
