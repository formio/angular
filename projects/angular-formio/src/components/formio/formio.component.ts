import { Component, OnInit, Optional, ViewEncapsulation, Input, NgZone, OnChanges } from '@angular/core';
import { FormioAppConfig } from '../../formio.config';
import { Formio, Form } from 'formiojs';
import { FormioBaseComponent } from '../../FormioBaseComponent';
import { CustomTagsService } from '../../custom-component/custom-tags.service';

/* tslint:disable */
@Component({
  selector: 'formio',
  templateUrl: './formio.component.html',
  styleUrls: ['../../../../../node_modules/formiojs/dist/formio.form.min.css'],
  encapsulation: ViewEncapsulation.None,
})
/* tslint:enable */
export class FormioComponent extends FormioBaseComponent implements OnInit, OnChanges {
  constructor(
    public ngZone: NgZone,
    @Optional() public config: FormioAppConfig,
    @Optional() public customTags?: CustomTagsService,
  ) {
    super(ngZone, config, customTags);
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
