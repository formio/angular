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
  choice: any = 'isEmbed';
  embedCode: any;
  formio: any;
  formUrl: any;
  src: any;
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
      const appUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
      this.formUrl = appUrl;
      this.formio = new Formio(`${this.appConfig.appUrl}/form/${params.id}`);
      this.formio.loadForm().then(form => {
        this.projectId = form.project;
        this.pathName = form.path;
      });
      this.service.reset(this.route);
    });
  }

  openEmbed(content: TemplateRef<any>) {
    this.src = this.appConfig.appUrl + '/' + this.pathName;
    this.shareUrl = `${this.options.viewer}#/?src=${encodeURIComponent(this.src)}&theme=cosmo&header=0&iframe=1`;
    let embedCode = '<script type="text/javascript">';
    embedCode += '(function a(d, w, u) {';
    embedCode +=    'var h = d.getElementsByTagName("head")[0];';
    embedCode +=    'var s = d.createElement("script");';
    embedCode +=    's.type = "text/javascript";';
    embedCode +=    's.src = "' + window.location.protocol + '//' + window.location.host + window.location.pathname + 'lib/seamless/seamless.parent.min.js";';
    embedCode +=    's.onload = function b() {';
    embedCode +=       'var f = d.getElementById("formio-form-' + this.formio.formId + '");';
    embedCode +=       'if (!f || (typeof w.seamless === u)) {';
    embedCode +=          'return setTimeout(b, 100);';
    embedCode +=       '}';
    embedCode +=       'w.seamless(f, {fallback:false}).receive(function(d, e) {';
    embedCode +=          this.goTo ? 'if (d && d.formSubmission && d.formSubmission._id) { window.location.href = "' + this.goTo + '";}' : '';
    embedCode +=        '});';
    embedCode +=    '};';
    embedCode +=    'h.appendChild(s);';
    embedCode += '})(document, window);';
    embedCode += '</script>';
    embedCode += '<iframe id="formio-form-' + this.formio.formId + '" style="width:100%;border:none;" height="800px" src="' + this.shareUrl + '"></iframe>';
    this.embedCode = embedCode;
    this.modalRef = this.modalService.show(content, { class: 'modal-lg' });
  }

  choices(string) {
    this.choice = string;
  }
}
