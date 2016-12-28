/// <reference types="chai" />
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioTemplate } from '../../formio.template';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { OnInit, ElementRef } from '@angular/core';
export declare class AlignDirective {
    el: ElementRef;
    constructor(el: ElementRef);
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
export declare class SignatureComponent extends BaseComponent<SignatureOptions> {
}
export declare class SignatureElement extends BaseElement<SignatureComponent> implements OnInit {
    signaturePad: SignaturePad;
    alignDirective: AlignDirective;
    setWidth: number;
    setHeight: number;
    finalDim: any;
    signaturePadOptions: Object;
    clearSignature(): void;
    drawComplete(): void;
    setDimension(temp: any, getDim: any): any;
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
export declare function SignatureField(template: FormioTemplate): typeof SignatureElement;
