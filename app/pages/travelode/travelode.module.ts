import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular";

import { TravelodeRouting } from "~/pages/travelode/travelode.routing";
import {TravelodeActionBarComponent} from "~/template/travelode-action-bar/travelode-action-bar.component";
import { TravelodeListComponent } from "~/pages/travelode/list/travelode-list.component";
import { TravelodeCreateComponent } from "~/pages/travelode/create/travelode-create.component";
import { TravelodeCreatedComponent } from "~/pages/travelode/created/travelode-created.component";
import {TravelodeDetailsComponent} from "~/pages/travelode/details/travelode-details.component";
import {TravelodeDefaultComponent} from "~/pages/travelode/default/travelode-default.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        TravelodeRouting,
    ],
    declarations: [
        TravelodeActionBarComponent,
        TravelodeListComponent,
        TravelodeCreateComponent,
        TravelodeCreatedComponent,
        TravelodeDetailsComponent,
        TravelodeDefaultComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TravelodeModule { }