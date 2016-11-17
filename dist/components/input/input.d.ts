import { FormGroup } from '@angular/forms';
import { BaseComponent, ComponentOptions, ValidateOptions } from '../base';
/**
 * The InputValidation interface.
 */
export interface InputValidateOptions extends ValidateOptions {
    minLength?: number | string;
    maxLength?: number | string;
    pattern?: string;
}
export interface InputOptions extends ComponentOptions<string, InputValidateOptions> {
    inputType?: string;
    inputMask?: string;
    placeholder?: string;
    prefix?: string;
    suffix?: string;
    tabindex?: number | string;
}
export declare class InputComponent<T> extends BaseComponent<T> {
    constructor(inputType: string, form: FormGroup, settings: any, data?: any);
    getError(type: string, error: any): string;
    addValidators(): void;
}
