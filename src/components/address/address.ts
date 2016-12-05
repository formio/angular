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
    public refreshValue(value:any):void {
        this.value = value;
    }
    public submitArray: Array<any> = [];
    public selected(selectedValue: any): void {
        if (this.component.settings.multiple) {
            this.submitArray.push(selectedValue.id);
            this.component.setValue(this.submitArray);
        }
        else {
            this.component.setValue(selectedValue.id);
        }
    }
    public removed(removedValue: any): void {
        if (this.component.settings.multiple) {
            this.submitArray.splice(this.submitArray.indexOf(removedValue.id),1);
            this.component.setValue(this.submitArray);
        }
    }
    public selectedItem: Array<any> = [];
    public searchData(value:any):void {
        let this1 = this;
        let selectItems: IdTextPair[] = [];
        let url: string = "//maps.googleapis.com/maps/api/geocode/json?address="+value+"&sensor=false";
        Formio.request(url, 'POST', {}, {}).then(function(response: any){
            response.results.forEach((item: any) => {
                selectItems.push({id: item, text: item.formatted_address});
            });
            this1.selectedItem = selectItems.slice(0);
        });
    }
}

export function AddressField(template:FormioTemplate) {
    FormioComponents.register('address', AddressComponent, AddressElement, template.components.address);
    return AddressElement;
}
