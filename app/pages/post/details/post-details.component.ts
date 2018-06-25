import { Component, OnInit } from "@angular/core";
import { topmost } from "ui/frame";
import { ActivatedRoute, Router } from "@angular/router";
import { fromFile } from "tns-core-modules/image-source";
import * as appSettings from "tns-core-modules/application-settings";
import * as util from "util";

import { Media } from "../../../shared/models/media";
import { LocalMedia } from "../../../shared/models/local-media";
import { MediaService } from "../../../shared/services/media.service";
import { TravelodeMediaService } from "../../../shared/services/travelode-media.service";
import { TravelodeMedia} from "../../../shared/models/travelode-media";


@Component({
    selector: "my-app-post-details",
    moduleId: module.id,
    templateUrl: "./post-details.component.html",
    styleUrls: [
        "./post-details-common.scss",
        "./post-details.scss"
    ]
})
export class PostDetailsComponent implements OnInit {
    private _postMedia: Media;
    private _travelodeMedia: TravelodeMedia;
    private _localMedia: LocalMedia;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private mediaService: MediaService,
        private travelodeMediaService: TravelodeMediaService
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.localMedia = new LocalMedia(params['path']);
            const imageFromLocalFile = fromFile(this.localMedia.url);
            console.log(imageFromLocalFile.height);
        })
    }

    get postMedia(): Media {
        return this._postMedia;
    }

    set postMedia(value: Media) {
        this._postMedia = value;
    }

    get travelodeMedia(): TravelodeMedia {
        return this._travelodeMedia;
    }

    set travelodeMedia(value: TravelodeMedia) {
        this._travelodeMedia = value;
    }

    get localMedia(): LocalMedia {
        return this._localMedia;
    }

    set localMedia(value) {
        this._localMedia = value;
    }

    goBack() {
        console.log('Nav button tapped !')
        topmost().goBack();
    }

    postTravelodeMedia() {
        console.log('Post media button tapped !');
        this.mediaService.create(this.localMedia.url).subscribe(
            (res) => {
                console.log(util.inspect(res, false, null));
                if(res['status'] === 201) {
                    alert ('Media Created');

                    this.travelodeMedia = new TravelodeMedia();
                    this.travelodeMedia.mediaId = res['data']['id'];
                    this.travelodeMedia.travelodeId = appSettings.getNumber('travelodeId');
                    this.travelodeMedia.title = this.localMedia.title;
                    this.travelodeMedia.caption = this.localMedia.story;

                    this.travelodeMediaService.create(this.travelodeMedia).subscribe(
                        (data) => {
                            console.log(util.inspect(data, false, null));
                            if (data.status === 201) {
                                alert ('Travelode Media Created');
                                this.router.navigate(['/post/success/'+ data.body['id']])
                            } else {
                                alert ('Bullocks !');
                            }
                        }
                    );

                } else {
                    alert('Bullocks !');
                }

            }
        );
    }

    switchTravelode() {
        console.log('Switch travelode tapped !')
    }
}