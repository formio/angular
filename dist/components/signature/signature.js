"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var base_1 = require('../base');
var components_1 = require('../components');
var signature_pad_1 = require('angular2-signaturepad/signature-pad');
var core_1 = require('@angular/core');
var AlignDirective = (function () {
    function AlignDirective(el) {
        this.el = el;
    }
    AlignDirective = __decorate([
        core_1.Directive({
            selector: '[align]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AlignDirective);
    return AlignDirective;
}());
exports.AlignDirective = AlignDirective;
var SignatureComponent = (function (_super) {
    __extends(SignatureComponent, _super);
    function SignatureComponent() {
        _super.apply(this, arguments);
    }
    return SignatureComponent;
}(base_1.BaseComponent));
exports.SignatureComponent = SignatureComponent;
var SignatureElement = (function (_super) {
    __extends(SignatureElement, _super);
    function SignatureElement() {
        _super.apply(this, arguments);
        this.signaturePadOptions = {
            'minWidth': 0.5,
            'canvasWidth': 500,
            'canvasHeight': 300,
            'backgroundColor': 'rgb(245,245,235)',
            'penColor': 'black'
        };
    }
    SignatureElement.prototype.clearSignature = function () {
        this.signaturePad.clear();
    };
    SignatureElement.prototype.drawComplete = function () {
        this.component.setValue(this.signaturePad.toDataURL());
    };
    SignatureElement.prototype.setDimension = function (temp, getDim) {
        if (getDim.slice(-1) == '%') {
            this.finalDim = temp * (parseFloat(getDim.slice(0, -1)) / 100);
            return this.finalDim;
        }
        else {
            this.finalDim = parseInt(getDim, 10);
            return this.finalDim;
        }
    };
    SignatureElement.prototype.ngOnInit = function () {
        this.setWidth = this.alignDirective.el.nativeElement.clientWidth;
        this.setHeight = this.alignDirective.el.nativeElement.clientHeight;
        this.setWidth = this.setDimension(this.setWidth, this.component.settings.width);
        this.setHeight = this.setDimension(this.setHeight, this.component.settings.height);
        this.signaturePadOptions = {
            'minWidth': this.component.settings.minWidth,
            'canvasWidth': this.setWidth,
            'canvasHeight': this.setHeight,
            'backgroundColor': this.component.settings.backgroundColor,
            'penColor': this.component.settings.penColor
        };
    };
    SignatureElement.prototype.ngAfterViewInit = function () {
        this.signaturePad.clear();
        if (this.component.data[this.component.settings.key] != null) {
            this.signaturePad.fromDataURL(this.component.data[this.component.settings.key]);
        }
    };
    __decorate([
        core_1.ViewChild(signature_pad_1.SignaturePad), 
        __metadata('design:type', signature_pad_1.SignaturePad)
    ], SignatureElement.prototype, "signaturePad", void 0);
    __decorate([
        core_1.ViewChild(AlignDirective), 
        __metadata('design:type', AlignDirective)
    ], SignatureElement.prototype, "alignDirective", void 0);
    return SignatureElement;
}(base_1.BaseElement));
exports.SignatureElement = SignatureElement;
function SignatureField(template) {
    components_1.FormioComponents.register('signature', SignatureComponent, SignatureElement, template.components.signature);
    return SignatureElement;
}
exports.SignatureField = SignatureField;
