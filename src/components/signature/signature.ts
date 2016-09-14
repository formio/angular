import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { SignaturePad } from 'angular2-signaturepad';
import {ViewChild, OnInit, ElementRef, Directive, Renderer} from '@angular/core';

@Directive({
    selector: '[styled]',
})
export class StyledDirective {
    constructor(public el: ElementRef) {

    }
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

export class SignatureComponent extends BaseComponent<SignatureOptions> {

}

export class SignatureElement extends BaseElement<SignatureComponent> implements OnInit{
    @ViewChild(SignaturePad) signaturePad: SignaturePad;
    @ViewChild(StyledDirective) styledDirective: StyledDirective;

    public imgUrl: string;
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

    public clearSignature(){
        this.signaturePad.clear();
    }

    doOnEnd() {
        this.imgUrl = this.signaturePad.toDataURL();
    }
 
    public setDimension(temp: any, getDim: any){
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
        //Used to generate image using base 64 url
        // this.signaturePad.fromDataURL("");
        this.setWidth = this.styledDirective.el.nativeElement.clientWidth;
        this.setHeight = this.styledDirective.el.nativeElement.clientHeight;
        this.setWidth = this.setDimension(this.setWidth, this.component.settings.width);
        this.setHeight = this.setDimension(this.setHeight, this.component.settings.height);
        this.signaturePadOptions = {
            'minWidth': this.component.settings.minWidth,
            'canvasWidth': this.setWidth,
            'canvasHeight': this.setHeight,
            'backgroundColor': this.component.settings.backgroundColor,
            'penColor': this.component.settings.penColor
        }
    }
}

export function Signature(template:FormioTemplate) {
    FormioComponents.register('signature', SignatureComponent, SignatureElement, {
        template: template.components.signature,
        directives: [SignaturePad, StyledDirective],
        styles: [".clearButton {position:absolute; left: 0; top: 0; z-index: 1000}", ".footer {text-align: center; color:#C3C3C3;}"]
    });
    return SignatureElement;
}
