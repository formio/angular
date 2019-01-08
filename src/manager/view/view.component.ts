import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormManagerConfig } from '../form-manager.config';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from '../../auth/auth.service';
import { Formio } from 'formiojs';

@Component({
  templateUrl: './view.component.html'
})
export class FormManagerViewComponent implements OnInit {
  public submission: any;
  public currentForm: any;
  public renderOptions: any;
  public onSuccess: EventEmitter<object> = new EventEmitter();
  public onError: EventEmitter<object> = new EventEmitter();
  constructor(
    public service: FormManagerService,
    public router: Router,
    public route: ActivatedRoute,
    public config: FormManagerConfig,
    public auth: FormioAuthService
  ) {
    this.renderOptions = {
      saveDraft: this.config.saveDraft
    };
    this.currentForm = null;
    this.submission = {data: {}};
  }

  ngOnInit() {
    // Reset the formio service to this form only.
    this.service.formio = new Formio(this.service.formio.formUrl);
    this.service.loadForm().then((form) => {
      this.currentForm = form;
    });
  }

  onSubmit(submission: any) {
    this.submission.data = submission.data;
    this.submission.state = 'complete';
    this.service.formio.saveSubmission(this.submission).then(saved => {
      this.onSuccess.emit();
      this.router.navigate(['../', 'submission', saved._id], {relativeTo: this.route});
    }).catch((err) => this.onError.emit(err));
  }
}
