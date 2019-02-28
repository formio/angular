import {Component, OnInit} from '@angular/core';
import { FormioAuthService } from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Formio} from 'formiojs';
import {FormioAppConfig} from '../../formio.config';
import {FormioAuthConfig} from '../auth.config';
@Component({
  templateUrl: './reset.component.html'
})
export class FormioAuthResetComponent implements OnInit {
  submission: any = {data: {}};
  user: any;
  emailSent = false;
  resource: any;
  constructor(public router: Router, public route: ActivatedRoute, public appConfig: FormioAppConfig, public authConfig: FormioAuthConfig,
              public service: FormioAuthService) {
  }
  onSubmit(submission) {
    this.emailSent = true;
  }

  ngOnInit() {
    this.submission.data.appUrl = window.location.origin;
    this.submission.data.projectUrl = encodeURIComponent(this.appConfig.appUrl);
  }
}
