import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { FormioService } from '../../formio.service';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass } from '@angular/common';
import { SELECT_DIRECTIVES } from '../../../node_modules/ng2-select/ng2-select';
var Formio = require('formiojs');
import 'style!ng2-select/components/css/ng2-select.css'

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

}

interface IdTextPair{
    id: string;
    text: string;
}

let selectItems: IdTextPair[] = [];


export class SelectElement extends BaseElement<SelectComponent> implements OnInit{
    private value:any = {};
    public refreshValue(value:any):void {
        this.value = value;
    }
    ngOnInit(){
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
                let baseUrl = Formio.getBaseUrl() + '/' + this.component.settings.data.resource;
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

export function Select(template:FormioTemplate) {
    FormioComponents.register('select', SelectComponent, SelectElement, {
        template: template.components.select,
        directives: [SELECT_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
    });
    return SelectElement;
}
