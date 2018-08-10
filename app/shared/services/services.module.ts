import { NgModule } from "@angular/core";

import { UserService } from "./user.service";
import { TravelodeService } from "./travelode.service";
import { MediaService } from "./media.service";
import { TravelodeMediaService } from "./travelode-media.service";

@NgModule({
    providers: [
        UserService,
        TravelodeService,
        MediaService,
        TravelodeMediaService
    ]
})

export class ServicesModule {}