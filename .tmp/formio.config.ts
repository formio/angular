import { Injectable } from '@angular/core';

@Injectable()
export class FormioAppConfig {
  appUrl = '';
  apiUrl = '';
  icons?: string;
  formOnly?: boolean;
}
