"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var formiojs_1 = require("formiojs");
var GridHeaderComponent_1 = require("../GridHeaderComponent");
var SubmissionGridHeaderComponent = /** @class */ (function (_super) {
    __extends(SubmissionGridHeaderComponent, _super);
    function SubmissionGridHeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubmissionGridHeaderComponent.prototype.load = function (formio, query) {
        var _this = this;
        query = query || {};
        return formio.loadForm({ params: query }).then(function (form) {
            _this.headers = [];
            formiojs_1.Utils.eachComponent(form.components, function (component) {
                if (component.input && component.tableView) {
                    _this.headers.push({
                        label: component.label,
                        key: 'data.' + component.key,
                        sort: '',
                        component: formiojs_1.Components.create(component, null, null, true)
                    });
                }
            });
            return _this.headers;
        });
    };
    SubmissionGridHeaderComponent = __decorate([
        core_1.Component({
            templateUrl: './SubmissionGridHeader.component.html'
        })
    ], SubmissionGridHeaderComponent);
    return SubmissionGridHeaderComponent;
}(GridHeaderComponent_1.GridHeaderComponent));
exports.SubmissionGridHeaderComponent = SubmissionGridHeaderComponent;
