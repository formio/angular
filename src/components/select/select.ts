import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { FormioService } from '../../formio.service';
var Formio = require('formiojs');

export interface SelectOptions extends BaseOptions<any> {
    placeholder?: string;
    data: {};
    dataSrc: string;
    valueProperty?: string;
    template: string;
    refreshOn?: string;
    filter?: any;
    authenticate?: boolean;
    searchField?: string;
}

export class SelectComponent extends BaseComponent<SelectOptions> {
    allowMultiple(): boolean{
        return false;
    }
}

interface IdTextPair{
    id: string;
    text: string;
}

export class SelectElement extends BaseElement<SelectComponent> implements OnInit{
    private value: any = {};
    public refreshValue(value: any): void {
        this.value = value;
    }
    public submitArray: Array<any> = [];
    public selected(selectedValue: any): void {
        if(this.component.settings.multiple){
            this.submitArray.push(selectedValue.id);
            this.component.setValue(this.submitArray);
        }
        else{
            this.component.setValue(selectedValue.id);
        }
    }
    public removed(removedValue: any): void {
        if(this.component.settings.multiple){
            this.submitArray.splice(this.submitArray.indexOf(removedValue.id),1);
            this.component.setValue(this.submitArray);
        }
    }
    ngOnInit(){
        let selectItems: IdTextPair[] = [];
        let template: string = this.component.settings.template.split('.')[1].split(' ')[0];
        let valueProperty: string = this.component.settings.valueProperty;
        switch(this.component.settings.dataSrc){
            case 'values':
                this.component.settings.data.values.forEach((item: any) => {
                    selectItems.push({id: item.value, text: item.label});
                });
                this.component.settings.data.values = selectItems.slice(0);
                break;
            case 'json':
                this.component.settings.data.json.forEach((item: any) => {
                    selectItems.push({id: item[valueProperty], text: item[template]});
                });
                this.component.settings.data.values = selectItems.slice(0);
                break;
            case 'resource':
                let baseUrl = Formio.getAppUrl() + '/' + this.component.settings.data.resource;
                let value: string = this.component.settings.valueProperty.split('.')[1];
                (new FormioService(baseUrl)).loadSubmissions().subscribe((submission: Array<any>) => {
                    for(let i=0; i < submission.length; i++){
                        selectItems.push({id: submission[i].data[value], text: submission[i].data[value]});
                    }
                    this.component.settings.data.values = selectItems.slice(0);
                });
                break;
            case 'url':
                let url: string = this.component.settings.data.url;
                let this1 = this;
                Formio.request(url).then(function(response: any){
                    response.forEach((item: any) => {
                        selectItems.push({id: item[valueProperty], text: item[template]});
                    });
                    this1.component.settings.data.values = selectItems.slice(0);
                });
                break;
        }
    }
}

export function SelectField(template:FormioTemplate) {
    FormioComponents.register('select', SelectComponent, SelectElement, template.components.select);
    return SelectElement;
}
