/// <reference path="../typings/globals/jasmine/index.d.ts" />
import { FORMIO } from './formio';
import { FORMIO_TEMPLATE } from './templates/bootstrap';

describe('formio.ts', () => {
    it('Should have multiple templates', () => {
        expect(FORMIO_TEMPLATE.hasOwnProperty('formio')).toEqual(true);
        expect(FORMIO_TEMPLATE.hasOwnProperty('formio_component')).toEqual(true);
        expect(FORMIO_TEMPLATE.hasOwnProperty('formio_components')).toEqual(true);
    });
});