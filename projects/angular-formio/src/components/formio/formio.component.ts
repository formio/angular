import { Component, OnInit, Optional, ViewEncapsulation, Input, NgZone, OnChanges } from '@angular/core';
import { FormioAppConfig } from '../../formio.config';
import { Formio, Form } from '@formio/js';
import { FormioBaseComponent } from '../../FormioBaseComponent';
import { CustomTagsService } from '../../custom-tags.service';
import { NgIf } from '@angular/common';
import { FormioLoaderComponent } from '../loader/formio.loader.component';
import { FormioAlertsComponent } from '../alerts/formio.alerts.component';

/* tslint:disable */
@Component({
  selector: 'formio',
  templateUrl: './formio.component.html',
  styleUrls: ['../../../../../node_modules/@formio/js/dist/formio.form.min.css'],
  encapsulation: ViewEncapsulation.None,
    imports: [NgIf, FormioLoaderComponent, FormioAlertsComponent]
})
/* tslint:enable */
export class FormioComponent extends FormioBaseComponent implements OnInit, OnChanges {
  constructor(
    public ngZone: NgZone,
    @Optional() public config: FormioAppConfig,
    @Optional() public customTags?: CustomTagsService,
  ) {
    super(ngZone, config, customTags);
    alert('Hello FormioComponent');
    if (this.config) {
      Formio.setBaseUrl(this.config.apiUrl);
      Formio.setProjectUrl(this.config.appUrl);
    } else {
      console.warn('You must provide an AppConfig within your application!');
    }
  }

  getRenderer() {
    return this.renderer || Form;
  }
}
