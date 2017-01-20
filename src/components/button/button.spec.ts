import { FormGroup, FormControl } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.templates';
import { RegisterComponents } from '../index';
import { ButtonComponent, ButtonOptions } from './button';
import { FormioEvents } from '../../formio.events';

describe('ButtonComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
        this.events = new FormioEvents();
    });

    var getSettings = (overrides: {}): ButtonOptions => {
        let settings: ButtonOptions = {
            input: true,
            label: 'Submit',
            tableView: false,
            key: 'submit',
            size: 'md',
            leftIcon: '',
            rightIcon: '',
            block: false,
            action: 'submit',
            disableOnInvalid: true,
            theme: 'primary',
            type: 'button'
        };
        Object.assign(settings, overrides);
        return settings;
    };

    it('Should create the control.', () => {
        let settings: ButtonOptions = getSettings({});
        let button = new ButtonComponent(this.form, settings, this.events);
        expect(button.control instanceof FormControl).toEqual(true);
    });
});