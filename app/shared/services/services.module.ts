import { NgModule } from "@angular/core";

import { UserService } from "../../shared/services/user.service";
import { TravelodeService } from "../../shared/services/travelode.service";
import { MediaService } from "../../shared/services/media.service";
import { TravelodeMediaService } from "../../shared/services/travelode-media.service";

@NgModule({
    providers: [
        UserService,
        TravelodeService,
        MediaService,
        TravelodeMediaService
    ]
})

export class ServicesModule {}