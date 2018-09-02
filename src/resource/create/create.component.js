"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormioResourceCreateComponent = /** @class */ (function () {
    function FormioResourceCreateComponent(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.onError = new core_1.EventEmitter();
        this.onSuccess = new core_1.EventEmitter();
    }
    FormioResourceCreateComponent.prototype.ngOnInit = function () {
        // Start with fresh data.
        this.service.initialize();
    };
    FormioResourceCreateComponent.prototype.onSubmit = function (submission) {
        var _this = this;
        this.service
            .save(submission)
            .then(function () {
            _this.router.navigate(['../', _this.service.resource._id, 'view'], {
                relativeTo: _this.route
            });
        })
            .catch(function (err) { return _this.onError.emit(err); });
    };
    FormioResourceCreateComponent = __decorate([
        core_1.Component({
            styleUrls: ['./create.component.scss'],
            templateUrl: './create.component.html'
        })
    ], FormioResourceCreateComponent);
    return FormioResourceCreateComponent;
}());
exports.FormioResourceCreateComponent = FormioResourceCreateComponent;
