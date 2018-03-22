import { Component } from '@angular/core';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';

@Component({
  templateUrl: './view.component.html'
})
export class FormioResourceViewComponent {
  constructor(
    public service: FormioResourceService,
    public config: FormioResourceConfig
  ) {}
}
