import { Component, Input, Output, EventEmitter, OnInit, ElementRef }  from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormioService } from './formio.service';
import { FormioForm, FormioEvents } from './formio.common';
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
    public data: Object = {};
    public margin: any;
    public colClass: string;
    public localStorageKey: string;
    @Input() form: FormioForm = null;
    @Input() submission: any = {};
    @Input() src: string;
    @Input() service: FormioService;
    @Output() change: EventEmitter<any> = new EventEmitter();
    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        this.currentPage = 0;
        this.page = this.form.components[0];
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
    }
    onChange(page: any, event: any) {
        this.storage['page'] = this.pages.indexOf(page) + 1;
        this.data[event.target.id] = event.target.value;
        this.storage['data'] = this.data;
    }
    public checkErrors(): boolean {
        //@TODO: Check Validations...
        return false;
    }
    public next() {
        if (this.checkErrors()) {
            return;
        }
        if (this.currentPage >= (this.pages.length - 1)) {
            return;
        }
        this.currentPage++;
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
        this.page = this.pages[this.currentPage];
    }
    public prev() {
        if (this.currentPage < 1) {
            return;
        }
        this.currentPage--;
        this.page = this.pages[this.currentPage];
        this.submission.data = this.data;
    }
    public onSubmitWizard() {
        if (this.checkErrors()) {
            return;
        }
        localStorage.setItem(this.localStorageKey,'');
        let submission = {data: this.data};
        if (this.service) {
            this.service.saveSubmission(submission).subscribe((sub: {}) => {});
        }
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
