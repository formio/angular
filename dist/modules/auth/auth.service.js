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
var auth_config_1 = require("./auth.config");
var index_1 = require("../../index");
var Formio = require('formiojs');
var _each = require('lodash/each');
var FormioAuthService = (function () {
    function FormioAuthService(appConfig, config) {
        var _this = this;
        this.appConfig = appConfig;
        this.config = config;
        this.authenticated = false;
        this.formAccess = {};
        this.submissionAccess = {};
        this.is = {};
        this.user = null;
        // Allow them to provide different app config per instance.
        if (this.config.app) {
            this.appConfig = this.config.app;
        }
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setAppUrl(this.appConfig.appUrl);
            Formio.formOnly = !!this.appConfig.formOnly;
        }
        else {
            console.warn('You must provide an AppConfig within your application!');
        }
        this.loginForm = this.appConfig.appUrl + '/' + this.config.login.form;
        this.registerForm = this.appConfig.appUrl + '/' + this.config.register.form;
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
        Formio.events.on('formio.badToken', function () { return _this.logoutError(); });
        Formio.events.on('formio.sessionExpired', function () { return _this.logoutError(); });
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
        this.projectReady = Formio.makeStaticRequest(this.appConfig.appUrl).then(function (project) {
            _each(project.access, function (access) {
                _this.formAccess[access.type] = access.roles;
            });
        }, function (err) {
            _this.formAccess = {};
            return null;
        });
        // Get the access for this project.
        this.accessReady = Formio.makeStaticRequest(this.appConfig.appUrl + '/access').then(function (access) {
            _each(access.forms, function (form) {
                _this.submissionAccess[form.name] = {};
                form.submissionAccess.forEach(function (access) {
                    _this.submissionAccess[form.name][access.type] = access.roles;
                });
            });
            _this.roles = access.roles;
            return access;
        }, function (err) {
            _this.roles = {};
            return null;
        });
        this.userReady = Formio.currentUser().then(function (user) {
            _this.setUser(user);
            return user;
        });
        // Trigger we are redy when all promises have resolved.
        this.accessReady
            .then(function () { return _this.projectReady; })
            .then(function () { return _this.userReady; })
            .then(function () { return _this.readyResolve(true); })
            .catch(function (err) { return _this.readyReject(err); });
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
            Formio.clearCache();
            Formio.setUser(null);
        }
        this.authenticated = !!Formio.getToken();
        this.onUser.emit(this.user);
    };
    FormioAuthService.prototype.setUserRoles = function () {
        var _this = this;
        this.accessReady.then(function () {
            _each(_this.roles, function (role, roleName) {
                if (_this.user.roles.indexOf(role._id) !== -1) {
                    _this.is[roleName] = true;
                }
            });
        });
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
        Formio.logout().then(function () { return _this.onLogout.emit(); }).catch(function () { return _this.logoutError(); });
    };
    return FormioAuthService;
}());
FormioAuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [index_1.FormioAppConfig,
        auth_config_1.FormioAuthConfig])
], FormioAuthService);
exports.FormioAuthService = FormioAuthService;
