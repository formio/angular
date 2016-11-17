/// <reference path="../typings/globals/jasmine/index.d.ts" />
import { FORMIO_BOOTSTRAP } from './templates/bootstrap.tpl';
describe('formio.ts', () => {
    it('Should have multiple templates', () => {
        expect(FORMIO_BOOTSTRAP.hasOwnProperty('formio')).toEqual(true);
        expect(FORMIO_BOOTSTRAP.hasOwnProperty('formio_component')).toEqual(true);
        expect(FORMIO_BOOTSTRAP.hasOwnProperty('formio_components')).toEqual(true);
    });
});