"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserManagerIndexComponent = /** @class */ (function () {
    function UserManagerIndexComponent(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.gridQuery = { tags: this.config.tag, type: 'resource' };
        this.refreshGrid = new core_1.EventEmitter();
    }
    UserManagerIndexComponent.prototype.ngOnInit = function () {
        this.service.reset();
    };
    UserManagerIndexComponent.prototype.onSearch = function () {
        var searchInput = this.search.nativeElement.value;
        if (searchInput.length > 0) {
            this.gridQuery.skip = 0;
            this.gridQuery.title__regex = '/' + searchInput + '/i';
        }
        else {
            delete this.gridQuery.title__regex;
        }
        this.refreshGrid.emit(this.gridQuery);
    };
    UserManagerIndexComponent.prototype.onAction = function (action) {
        this.router.navigate([action.row._id, action.action], { relativeTo: this.route });
    };
    UserManagerIndexComponent.prototype.onSelect = function (row) {
        this.router.navigate([row.data.path, 'view'], { relativeTo: this.route });
    };
    UserManagerIndexComponent.prototype.onCreateItem = function () {
        this.router.navigate(['create'], { relativeTo: this.route });
    };
    __decorate([
        core_1.ViewChild('search')
    ], UserManagerIndexComponent.prototype, "search", void 0);
    UserManagerIndexComponent = __decorate([
        core_1.Component({
            templateUrl: './index.component.html'
        })
    ], UserManagerIndexComponent);
    return UserManagerIndexComponent;
}());
exports.UserManagerIndexComponent = UserManagerIndexComponent;
