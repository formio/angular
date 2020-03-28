import { ExtendedComponentSchema, ValidateOptions } from 'formiojs';
export { ConditionalOptions, ValidateOptions } from 'formiojs';

export interface ComponentOptions<T = any, V = ValidateOptions> extends ExtendedComponentSchema<T> {
  validate?: V;
}

export interface FormioRefreshValue {
  property?: string;
  value?: object;
  form?: object;
  submission?: object;
}

export interface AccessSetting {
  type: string;
  roles: string[];
}

export interface FormioForm {
  title?: string;
  display?: string;
  name?: string;
  path?: string;
  type?: string;
  project?: string;
  template?: string;
  components?: ExtendedComponentSchema[];
  tags?: string[];
  access?: AccessSetting[];
  submissionAccess?: AccessSetting[];
}

export interface AlertsOptions {
  submitMessage: string;
}

export interface ErrorsOptions {
  message: string;
}

export class FormioError {
  constructor(
    public message: string,
    public component: ExtendedComponentSchema,
    public silent?: boolean,
  ) {}
}

export type FormioSubmissionCallback = (
  error: FormioError,
  submission: object
) => void;
export type FormioBeforeSubmit = (
  submission: object,
  callback: FormioSubmissionCallback
) => void;

export interface FormioHookOptions {
  beforeSubmit: FormioBeforeSubmit;
}

export interface FormioOptions {
  errors?: ErrorsOptions;
  alerts?: AlertsOptions;
  disableAlerts?: boolean;
  i18n?: object;
  fileService?: object;
  hooks?: FormioHookOptions;
  sanitizeConfig?: any;
}
