import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormioComponent } from "./formio.component";
import { FormioBuilder } from "./builder.component";
import { FormioAppConfig } from "./formio.config";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FormioComponent,
        FormioBuilder
    ],
    exports: [
        FormioComponent,
        FormioBuilder
    ],
    providers: [
        FormioAppConfig
    ]
})
export class FormioEmbedModule {}