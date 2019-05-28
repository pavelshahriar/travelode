import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular";

import {TravelodeListComponent} from "~/pages/travelode/list/travelode-list.component";
import {TravelodeCreateComponent} from "~/pages/travelode/create/travelode-create.component";
import { TravelodeCreatedComponent } from "~/pages/travelode/created/travelode-created.component";
import {TravelodeDetailsComponent} from "~/pages/travelode/details/travelode-details.component";
import {TravelodeDefaultComponent} from "~/pages/travelode/default/travelode-default.component";

const routes: Routes = [
    { path: "", component: TravelodeListComponent },
    { path: "list", component: TravelodeListComponent },
    { path: "create", component: TravelodeCreateComponent },
    { path: "edit/:id", component: TravelodeCreateComponent },
    { path: "created/:id", component: TravelodeCreatedComponent },
    { path: "updated/:id", component: TravelodeCreatedComponent },
    { path: "details/:id", component: TravelodeDetailsComponent },
    { path: "default", component: TravelodeDefaultComponent}

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TravelodeRouting { }