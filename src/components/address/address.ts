import { BaseComponent, BaseOptions, BaseElement} from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass } from '@angular/common';
import { SELECT_DIRECTIVES } from '../../../node_modules/ng2-select/ng2-select';
var Formio = require('formiojs');
import 'style!ng2-select/components/css/ng2-select.css';

export interface AddressOptions extends BaseOptions<string> {
    placeholder?: string,
    customClass?: string
}

interface IdTextPair{
    id: string;
    text: string;
}

export class AddressComponent extends BaseComponent<AddressOptions> {
    allowMultiple(): boolean{
        return false;
    }
}

export class AddressElement extends BaseElement<AddressComponent> {
    private value:any = {};
    public refreshValue(value:any):void
    {
        this.value = value;
    }
    public selectedItem: Array<any> = [];
    public selectedData(value:any):void
    {
        let this1 = this;
        let selectItems: IdTextPair[] = [];
        let url: string = "https://maps.googleapis.com/maps/api/geocode/json?address="+value+"&sensor=false";
        Formio.request(url, 'POST', {}, {}).then(function(response: any){
            response.results.forEach((item: any) => {
                selectItems.push({id: item.formatted_address, text: item.formatted_address});
            });
            this1.selectedItem = selectItems.slice(0);
        });
    }
}

export function Address(template:FormioTemplate) {
    FormioComponents.register('address', AddressComponent, AddressElement, {
        template: template.components.address,
        directives: [SELECT_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
    });
    return AddressElement;
}
