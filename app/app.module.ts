import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";

import { AppRouting } from "./app.routing";
import { HelpersModule } from "./shared/helpers/helpers.module";
import { ServicesModule } from "./shared/services/services.module";

import { AppComponent } from "./app.component";
import { SliderMenuComponent } from "~/template/slider-menu/slider-menu.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        AppRouting,
        HelpersModule,
        ServicesModule
    ],
    declarations: [
        AppComponent,
        SliderMenuComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class AppModule { }
