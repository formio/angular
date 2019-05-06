import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';
import { ActivatedRoute } from '@angular/router';
import { FormioAppConfig } from '../../formio.config';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Formio } from 'formiojs';

@Component({
  templateUrl: './form.component.html'
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
