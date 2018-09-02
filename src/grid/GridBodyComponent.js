"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var lodash_1 = require("lodash");
var GridBodyComponent = /** @class */ (function () {
    function GridBodyComponent() {
        this.firstItem = 0;
        this.lastItem = 0;
        this.skip = 0;
        this.total = 0;
        this.rowSelect = new core_1.EventEmitter();
        this.rowAction = new core_1.EventEmitter();
        this.loading = true;
    }
    GridBodyComponent.prototype.load = function (formio, query) {
        return Promise.resolve({});
    };
    GridBodyComponent.prototype.onRowSelect = function (event, row) {
        event.preventDefault();
        this.rowSelect.emit(row);
    };
    GridBodyComponent.prototype.onRowAction = function (event, row, action) {
        event.preventDefault();
        this.rowAction.emit({ row: row, action: action });
    };
    /**
     * Set the rows for this Grid body.
     *
     * @param query
     * @param items
     * @return any
     */
    GridBodyComponent.prototype.setRows = function (query, items) {
        var _this = this;
        this.rows = [];
        this.firstItem = query.skip + 1;
        this.lastItem = this.firstItem + items.length - 1;
        this.total = items.serverCount;
        this.skip = Math.floor(items.skip / query.limit) + 1;
        this.loading = false;
        lodash_1.each(items, function (item) {
            _this.rows.push(item);
        });
        return this.rows;
    };
    __decorate([
        core_1.Input()
    ], GridBodyComponent.prototype, "header", void 0);
    __decorate([
        core_1.Output()
    ], GridBodyComponent.prototype, "rowSelect", void 0);
    __decorate([
        core_1.Output()
    ], GridBodyComponent.prototype, "rowAction", void 0);
    __decorate([
        core_1.ViewChild(core_1.TemplateRef)
    ], GridBodyComponent.prototype, "template", void 0);
    return GridBodyComponent;
}());
exports.GridBodyComponent = GridBodyComponent;
