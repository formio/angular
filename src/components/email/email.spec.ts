/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_BOOTSTRAP } from '../../templates/bootstrap.tpl';
import { RegisterComponents } from '../index';
import { EmailComponent } from './email';

describe('EmailComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_BOOTSTRAP);
        this.form = new FormGroup({});
    });

    it('Should not allow invalid TextField values.', () => {
        // TO-DO: MAKE EMAIL TESTS!
        expect(true).toEqual(true);
    });
});