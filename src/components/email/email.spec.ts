/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_TEMPLATE } from '../../templates/bootstrap';
import { EmailComponent, EmailField } from './email';

describe('EmailComponent', () => {
    beforeEach(() => {
        this.form = new FormGroup({});
    });

    // Register the TextField component.
    EmailField(FORMIO_TEMPLATE);

    it('Should not allow invalid TextField values.', () => {
        // TO-DO: MAKE EMAIL TESTS!
        expect(true).toEqual(true);
    });
});