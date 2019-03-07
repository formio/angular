import { Injectable } from '@angular/core';

export interface FormManagerRouteConfig {
  formIndex?: any;
  formCreate?: any;
  form?: any;
  formView?: any;
  formEdit?: any;
  formEmbed?: any;
  formDelete?: any;
  submissionIndex?: any;
  submission?: any;
  submissionView?: any;
  submissionEdit?: any;
  submissionDelete?: any;
}

@Injectable()
export class FormManagerConfig {
  public tag = '';
  public includeSearch = false;
  public saveDraft = false;
  public builder?: any;
  public viewer?: string;
  public renderer: any;
}
