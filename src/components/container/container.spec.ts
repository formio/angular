/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { ContainerComponent, ContainerOptions } from './container';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { FormioComponentsComponent } from '../../formio-components.component';
import { FormioComponentComponent } from '../../formio-component.component';

describe('ContainerComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    var getSettings = (overrides: {}): ContainerOptions => {
        let settings: ContainerOptions = {
            input: true,
            tree: true,
            components: [
                {
                    input: true,
                    tableView: true,
                    inputType: 'text',
                    inputMask: '',
                    label: 'First Name',
                    key: 'firstName',
                    placeholder: 'Enter your first name',
                    prefix: '',
                    suffix: '',
                    multiple: false,
                    defaultValue: '',
                    protected: false,
                    unique: false,
                    persistent: true,
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 10,
                        pattern: '',
                        custom: '',
                        customPrivate: false
                    },
                    conditional: {
                        show: '',
                        when: null,
                        eq: ''
                    },
                    type: 'textfield'
                },
                {
                    input: true,
                    tableView: true,
                    inputType: 'text',
                    inputMask: '',
                    label: 'Last Name',
                    key: 'lastName',
                    placeholder: 'Enter your last name',
                    prefix: '',
                    suffix: '',
                    multiple: false,
                    defaultValue: '',
                    protected: false,
                    unique: false,
                    persistent: true,
                    validate: {
                        required: true,
                        minLength: 2,
                        maxLength: 10,
                        pattern: '',
                        custom: '',
                        customPrivate: false
                    },
                    conditional: {
                        show: '',
                        when: null,
                        eq: ''
                    },
                    type: 'textfield'
                }
            ],
            tableView: true,
            label: '',
            key: 'user',
            protected: false,
            persistent: true,
            type: 'container',
            conditional: {
                show: '',
                when: null,
                eq: ''
            },
            lockKey: true
        };
        Object.assign(settings, overrides);
        return settings;
    };

    it('Should create the container control.', () => {
        let settings: ContainerOptions = getSettings({});
        let container = new ContainerComponent(this.form, settings);
        expect(container.control instanceof FormGroup).toEqual(true);

        let index = 0;
        let components = new FormioComponentsComponent();
        components.components = settings.components;
        components.form = this.form;
        settings.components.forEach((comp: any) => {
            index++;
            let component = new FormioComponentComponent();
            component.component = comp;
            component.form = this.form;
            component.ngOnInit();
            component.form.controls[comp.key]['setValue']('Test' + index);
            component.form.controls[comp.key]['markAsDirty']();
        });
        expect(this.form.value).toEqual({firstName: 'Test1', lastName: 'Test2'});
    });
});