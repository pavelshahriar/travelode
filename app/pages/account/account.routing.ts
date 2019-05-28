import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular";

import { LoginComponent } from "~/pages/account/login/login.component";
import { SignupComponent } from "~/pages/account/signup/signup.component";
import { OnboardComponent } from "~/pages/account/onboard/onboard.component";
import { LogoutComponent } from "~/pages/account/logout/logout.component";

const routes: Routes = [
    { path: "", component: LoginComponent},
    { path: "login", component: LoginComponent},
    { path: "signup", component: SignupComponent},
    { path: "onboard", component: OnboardComponent},
    { path: "logout", component: LogoutComponent},

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AccountRouting { }