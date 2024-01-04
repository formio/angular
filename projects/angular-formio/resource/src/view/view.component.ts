import {Component, OnDestroy} from '@angular/core';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
import {Formio} from 'formiojs';

@Component({
  templateUrl: './view.component.html'
})
export class FormioResourceViewComponent implements OnDestroy{
  constructor(
    public service: FormioResourceService,
    public config: FormioResourceConfig
  ) {}
  public submission = {data: {}};

  ngOnDestroy() {
    Formio.clearCache();
  }
}
