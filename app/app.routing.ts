import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

export const routes: Routes = [
    { path: "", redirectTo: "/account", pathMatch: "full"},
    { path: "account", loadChildren: "./pages/account/account.module#AccountModule"},
    { path: "travelode", loadChildren: "./pages/travelode/travelode.module#TravelodeModule"},
    { path: "post", loadChildren: "./pages/post/post.module#PostModule"},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRouting { }