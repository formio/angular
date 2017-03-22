"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Formio = require('formiojs');
var FormioUtils = require('formiojs/utils');
var _get = require('lodash/get');
var _each = require('lodash/each');
var _assign = require('lodash/assign');
var FormioGridComponent = (function () {
    function FormioGridComponent() {
        this.columns = [];
        this.rows = [];
        this.total = 0;
        this.page = 0;
        this.firstItem = 0;
        this.lastItem = 0;
        this.skip = 0;
        this.isLoading = false;
        this.select = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
    }
    FormioGridComponent.prototype.loadGrid = function (src) {
        var _this = this;
        // If no source is provided, then skip.
        if (!src) {
            return;
        }
        // Do not double load.
        if (this.formio && (src === this.src)) {
            return;
        }
        this.formio = new Formio(this.src);
        if (!this.onForm) {
            this.onForm = this.formio.loadForm();
        }
        this.onForm.then(function (form) {
            _this.form = form;
            _this.setupColumns();
        });
        this.setPage(0);
    };
    FormioGridComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refresh.subscribe(function (query) { return _this.refreshGrid(query); });
        }
        // Load the grid.
        this.loadGrid(this.src);
    };
    FormioGridComponent.prototype.ngOnChanges = function (changes) {
        if (changes.src && changes.src.currentValue) {
            this.loadGrid(changes.src.currentValue);
        }
    };
    FormioGridComponent.prototype.setupColumns = function () {
        var _this = this;
        FormioUtils.eachComponent(this.form.components, function (component) {
            if (component.input && component.tableView) {
                _this.columns.push({
                    label: component.label,
                    key: 'data.' + component.key,
                    sort: '',
                    component: component
                });
            }
        });
    };
    Object.defineProperty(FormioGridComponent.prototype, "loading", {
        set: function (_loading) {
            this.isLoading = _loading;
        },
        enumerable: true,
        configurable: true
    });
    FormioGridComponent.prototype.onError = function (error) {
        this.error.emit(error);
    };
    FormioGridComponent.prototype.refreshGrid = function (query) {
        var _this = this;
        query = query || {};
        query = _assign(query, this.query);
        if (!query.hasOwnProperty('limit')) {
            query.limit = 10;
        }
        if (!query.hasOwnProperty('skip')) {
            query.skip = 0;
        }
        this.loading = true;
        this.formio.loadSubmissions({ params: query }).then(function (submissions) {
            _this.firstItem = _this.query.skip + 1;
            _this.lastItem = _this.firstItem + submissions.length - 1;
            _this.total = submissions.serverCount;
            _this.skip = submissions.skip;
            _this.rows = [];
            _each(submissions, function (submission) {
                _this.rows.push(submission);
            });
            _this.loading = false;
        }, function (err) { return _this.onError(err); }).catch(function (err) { return _this.onError(err); });
    };
    FormioGridComponent.prototype.setPage = function (num) {
        if (num === void 0) { num = -1; }
        this.page = (num !== -1) ? num : this.page;
        if (!this.query.hasOwnProperty('limit')) {
            this.query.limit = 10;
        }
        if (!this.query.hasOwnProperty('skip')) {
            this.query.skip = 0;
        }
        this.query.skip = this.page * this.query.limit;
        this.refreshGrid();
    };
    FormioGridComponent.prototype.sortColumn = function (column) {
        // Reset all other column sorts.
        _each(this.columns, function (col) {
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
        this.refreshGrid();
    };
    FormioGridComponent.prototype.pageChanged = function (page) {
        this.setPage(page.page - 1);
    };
    FormioGridComponent.prototype.onClick = function (row) {
        this.select.emit(row);
    };
    FormioGridComponent.prototype.data = function (row, col) {
        var cellValue = _get(row, col.key);
        if (col.component && col.component.template) {
            return FormioUtils.interpolate(col.component.template, { item: cellValue });
        }
        return cellValue;
    };
    return FormioGridComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FormioGridComponent.prototype, "src", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Promise)
], FormioGridComponent.prototype, "onForm", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FormioGridComponent.prototype, "query", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], FormioGridComponent.prototype, "refresh", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FormioGridComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FormioGridComponent.prototype, "error", void 0);
FormioGridComponent = __decorate([
    core_1.Component({
        selector: 'formio-grid',
        styles: [
            ':host .formio-grid { position: relative; width: 100%; }',
            ':host >>> ul.pagination { margin: 5px 0; }',
            '.item-counter { margin: 5px 0; }',
            '.page-num { font-size: 1.4em; }',
            '.grid-refresh { height: 400px; width: 100%; }'
        ],
        template: '<div class="formio-grid">' +
            '<formio-loader></formio-loader>' +
            '<table class="table table-condensed table-bordered table-striped table-hover">' +
            '<thead>' +
            '<tr>' +
            '<th *ngFor="let col of columns"><a (click)="sortColumn(col)">{{ col.label }} <span [ngClass]="{\'glyphicon-triangle-top\': (col.sort === \'asc\'), \'glyphicon-triangle-bottom\': (col.sort === \'desc\')}" class="glyphicon" *ngIf="col.sort"></span></a></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody *ngIf="!isLoading">' +
            '<tr *ngFor="let row of rows" (click)="onClick(row)">' +
            '<td *ngFor="let col of columns" [innerHTML]="data(row, col)"></td>' +
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
    }),
    __metadata("design:paramtypes", [])
], FormioGridComponent);
exports.FormioGridComponent = FormioGridComponent;
