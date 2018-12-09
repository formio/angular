import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormManagerConfig } from '../form-manager.config';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from '../../auth/auth.service';
import _merge from 'lodash/merge';
import _throttle from 'lodash/throttle';
import _cloneDeep from 'lodash/cloneDeep';
import { Formio } from 'formiojs';

@Component({
  templateUrl: './view.component.html'
})
export class FormManagerViewComponent implements OnInit {
  public draft: any;
  public submission: any;
  public savingDraft: any;
  public triggerSaveDraft: any;
  public currentForm: any;
  public onSuccess: EventEmitter<object> = new EventEmitter();
  public onError: EventEmitter<object> = new EventEmitter();
  constructor(
    public service: FormManagerService,
    public router: Router,
    public route: ActivatedRoute,
    public config: FormManagerConfig,
    public auth: FormioAuthService
  ) {
    this.currentForm = null;
    this.draft = {data: {}};
    this.submission = {data: {}};
    this.savingDraft = true;
    this.triggerSaveDraft = _throttle(this.saveDraft.bind(this), 5000);
  }

  ngOnInit() {
    // Reset the formio service to this form only.
    this.savingDraft = true;
    this.service.formio = new Formio(this.service.formio.formUrl);
    this.service.loadForm().then((form) => {
      this.currentForm = form;
      if (this.auth && this.auth.userReady && this.config.saveDraft) {
        this.auth.userReady.then((user) => {
          this.service.formio.loadSubmissions({params: {
              state: 'draft',
              owner: user._id
            }}).then(submissions => {
            if (submissions.length > 0) {
              this.draft = submissions[0];
              this.submission = _cloneDeep(this.draft);
            }
            this.savingDraft = false;
          });
        });
      }
    });
  }

  saveDraft() {
    this.draft.state = 'draft';
    if (!this.savingDraft) {
      this.savingDraft = true;
      this.service.formio.saveSubmission(this.draft).then(submission => {
        this.draft = submission;
        this.savingDraft = false;
      });
    }
  }

  onChange(data: any) {
    if (this.config.saveDraft) {
      _merge(this.draft.data, data.data);
      this.triggerSaveDraft();
    }
  }

  onSubmit(submission: any) {
    this.savingDraft = true;
    this.submission.data = submission.data;
    this.submission.state = 'complete';
    this.service.formio.saveSubmission(this.submission).then(saved => {
      this.onSuccess.emit();
      this.router.navigate(['../', 'submission', saved._id], {relativeTo: this.route});
    }).catch((err) => this.onError.emit(err));
  }
}
