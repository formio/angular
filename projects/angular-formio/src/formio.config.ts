import { Injectable, OnInit } from '@angular/core';
import { Formio } from '@formio/js';
@Injectable({
  providedIn: 'root'
})
export class FormioAppConfig implements OnInit {
  [x: string]: any;
  appUrl = '';
  apiUrl = '';
  icons?: string;
  formOnly?: boolean;
  formio?: Formio;
  ngOnInit(): void {
    if (this.apiUrl) {
      Formio.setBaseUrl(this.apiUrl);
      Formio.setProjectUrl(this.appUrl);
      this.formio = new Formio(this.appUrl);
    }
  }
}
