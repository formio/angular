import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import {ViewChild, OnInit, ElementRef, Directive, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[align]',
})
export class AlignDirective {
    constructor(public el: ElementRef) {}
}

export interface SignatureOptions extends BaseOptions<any> {
    footer?: string;
    width?: string;
    height?: string;
    penColor?: string;
    backgroundColor?: string;
    minWidth?: string;
    maxWidth?: string;
    customClass?: string;
    placeholder?: string;
    hideLabel?: boolean;
}

export class SignatureComponent extends BaseComponent<SignatureOptions> {}
export class SignatureElement extends BaseElement<SignatureComponent> implements OnInit {
    @ViewChild(SignaturePad) signaturePad: SignaturePad;
    @ViewChild(AlignDirective) alignDirective: AlignDirective;

    public setWidth: number;
    public setHeight: number;
    public finalDim: any;
    public signaturePadOptions: Object = {
        'minWidth': 0.5,
        'canvasWidth': 500,
        'canvasHeight': 300,
        'backgroundColor': 'rgb(245,245,235)',
        'penColor': 'black'
    };

    public clearSignature() {
        this.signaturePad.clear();
    }

    drawComplete() {
        this.component.setValue(this.signaturePad.toDataURL());
    }

    public setDimension(temp: any, getDim: any) {
        if(getDim.slice(-1)== '%'){
            this.finalDim = temp * (parseFloat(getDim.slice(0, -1)) / 100);
            return this.finalDim;
        }
        else {
            this.finalDim = parseInt(getDim, 10);
            return this.finalDim;
        }
    }

    ngOnInit() {
        this.setWidth = this.alignDirective.el.nativeElement.clientWidth;
        this.setHeight = this.alignDirective.el.nativeElement.clientHeight;
        this.setWidth = this.setDimension(this.setWidth, this.component.settings.width);
        this.setHeight = this.setDimension(this.setHeight, this.component.settings.height);
        this.signaturePadOptions = {
            'minWidth': this.component.settings.minWidth,
            'canvasWidth':  this.setWidth,
            'canvasHeight': this.setHeight,
            'backgroundColor': this.component.settings.backgroundColor,
            'penColor': this.component.settings.penColor
        }
    }

    ngAfterViewInit() {
        this.signaturePad.clear();
        if (this.component.data[this.component.settings.key] != null) {
            this.signaturePad.fromDataURL(this.component.data[this.component.settings.key]);
        }
    }
}

export function SignatureField(template:FormioTemplate) {
    FormioComponents.register('signature', SignatureComponent, SignatureElement, template.components.signature);
    return SignatureElement;
}
