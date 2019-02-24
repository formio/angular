import { Component, OnInit } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';
import { ActivatedRoute } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormioAppConfig} from '../../formio.config';
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
  constructor(
    public service: FormManagerService,
    public route: ActivatedRoute,
    public appConfig: FormioAppConfig,
    private modalService: NgbModal,
    public options: FormManagerConfig
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const appUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
      this.formUrl = appUrl;
      this.formio = new Formio(`${this.appConfig.appUrl}/form/${params.id}`);
      this.formio.loadForm().then(form => {
        this.projectId = form.project;
        this.pathName = form.path;
        this.setShare();
        this.setEmbedCode();
      });
      this.service.reset(this.route);
    });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  choices(string) {
    this.choice = string;
  }

  setEmbedCode() {
    let embedCode = '<script type="text/javascript">';
    embedCode += '(function a(d, w, u) {';
    embedCode +=    'var h = d.getElementsByTagName("head")[0];';
    embedCode +=    'var s = d.createElement("script");';
    embedCode +=    's.type = "text/javascript";';
    embedCode +=    's.src = "' + window.location.protocol + '//' + window.location.host + window.location.pathname + 'lib/seamless/seamless.parent.min.js";';
    embedCode +=   's.onload = function b() {';
    embedCode +=       'var f = d.getElementById("formio-form-' + this.formio.formId + '");';
    embedCode +=       'if (!f || (typeof w.seamless === u)) {';
    embedCode +=           'return setTimeout(b, 100);';
    embedCode +=       '}';
    embedCode +=      'w.seamless(f, {fallback:false}).receive(function(d, e) {';
    embedCode +=        this.goTo ? 'if (d && d.formSubmission && d.formSubmission._id) { window.location.href = "' + this.goTo + '";}' : '';
    embedCode +=      '});';
    embedCode +=    '};';
    embedCode +=    'h.appendChild(s);';
    embedCode += '})(document, window);';
    embedCode += '</script>';
    embedCode += '<iframe id="formio-form-' + this.formio.formId + '" style="width:100%;border:none;" height="800px" src="' + this.shareUrl + '"></iframe>';
    this.embedCode = embedCode;
  }

  setShare() {
    this.src = this.appConfig.appUrl + '/' + this.pathName;
    this.shareUrl = `${location.origin}/view/index.html#/?src=${encodeURIComponent(this.src)}&theme=cosmo&header=0&iframe=1`;
  }
}
