import { NgModule } from "@angular/core";

import { LoadingIndicatorHelper } from "../../shared/helpers/loading-indicator-helper";
import { TravelodeListUiHelper } from "../../shared/helpers/travelode-list-ui-helper";
import { TravelodeDetailsUiHelper } from "~/shared/helpers/travelode-details-ui-helper";

@NgModule({
    providers: [
        LoadingIndicatorHelper,
        TravelodeListUiHelper,
        TravelodeDetailsUiHelper
    ]
})

export class HelpersModule {}