import { Component, Input, OnInit } from '@angular/core';
import { FormioAlert } from './formio.common';

@Component({
    selector: 'formio-alerts',
    template: '<div></div>'
})
export class FormioAlerts implements OnInit {
    @Input() alerts: Array<FormioAlert> = [];
    ngOnInit() {}
}
