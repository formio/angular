import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';
import { ActivatedRoute } from '@angular/router';
import { FormioAppConfig } from '../../formio.config';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Formio } from 'formiojs';

@Component({
  template: "<button *ngIf=\"options.viewer\" class=\"pull-right btn btn-outline-primary\" (click)=\"openEmbed(content)\"><i class=\"fa fa-share-alt glyphicon glyphicon-share\"></i> Share</button> <ul class=\"nav nav-tabs mb-2\"> <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><i class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></i></a></li> <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\"><i class=\"fa fa-pencil glyphicon glyphicon-pencil\"></i> Enter Data</a></li> <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"submission\" routerLinkActive=\"active\"><i class=\"fa fa-list-alt glyphicon glyphicon-list-alt\"></i> View Data</a></li> <li *ngIf=\"service.actionAllowed('formEdit')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\"><i class=\"fa fa-edit glyphicon glyphicon-edit\"></i> Edit Form</a></li> <li *ngIf=\"service.actionAllowed('formDelete')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li> </ul> <router-outlet></router-outlet> <ng-template #content> <div class=\"modal-header\"> <h4 class=\"modal-title\">Share or Embed this form</h4> <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modalRef.hide()\"> <span aria-hidden=\"true\">&times;</span> </button> </div> <div class=\"modal-body\"> <ul class=\"nav nav-tabs mr-auto mb-2\"> <li class=\"nav-item\"> <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isUrl'}\" (click)=\"choices('isUrl')\"><i class=\"fa fa-link\"></i> URL</a> </li> <li class=\"nav-item\"> <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isEmbed'}\" (click)=\"choices('isEmbed')\"><i class=\"fa fa-code\"></i> Embed</a> </li> </ul> <pre  *ngIf=\"choice === 'isEmbed'\"><textarea onclick=\"this.focus();this.select()\" readonly=\"readonly\" style=\"width:100%;\" rows=\"8\" [ngModel]=\"embedCode\"></textarea></pre> <input *ngIf=\"choice === 'isUrl'\" type=\"text\" onclick=\"this.focus();this.select()\" readonly=\"readonly\" class=\"form-control\" [ngModel]=\"shareUrl\" placeholder=\"https://examples.form.io/example\"> </div> <div class=\"modal-footer\"> <button type=\"button\" class=\"btn btn-light\" (click)=\"modalRef.hide()\">Close</button> </div> </ng-template> "
})
export class FormManagerFormComponent implements OnInit {
  choice: any = 'isUrl';
  embedCode: any;
  formio: any;
  shareUrl: any;
  projectId: any;
  pathName: any;
  goTo: any = '';
  modalRef: BsModalRef;
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute,
    public appConfig: FormioAppConfig,
    public options: FormManagerConfig,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.formio = new Formio(`${this.appConfig.appUrl}/form/${params.id}`);
      this.formio.loadForm().then(form => {
        this.projectId = form.project;
        this.pathName = form.path;
        this.getShareUrl();
      });
      this.service.reset(this.route);
    });
  }

  public getShareUrl() {
    const src = this.appConfig.appUrl + '/' + this.pathName;
    this.shareUrl = `${this.options.viewer}/#/?src=${encodeURIComponent(src)}`;
    return this.shareUrl;
  }

  openEmbed(content: TemplateRef<any>) {
    let goto = '';
    if (this.goTo) {
      goto += `if (d && d.formSubmission && d.formSubmission._id) { window.location.href = "${this.goTo}";}`;
    }
    let embedCode = '<script type="text/javascript">';
    embedCode += '(function a(d, w, u) {';
    embedCode +=    'var h = d.getElementsByTagName("head")[0];';
    embedCode +=    'var s = d.createElement("script");';
    embedCode +=    's.type = "text/javascript";';
    embedCode +=    's.src = "' + this.options.viewer + '/assets/lib/seamless/seamless.parent.min.js";';
    embedCode +=    's.onload = function b() {';
    embedCode +=       'var f = d.getElementById("formio-form-' + this.formio.formId + '");';
    embedCode +=       'if (!f || (typeof w.seamless === u)) {';
    embedCode +=          'return setTimeout(b, 100);';
    embedCode +=       '}';
    embedCode +=       'w.seamless(f, {fallback:false}).receive(function(d, e) {' + goto + '});';
    embedCode +=    '};';
    embedCode +=    'h.appendChild(s);';
    embedCode += '})(document, window);';
    embedCode += '</script>';
    embedCode += '<iframe id="formio-form-' + this.formio.formId + '" ';
    embedCode +=     'style="width:100%;border:none;" height="800px" src="' + this.shareUrl + '&iframe=1"></iframe>';
    this.embedCode = embedCode;
    this.modalRef = this.modalService.show(content, { class: 'modal-lg' });
  }

  choices(string) {
    this.choice = string;
  }
}
