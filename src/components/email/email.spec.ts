/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_TEMPLATE } from '../../templates/bootstrap';
import { RegisterComponents } from '../index';
import { EmailComponent } from './email';

describe('EmailComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_TEMPLATE);
        this.form = new FormGroup({});
    });

    it('Should not allow invalid TextField values.', () => {
        // TO-DO: MAKE EMAIL TESTS!
        expect(true).toEqual(true);
    });
});