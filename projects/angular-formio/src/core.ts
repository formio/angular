if (window && typeof (window as any).global === 'undefined') {
  (window as any).global = window;
}
export * from './formio.config';
export * from './formio.common';
export * from './formio.service';
export * from './formio-promise.service';
export * from './formio.utils';
export * from './FormioBaseComponent';
export * from './components/formio/formio.component';
export * from './components/formbuilder/formbuilder.component';
export * from './components/formioreport/formioreport.component';
export * from './components/loader/formio.loader.component';
export * from './components/alerts/formio.alerts';
export * from './components/alerts/formio.alerts.component';
export { FormioModule } from './formio.module';
export { ComponentSchema, ExtendedComponentSchema, ElementInfo } from '@formio/deprecated-types';
export { Utils as FormioUtils } from '@formio/js';
export { Formio } from '@formio/js';
