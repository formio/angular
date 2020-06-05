import { Component, OnInit } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: "<a *ngIf=\"downloadUrl\" [href]=\"downloadUrl\" target=\"_blank\" class=\"pull-right\"><img src=\"https://pro.formview.io/assets/pdf.png\" style=\"height: 2em;\" /></a> <ul class=\"nav nav-tabs\" style=\"margin-bottom:10px\"> <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><i class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></i></a></li> <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\"><i class=\"fa fa-eye glyphicon glyphicon-eye\"></i> View</a></li> <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"service.perms.edit\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\"><i class=\"fa fa-edit glyphicon glyphicon-edit\"></i> Edit</a></li> <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"service.perms.delete\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li> </ul> <router-outlet></router-outlet> "
})
export class SubmissionComponent implements OnInit {
  public downloadUrl: string;
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute
  ) { }

  setDownloadUrl(url) {
    this.downloadUrl = url;
  }

  ngOnInit() {
    this.service.setSubmission(this.route).then((formio: any) => {
      formio.getDownloadUrl().then((url) => this.setDownloadUrl(url));
    });
  }
}
