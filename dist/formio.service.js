"use strict";
var Formio = require('formiojs');
var Observable_1 = require('rxjs/Observable');
var FormioService = (function () {
    function FormioService(url) {
        this.url = url;
    }
    FormioService.prototype.loadForm = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            (new Formio(_this.url)).loadForm().then(function (form) {
                observer.next(form);
                observer.complete();
            });
        });
    };
    FormioService.prototype.saveSubmission = function (submission) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            (new Formio(_this.url)).saveSubmission(submission).then(function (submission) {
                observer.next(submission);
                observer.complete();
            });
        });
    };
    FormioService.prototype.loadSubmissions = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            (new Formio(_this.url)).loadSubmissions().then(function (submission) {
                observer.next(submission);
                observer.complete();
            });
        });
    };
    return FormioService;
}());
exports.FormioService = FormioService;
