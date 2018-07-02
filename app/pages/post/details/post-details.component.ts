import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import { fromFile } from "tns-core-modules/image-source";
import * as appSettings from "tns-core-modules/application-settings";
import * as util from "util";
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
    private _canGoBack: boolean;
    private _editing: boolean = false;
    private _travelodeTitle: string;
    private _travelodeMedia: TravelodeMedia;
    private _localMedia: LocalMedia;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private nav: RouterExtensions,
        private mediaService: MediaService,
        private travelodeMediaService: TravelodeMediaService
    ) {}

    ngOnInit() {
        this.canGoBack = this.nav.canGoBack();
        this.travelodeTitle = appSettings.getString('travelodeTitle');
        console.log('Came here ==> ' + this.router.url);

        const entryPoint = (this.router.url).split('/')[2];
        console.log(entryPoint);

        if (entryPoint === "details") {
            this.route.queryParams.subscribe((params) => {
                if (params['path']) {
                    this.localMedia = new LocalMedia(params['path']);
                    // const imageFromLocalFile = fromFile(this.localMedia.url);
                    // console.log(imageFromLocalFile.height);
                }
            });
        } else if (entryPoint === 'edit') {
            this.editing = true;
            this.route.params.subscribe((params) => {
                if (params['id']) {
                    this.travelodeMediaService.getOneById(params['id'])
                        .subscribe(
                            (data) => {
                                console.log(util.inspect(data, false, null));
                                this.localMedia = new LocalMedia(data.media.url, data.title, data.caption);
                            }
                        );
                }
            })
        }
    }

    get canGoBack(): boolean {
        return this._canGoBack;
    }

    set canGoBack(value: boolean) {
        this._canGoBack = value;
    }

    get editing(): boolean {
        return this._editing;
    }

    set editing(value: boolean) {
        this._editing = value;
    }

    get travelodeTitle(): string {
        return this._travelodeTitle;
    }

    set travelodeTitle(value: string) {
        this._travelodeTitle = value;
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
        console.log('Nav button tapped !');
        // topmost().goBack();
        this.nav.back();
    }

    postTravelodeMedia() {
        console.log('Post media button tapped !');
        this.mediaService.create(this.localMedia.url).subscribe(
            (res) => {
                // console.log(util.inspect(res, false, null));
                if(res['status'] === 201) {
                    alert ('Media Created');

                    this.travelodeMedia = new TravelodeMedia();
                    this.travelodeMedia.mediaId = res['data']['id'];
                    this.travelodeMedia.travelodeId = appSettings.getNumber('travelodeId');
                    this.travelodeMedia.title = this.localMedia.title;
                    this.travelodeMedia.caption = this.localMedia.story;

                    this.travelodeMediaService.create(this.travelodeMedia).subscribe(
                        (data) => {
                            // console.log(util.inspect(data, false, null));
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
        this.router.navigate(['/travelode/list']);
    }
}