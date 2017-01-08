import { FORMIO_BOOTSTRAP } from './templates/bootstrap.templates';
describe('formio.ts', () => {
    it('Should have multiple templates', () => {
        expect(FORMIO_BOOTSTRAP.hasOwnProperty('formio')).toEqual(true);
        expect(FORMIO_BOOTSTRAP.hasOwnProperty('formio_component')).toEqual(true);
        expect(FORMIO_BOOTSTRAP.hasOwnProperty('formio_components')).toEqual(true);
    });
});