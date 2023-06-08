import {Component, EventEmitter, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
import { Formio } from '@formio/js';

@Component({
  templateUrl: './edit.component.html'
})
export class FormioResourceEditComponent implements OnDestroy {
  public triggerError: EventEmitter<any> = new EventEmitter();
  public onSubmitDone: EventEmitter<object> = new EventEmitter();
  public submission = {data: {}};
  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioResourceConfig
  ) {}

  onSubmit(submission: any) {
    const edit = this.service.resource;
    edit.data = submission.data;
    this.service.save(edit)
      .then(() => {
        this.onSubmitDone.emit(this.service.resource);
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
      })
      .catch((err) => this.triggerError.emit(err));
  }

  ngOnDestroy() {
    Formio.clearCache();
  }
}
