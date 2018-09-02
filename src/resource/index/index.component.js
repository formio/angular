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
var FormioResourceIndexComponent = /** @class */ (function () {
    function FormioResourceIndexComponent(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
    }
    FormioResourceIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.initialize();
        this.gridQuery = {};
        if (this.service &&
            this.service.onParents &&
            this.config.parents &&
            this.config.parents.length) {
            // Wait for the parents to load before loading this grid.
            this.service.onParents.subscribe(function (parents) {
                lodash_1.each(parents, function (parent) {
                    if (parent) {
                        _this.gridQuery['data.' + parent.name + '._id'] =
                            parent.resource._id;
                    }
                });
                // Set the source to load the grid.
                _this.gridSrc = _this.service.formUrl;
            });
        }
        else if (this.service.formUrl) {
            this.gridSrc = this.service.formUrl;
        }
    };
    FormioResourceIndexComponent.prototype.onSelect = function (row) {
        this.router.navigate([row._id, 'view'], { relativeTo: this.route });
    };
    FormioResourceIndexComponent = __decorate([
        core_1.Component({
            templateUrl: './index.component.html'
        })
    ], FormioResourceIndexComponent);
    return FormioResourceIndexComponent;
}());
exports.FormioResourceIndexComponent = FormioResourceIndexComponent;
