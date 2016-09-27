import { BaseComponent, BaseOptions, BaseElement} from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
var Formio = require('formiojs');

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
        let url: string = "//maps.googleapis.com/maps/api/geocode/json?address="+value+"&sensor=false";
        Formio.request(url, 'POST', {}, {}).then(function(response: any){
            response.results.forEach((item: any) => {
                selectItems.push({id: item.formatted_address, text: item.formatted_address});
            });
            this1.selectedItem = selectItems.slice(0);
        });
    }
}

export function AddressField(template:FormioTemplate) {
    FormioComponents.register('address', AddressComponent, AddressElement, template.components.address);
    return AddressElement;
}
