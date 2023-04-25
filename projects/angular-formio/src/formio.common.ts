import { ExtendedComponentSchema, ValidateOptions } from 'formiojs';
import { AlertsPosition } from './types/alerts-position';
export { ConditionalOptions, ValidateOptions } from 'formiojs';

export interface ComponentOptions<T = any, V extends ValidateOptions = ValidateOptions> extends ExtendedComponentSchema<T> {
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

export interface ComponentInstance {
  component: ExtendedComponentSchema;
  id: string;
  type: string;
  asString?(value: any): string;
  getView(value: any): string;
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
  alertsPosition?: AlertsPosition;
  disableAlerts?: boolean;
  i18n?: object;
  fileService?: object;
  hooks?: FormioHookOptions;
  sanitizeConfig?: any;
}
