import { FormGroup } from '@angular/forms';
import { FormioComponentComponent } from '../../formio-component.component';
import { ResourceComponent, ResourceOptions } from './resource';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';

describe('SelectComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): ResourceOptions => {
        let settings: ResourceOptions = <ResourceOptions>{
            customClass: "myclass",
            conditional: {
                eq: "",
                when: null,
                show: ""
            },
            type: "resource",
            defaultPermission: "",
            validate: {"required": false},
            persistent: true,
            protected: false,
            multiple: true,
            searchFields: ["fullName"],
            selectFields: "",
            template: "<span>{{ item.data }}</span>",
            defaultValue: [],
            resource: "manager",
            placeholder: "Select Resource",
            key: "resource",
            label: "Resource",
            tableView: true,
            input: true,
            tags: []
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides: {}): FormioComponentComponent<string> => {
        let settings:ResourceOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };
    it('Test FormioComponent for Resource', () => {
        let component = getComponent({});
        expect(component.components[0] instanceof ResourceComponent).toEqual(true);
    });

    it('Type should be resource', () => {
        let settings: ResourceOptions = getSettings({
            type: "resource"
        });

        // Create the resource component.
        let resource = new ResourceComponent(this.form, settings);
        expect(resource.settings.type).toEqual("resource");
    });

    it('Should allow label', () => {
        let settings: ResourceOptions = getSettings({
            label: "Resource"
        });

        // Create the resource component.
        let resource = new ResourceComponent(this.form, settings);
        expect(resource.settings.label).toEqual("Resource");
    });

    it('Should allow placeholder', () => {
        let settings: ResourceOptions = getSettings({
            placeholder: "Select one"
        });

        // Create the resource component.
        let resource = new ResourceComponent(this.form, settings);
        expect(resource.settings.placeholder).toEqual("Select one");
    });

    it('Should allow template', () => {
        let settings: ResourceOptions = getSettings({
            template: "<span>{{ item.data }}</span>"
        });

        // Create the resource component.
        let resource = new ResourceComponent(this.form, settings);
        expect(resource.settings.template).toEqual("<span>{{ item.data }}</span>");
    });
});
