import { OnInit } from "@angular/core";
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
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
    public refreshValue(value: any): void {
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
    public searchData(text: any): void {
        let selectItems: IdTextPair[] = [];
        let templates = this.component.settings.template.split('.')[1].split(' ')[0];
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
        (new Formio(baseUrl)).loadSubmissions({params: params}).then((submission: any) => {
            for(let i=0; i < submission.length; i++){
                selectItems.push({id: submission[i], text: JSON.stringify(submission[i][templates])});
            }
            this.component.settings.defaultValue = selectItems.slice(0);
        });
    }
    ngOnInit(){
        this.searchData(null);
    }
}

export function ResourceField(template:FormioTemplate) {
    FormioComponents.register('resource', ResourceComponent, ResourceElement, template.components.resource);
    return ResourceElement;
}
