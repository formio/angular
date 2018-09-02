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
var formiojs_1 = require("formiojs");
var FormioAuthService = /** @class */ (function () {
    function FormioAuthService(appConfig, config) {
        var _this = this;
        this.appConfig = appConfig;
        this.config = config;
        this.authenticated = false;
        this.formAccess = {};
        this.submissionAccess = {};
        this.is = {};
        this.user = null;
        if (this.appConfig && this.appConfig.appUrl) {
            formiojs_1.Formio.setBaseUrl(this.appConfig.apiUrl);
            formiojs_1.Formio.setProjectUrl(this.appConfig.appUrl);
            formiojs_1.Formio.formOnly = !!this.appConfig.formOnly;
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        this.loginForm =
            this.appConfig.appUrl +
                '/' +
                lodash_1.get(this.config, 'login.form', 'user/login');
        this.registerForm =
            this.appConfig.appUrl +
                '/' +
                lodash_1.get(this.config, 'register.form', 'user/login');
        this.onLogin = new core_1.EventEmitter();
        this.onLogout = new core_1.EventEmitter();
        this.onRegister = new core_1.EventEmitter();
        this.onUser = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.ready = new Promise(function (resolve, reject) {
            _this.readyResolve = resolve;
            _this.readyReject = reject;
        });
        // Register for the core events.
        formiojs_1.Formio.events.on('formio.badToken', function () { return _this.logoutError(); });
        formiojs_1.Formio.events.on('formio.sessionExpired', function () { return _this.logoutError(); });
        this.init();
    }
    FormioAuthService.prototype.onLoginSubmit = function (submission) {
        this.setUser(submission);
        this.onLogin.emit(submission);
    };
    FormioAuthService.prototype.onRegisterSubmit = function (submission) {
        this.setUser(submission);
        this.onRegister.emit(submission);
    };
    FormioAuthService.prototype.init = function () {
        var _this = this;
        this.projectReady = formiojs_1.Formio.makeStaticRequest(this.appConfig.appUrl).then(function (project) {
            lodash_1.each(project.access, function (access) {
                _this.formAccess[access.type] = access.roles;
            });
        }, function () {
            _this.formAccess = {};
            return null;
        });
        // Get the access for this project.
        this.accessReady = formiojs_1.Formio.makeStaticRequest(this.appConfig.appUrl + '/access').then(function (access) {
            lodash_1.each(access.forms, function (form) {
                _this.submissionAccess[form.name] = {};
                form.submissionAccess.forEach(function (subAccess) {
                    _this.submissionAccess[form.name][subAccess.type] = subAccess.roles;
                });
            });
            _this.roles = access.roles;
            return access;
        }, function () {
            _this.roles = {};
            return null;
        });
        this.userReady = formiojs_1.Formio.currentUser().then(function (user) {
            _this.setUser(user);
            return user;
        });
        // Trigger we are redy when all promises have resolved.
        if (this.accessReady) {
            this.accessReady
                .then(function () { return _this.projectReady; })
                .then(function () { return _this.userReady; })
                .then(function () { return _this.readyResolve(true); })
                .catch(function (err) { return _this.readyReject(err); });
        }
    };
    FormioAuthService.prototype.setUser = function (user) {
        if (user) {
            this.user = user;
            localStorage.setItem('formioAppUser', JSON.stringify(user));
            this.setUserRoles();
        }
        else {
            this.user = null;
            this.is = {};
            localStorage.removeItem('formioAppUser');
            formiojs_1.Formio.clearCache();
            formiojs_1.Formio.setUser(null);
        }
        this.authenticated = !!formiojs_1.Formio.getToken();
        this.onUser.emit(this.user);
    };
    FormioAuthService.prototype.setUserRoles = function () {
        var _this = this;
        if (this.accessReady) {
            this.accessReady.then(function () {
                lodash_1.each(_this.roles, function (role, roleName) {
                    if (_this.user.roles.indexOf(role._id) !== -1) {
                        _this.is[roleName] = true;
                    }
                });
            });
        }
    };
    FormioAuthService.prototype.logoutError = function () {
        this.setUser(null);
        localStorage.removeItem('formioToken');
        this.onError.emit();
    };
    FormioAuthService.prototype.logout = function () {
        var _this = this;
        this.setUser(null);
        localStorage.removeItem('formioToken');
        formiojs_1.Formio.logout()
            .then(function () { return _this.onLogout.emit(); })
            .catch(function () { return _this.logoutError(); });
    };
    FormioAuthService = __decorate([
        core_1.Injectable()
    ], FormioAuthService);
    return FormioAuthService;
}());
exports.FormioAuthService = FormioAuthService;
