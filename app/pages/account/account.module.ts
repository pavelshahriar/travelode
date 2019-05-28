import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular";

import { AccountRouting } from "~/pages/account/account.routing";
import { LoginComponent } from "~/pages/account/login/login.component";
import { SignupComponent } from "~/pages/account/signup/signup.component";
import { OnboardComponent } from "~/pages/account/onboard/onboard.component";
import { LogoutComponent } from "~/pages/account/logout/logout.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        AccountRouting
    ],
    declarations: [
        LoginComponent,
        SignupComponent,
        OnboardComponent,
        LogoutComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AccountModule { }