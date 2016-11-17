/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup, FormControl } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { ButtonComponent, ButtonOptions } from './button';

describe('ButtonComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
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
        let button = new ButtonComponent(this.form, settings);
        expect(button.control instanceof FormControl).toEqual(true);
    });
});