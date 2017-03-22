"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var Formio = require('formiojs');
var FormioService = (function () {
    function FormioService(url) {
        this.url = url;
        this.formio = new Formio(this.url);
    }
    FormioService.prototype.loadForm = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            try {
                _this.formio.loadForm().then(function (form) {
                    observer.next(form);
                    observer.complete();
                }).catch(function (err) { return observer.error(err); });
            }
            catch (err) {
                observer.error(err);
            }
        });
    };
    FormioService.prototype.loadSubmission = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            try {
                _this.formio.loadSubmission().then(function (form) {
                    observer.next(form);
                    observer.complete();
                }).catch(function (err) { return observer.error(err); });
            }
            catch (err) {
                observer.error(err);
            }
        });
    };
    FormioService.prototype.saveSubmission = function (submission) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            try {
                _this.formio.saveSubmission(submission).then(function (submission) {
                    observer.next(submission);
                    observer.complete();
                }).catch(function (err) { return observer.error(err); });
            }
            catch (err) {
                observer.error(err);
            }
        });
    };
    FormioService.prototype.loadSubmissions = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            try {
                _this.formio.loadSubmissions().then(function (submission) {
                    observer.next(submission);
                    observer.complete();
                }).catch(function (err) { return observer.error(err); });
            }
            catch (err) {
                observer.error(err);
            }
        });
    };
    return FormioService;
}());
exports.FormioService = FormioService;
