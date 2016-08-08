import { Input, OnInit } from '@angular/core';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';
import { InputComponent, InputOptions, InputElement } from '../input/input';


export interface TextAreaOptions extends InputOptions {
    rows?:number
}

export class TextAreaComponent extends InputComponent {

}

export class TextAreaElement extends InputElement implements OnInit {
    @Input() component: TextAreaComponent;
    ngOnInit() {
        this.render.emit(true);
    }
}

export function TextAreaField(template:FormioTemplate) {
    FormioComponents.register('textarea', TextAreaComponent, TextAreaElement, {
        template: template.components.textarea
    });
    return TextAreaElement;
};
