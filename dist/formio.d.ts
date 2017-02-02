import { ModuleWithProviders } from '@angular/core';
import { FormioTemplate } from './formio.template';
export declare class FormioBaseModule {
    static forRoot(): ModuleWithProviders;
    static setTemplate(template: FormioTemplate): void;
}
