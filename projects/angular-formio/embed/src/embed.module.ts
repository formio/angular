import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormioComponent } from "./formio.component";
import { FormioBuilder } from "./builder.component";
import { FormioAppService } from "./app.service";

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
        FormioAppService
    ]
})
export class FormioEmbedModule {}