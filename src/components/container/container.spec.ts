import { FormGroup } from '@angular/forms';
import { ContainerComponent, ContainerOptions } from './container';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.templates';
import { RegisterComponents } from '../index';
import { FormioComponentsComponent } from '../../formio-components.component';
import { FormioComponentComponent } from '../../formio-component.component';
import { FormioEvents } from '../../formio.events';

describe('ContainerComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
        this.events = new FormioEvents();
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
        let container = new ContainerComponent(this.form, settings, this.events);
        expect(container.control instanceof FormGroup).toEqual(true);
    });
});