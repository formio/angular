import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass } from '@angular/common';
import { SELECT_DIRECTIVES } from '../../../node_modules/ng2-select/ng2-select';
var Formio = require('formiojs');

export interface SelectOptions extends BaseOptions<any> {

}

export class SelectComponent extends BaseComponent<SelectOptions> {

}

interface IdTextPair{
    id: string;
    text: string;
}

var selectvalues: IdTextPair[] = [];

export class SelectElement extends BaseElement<SelectComponent> implements OnInit{
    ngOnInit(){
        switch(this.component.settings.dataSrc){
            case 'values':
                this.component.settings.data.values.forEach((item: any) => {
                    selectvalues.push({id: item.label, text: item.value});
                });
                this.component.settings.data.values = selectvalues.slice(0);
                break;
            case 'json':
                this.component.settings.data.json.forEach((item: any) => {
                    selectvalues.push({id: item[Object.keys(item)[1]], text: item[Object.keys(item)[0]]});
                });
                this.component.settings.data.json = selectvalues.slice(0);
                break;
            case 'resource':
                let baseUrl: string = 'https://ycxhcpsbzoefppz.form.io/';
                let resourceUrl: string = baseUrl + this.component.settings.data.resource;
                let valueProperty: string = this.component.settings.valueProperty;
                (new Formio(resourceUrl)).loadSubmissions().then((submission: Array<any>) => {
                    for(let i=0; i < submission.length; i++){
                        selectvalues.push({id: submission[i].data[valueProperty], text: submission[i].data[valueProperty]});
                    }
                    this.component.settings.data.values = selectvalues.slice(0);
                });
                break;
            case 'url':
                let url: string = this.component.settings.data.url;
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
