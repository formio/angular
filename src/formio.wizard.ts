import { Component, Input, Output, EventEmitter, OnInit, ElementRef }  from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioService } from './formio.service';
import { FormioForm, FormioEvents, FormioOptions } from './formio.common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'formio-wizard',
    template: '<div></div>'
})
export class FormioWizardComponent implements OnInit {
    public formGroup: FormGroup = new FormGroup({});
    public events: FormioEvents = new FormioEvents();
    public ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public page: any;
    public pages: Array<any> = [];
    public currentPage: number;
    public storage: Object = {};
    public margin: number = 0;
    public colClass: string;
    public localStorageKey: string;
    public formioAlerts: Array<any> = [];
    @Input() options: FormioOptions;
    @Input() form: FormioForm = null;
    @Input() submission: any = {};
    @Input() src: string;
    @Input() service: FormioService;
    @Output() change: EventEmitter<any> = new EventEmitter();
    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        this.form.components.forEach((item: any) => {
            this.pages.push(item);
        });
        this.updatePages();
        if (this.src) {
            this.localStorageKey = this.src.split('/')[3];
            this.service = new FormioService(this.src);
            this.pages.splice(this.pages.length-1, 1);
        }
        else {
            this.localStorageKey = 'form_wizard';
        }
        if (localStorage.getItem(this.localStorageKey)) {
            this.storage = JSON.parse(localStorage.getItem(this.localStorageKey));
            this.currentPage = this.storage['page'];
            this.page = this.pages[this.currentPage];
        }
        else {
            this.initWizard();
        }
    }
    onChange(event: any) {
        this.storage['data'] = event;
        if (localStorage.getItem(this.localStorageKey)) {
            this.storage['data'] = this.extend(this.storage['data'], JSON.parse(localStorage.getItem(this.localStorageKey)).data);
        }
    }
    public extend(obj: Object, src: Object) {
        Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
        return obj;
    }
    public checkErrors(): boolean {
        if (this.elementRef.nativeElement.querySelector('form').classList.contains('ng-invalid')) {
            this.showAlerts({
                type: 'danger',
                message: 'Please fix the following errors before proceeding.'
            });
            return true;
        }
        else {
            return false;
        }
    }
    public next() {
        if (this.checkErrors()) {
            return;
        }
        this.formioAlerts = [];
        if (this.currentPage >= (this.pages.length - 1)) {
            return;
        }
        this.currentPage++;
        this.page = this.pages[this.currentPage];
        this.storage['page'] = this.pages.indexOf(this.page);
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
    }
    public prev() {
        if (this.currentPage < 1) {
            return;
        }
        this.formioAlerts = [];
        this.currentPage--;
        this.page = this.pages[this.currentPage];
        this.storage['page'] = this.pages.indexOf(this.page);
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
        this.submission.data = this.storage['data'];
    }
    public showAlerts(alerts: any) {
        this.formioAlerts = [].concat(alerts);
    };
    public onSubmitWizard() {
        if (this.checkErrors()) {
            return;
        }
        this.formioAlerts = [];
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
        let submission = {data: JSON.parse(localStorage.getItem(this.localStorageKey)).data};
        if (this.service) {
            this.service.saveSubmission(submission).subscribe((sub: {}) => {
                localStorage.removeItem(this.localStorageKey);
                this.showAlerts({
                    type: 'success',
                    message: 'Submission Complete!'
                });
            });
        }
    }
    public initWizard() {
        this.currentPage = 0;
        this.page = this.pages[0];
        this.storage['page'] = 0;
        this.storage['data'] = {};
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
    }
    public cancel() {
        this.initWizard();
    }
    public goto(index: number) {
        if (index < 0) {return;}
        if (index >= this.pages.length) {return;}
        this.currentPage = index;
        this.page = this.pages[this.currentPage];
    }
    public updatePages() {
        if (this.pages.length > 6) {
            this.margin = ((1 - (this.pages.length * 0.0833333333)) / 2) * 100;
            this.colClass = 'col-sm-1';
        }
        else {
            this.margin = ((1 - (this.pages.length * 0.1666666667)) / 2) * 100;
            this.colClass = 'col-sm-2';
        }
    }
}
