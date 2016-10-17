import { OnInit } from '@angular/core';
import { FormioError, ErrorsOptions } from './formio.common';
export declare class FormioErrors implements OnInit {
    errors: Array<FormioError>;
    options: ErrorsOptions;
    ngOnInit(): void;
}
