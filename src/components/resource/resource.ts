import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { SelectModule } from 'ng2-select/ng2-select';
var Formio = require('formiojs');

export interface ResourceOptions extends BaseOptions<any> {
    placeholder?: string;
    template: string;
    resource: string;
    searchFields?: Array<string> | string;
    selectFields?: Array<string> | string;
}

interface IdTextPair{
    id: string;
    text: string;
}

export class ResourceComponent extends BaseComponent<ResourceOptions> {
    allowMultiple(): boolean{
        return false;
    }
}

export class ResourceElement extends BaseElement<ResourceComponent> implements OnInit {
    private value:any = {};
    public refreshValue(value:any):void {
        this.value = value;
    }
    public searchData(text:any): void {
        let selectItems: IdTextPair[] = [];
        let baseUrl: string = Formio.getBaseUrl() +'/project/'+ this.component.settings.project +'/form/'+ this.component.settings.resource;
        let params:any = {};
        if (this.component.settings.selectFields) {
            params.select = this.component.settings.selectFields;
        }
        if (this.component.settings.searchFields && text) {
            this.component.settings.searchFields.forEach((item: any) => {
                params[item] = text;
            });
        }
        (new Formio(baseUrl)).loadSubmissions({params:params}).then((submission: any) => {
            for(let i=0; i < submission.length; i++){
                selectItems.push({id: JSON.stringify(submission[i].data), text: JSON.stringify(submission[i].data)});
            }
             this.component.settings.defaultValue = selectItems.slice(0);
        });
    }
    ngOnInit(){
        this.searchData(null);
    }
}

export function ResourceField(template:FormioTemplate) {
    FormioComponents.register('resource', ResourceComponent, ResourceElement, {
        template: template.components.resource
    }, {
        imports: [SelectModule]
    });
    return ResourceElement;
}
