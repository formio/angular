/// <reference path="../typings/globals/jasmine/index.d.ts" />
import { FORMIO } from './formio';
import { FORMIO_TEMPLATE } from './templates/bootstrap';

describe('formio.ts', () => {
    it('Should have multiple templates', () => {
        expect(FORMIO_TEMPLATE.hasOwnProperty('formio')).toEqual(true);
        expect(FORMIO_TEMPLATE.hasOwnProperty('formio_component')).toEqual(true);
        expect(FORMIO_TEMPLATE.hasOwnProperty('formio_components')).toEqual(true);
    });
    it('Should allow the FORMIO to have templates', () => {
        let formio = FORMIO(FORMIO_TEMPLATE);
        expect(formio instanceof Array).toEqual(true);
        formio.forEach((comp) => {
            let annotations = Reflect.getMetadata('annotations', comp);
            if (annotations && annotations.length && annotations[0].hasOwnProperty('template')) {
                expect(annotations[0].template.length).toBeGreaterThan(10);
            }
        });
    });
});