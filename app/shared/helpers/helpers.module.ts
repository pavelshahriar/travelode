import { NgModule } from "@angular/core";

import { LoadingIndicatorHelper } from "./loading-indicator-helper";
import { TravelodeListUiHelper } from "./travelode-list-ui-helper";
import { TravelodeDetailsUiHelper } from "./travelode-details-ui-helper";
import {RequestHelper} from "./request-helper";

@NgModule({
    providers: [
        LoadingIndicatorHelper,
        TravelodeListUiHelper,
        TravelodeDetailsUiHelper,
        RequestHelper
    ]
})

export class HelpersModule {}