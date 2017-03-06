import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
let Promise = require('native-promise-only');
let Formio = require('formiojs');
let FormioUtils = require('formio-utils');
let _get = require('lodash/get');
let _each = require('lodash/each');

@Component({
    selector: 'formio-grid',
    styles: [
        ':host .formio-grid { position: relative; width: 100%; }',
        ':host >>> ul.pagination { margin: 5px 0; }',
        '.item-counter { margin: 5px 0; }',
        '.page-num { font-size: 1.4em; }',
        '.grid-refresh { height: 400px; width: 100%; }',
        '.loader-wrapper { position:absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; }',
        '.loader {position:absolute;left: 50%;top: 50%;margin-left: -30px;margin-top: -30px;z-index: 10000;display: inline-block;border: 6px solid #f3f3f3;border-top: 6px solid #3498db;border-radius: 50%;width: 60px;height: 60px;animation: spin 2s linear infinite;}',
        '@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}'
    ],
    template:
        '<div class="formio-grid">' +
            '<div *ngIf="isLoading" class="loader-wrapper"><div class="loader"></div></div>' +
            '<table class="table table-condensed table-bordered table-striped table-hover">' +
                '<thead>' +
                    '<tr>' +
                        '<th *ngFor="let col of columns"><a (click)="sortColumn(col)">{{ col.label }} <span [ngClass]="{\'glyphicon-triangle-top\': (col.sort === \'asc\'), \'glyphicon-triangle-bottom\': (col.sort === \'desc\')}" class="glyphicon" *ngIf="col.sort"></span></a></th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody *ngIf="!isLoading">' +
                    '<tr *ngFor="let row of rows" (click)="onClick(row)">' +
                        '<td *ngFor="let col of columns">{{ data(row, col) }}</td>' +
                    '</tr>' +
                '</tbody>' +
                '<tfoot>' +
                    '<tr>' +
                        '<td [colSpan]="columns.length">' +
                            '<pagination [totalItems]="total" [(ngModel)]="skip" (pageChanged)="pageChanged($event)" class="pagination-sm"></pagination>' +
                            '<span class="pull-right item-counter"><span class="page-num">{{ firstItem }} - {{ lastItem }}</span> / {{ total }} total</span>' +
                        '</td>' +
                    '</tr>' +
                '</tfoot>' +
            '</table>' +
        '</div>'
})
export class FormioGridComponent implements OnInit {
    @Input() src: string;
    @Input() onForm: Promise<any>;
    @Input() query: any = {
        limit: 10,
        skip: 0
    };
    @Output() select: EventEmitter<Object>;

    private columns: Array<any> = [];
    private rows: Array<any> = [];
    private formio: any;
    private form: any;
    private total: number = 0;
    private page: number = 0;
    private firstItem: number = 0;
    private lastItem: number = 0;
    private skip: number = 0;
    private isLoading: boolean = false;

    constructor() {
        this.select = new EventEmitter();
    }

    ngOnInit() {
        this.formio = new Formio(this.src);
        if (!this.onForm) {
            this.onForm = this.formio.loadForm();
        }
        this.onForm.then((form: any) => {
            this.form = form;
            this.setupColumns();
        });
        this.setPage(0);
    }

    setupColumns() {
        FormioUtils.eachComponent(this.form.components, (component:any) => {
            if (component.input && component.tableView) {
                this.columns.push({
                    label: component.label,
                    key: 'data.' + component.key,
                    sort: ''
                });
            }
        });
    }

    set loading(_loading: boolean) {
        this.isLoading = _loading;
    }

    refresh() {
        this.loading = true;
        this.formio.loadSubmissions({params: this.query}).then((submissions:any) => {
            this.firstItem = this.query.skip + 1;
            this.lastItem = this.firstItem + submissions.length - 1;
            this.total = submissions.serverCount;
            this.skip = submissions.skip;
            this.rows = [];
            _each(submissions, (submission:any) => {
                this.rows.push(submission);
            });
            this.loading = false;
        });
    }

    setPage(num: number = -1) {
        this.page = (num !== -1) ? num : this.page;
        this.query.skip = this.page * this.query.limit;
        this.refresh();
    }

    sortColumn(column:any) {
        // Reset all other column sorts.
        _each(this.columns, (col:any) => {
            if (col.key !== column.key) {
                col.sort = '';
            }
        });
        switch (column.sort) {
            case 'asc':
                column.sort = 'desc';
                this.query.sort = '-' + column.key;
                break;
            case 'desc':
                column.sort = '';
                delete this.query.sort;
                break;
            case '':
                column.sort = 'asc';
                this.query.sort = column.key;
                break;
        }
        this.refresh();
    }

    pageChanged(page:any) {
        this.setPage(page.page - 1);
    }

    onClick(row:any) {
        this.select.emit(row);
    }

    data(row:any, col:any) {
        return _get(row, col.key);
    }
}
