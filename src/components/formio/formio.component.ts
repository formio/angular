import { Component, OnInit, Optional, ViewEncapsulation, Input, NgZone } from '@angular/core';
import { FormioLoader } from '../loader/formio.loader';
import { FormioAppConfig } from '../../formio.config';
import { Formio, Form, Utils } from 'formiojs';
import { FormioBaseComponent } from '../../FormioBaseComponent';
import { CustomTagsService } from '../../custom-component/custom-tags.service';

/* tslint:disable */
@Component({
  selector: 'formio',
  templateUrl: './formio.component.html',
  styleUrls: ['./formio.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
/* tslint:enable */
export class FormioComponent extends FormioBaseComponent implements OnInit {
  @Input() noeval ? = false;
  constructor(
    public ngZone: NgZone,
    public loader: FormioLoader,
    @Optional() public config: FormioAppConfig,
    @Optional() public customTags?: CustomTagsService,
  ) {
    super(ngZone, loader, config, customTags);
    if (this.config) {
      Formio.setBaseUrl(this.config.apiUrl);
      Formio.setProjectUrl(this.config.appUrl);
    } else {
      console.warn('You must provide an AppConfig within your application!');
    }
  }

  ngOnInit() {
    Utils.Evaluator.noeval = this.noeval;
    super.ngOnInit();
  }

  getRenderer() {
    return this.renderer || Form;
  }
}
