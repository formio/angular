import {Component, OnInit} from '@angular/core';
import { FormioAuthService } from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Formio} from 'formiojs';
import {FormioAppConfig} from '../../formio.config';
import {FormioAuthConfig} from '../auth.config';
@Component({
  templateUrl: './verify.component.html'
})
export class FormioAuthVerifyComponent implements OnInit {
  submission: any = {data: {}};
  user: any;
  isVerified = false;
  resource: any;
  constructor(public router: Router, public route: ActivatedRoute, public appConfig: FormioAppConfig, public authConfig: FormioAuthConfig,
              public service: FormioAuthService) {
  }
  setToken() {
    this.route.queryParams.subscribe(params => {
      if (params.res && params.token) {
        this.resource = params.res;
        Formio.setToken(params.token).then((user) => {
          this.service.setUser(user);
          this.isVerified = true;
          this.user = user;
        });
      } else {
        console.error('You must provide a token and resource name!');
      }
    });
  }
  onSubmit(submission) {
    this.user = this.user && this.user.data ? this.user : JSON.parse(localStorage.getItem('formioUser'));
    this.user.data.password = this.submission.data.password;
    this.authenticated(this.user);
  }
  authenticated(user) {
    const submission = user;
    const resource = new Formio(`${this.appConfig.appUrl}/${this.resource}/submission/${user._id}`);
    submission['data'].onBoarded = true;
    resource.saveSubmission(submission).then((res) => {
      this.router.navigate([this.authConfig.redirect]);
    });
  }

  ngOnInit() {
    this.setToken();
  }
}
