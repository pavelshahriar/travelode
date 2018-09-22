import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { fromFile } from "tns-core-modules/image-source";
import * as appSettings from "tns-core-modules/application-settings";
import * as util from "util";

import { LoadingIndicatorHelper } from "../../../shared/helpers/loading-indicator-helper";
import { LocalMedia } from "../../../shared/models/local-media";
import { MediaService } from "../../../shared/services/media.service";
import { TravelodeMediaService } from "../../../shared/services/travelode-media.service";
import { TravelodeMedia } from "../../../shared/models/travelode-media";
import { TravelodeMediaCategory } from "../../../shared/models/travelode-media-category";
import { TravelodeMediaCategoryService } from "../../../shared/services/travelode-media-category.service";
import { CheckType } from "@angular/core/src/view";

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
    private _travelodeMediaCategory: TravelodeMediaCategory;
    private _localMedia: LocalMedia;
    private catDoSelected: boolean = false;
    private catEatSelected: boolean = false;
    private catSeeSelected: boolean = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private mediaService: MediaService,
        private travelodeMediaService: TravelodeMediaService,
        private travelodeMediaCategoryService: TravelodeMediaCategoryService
    ) { }

    ngOnInit() {
        this.travelodeTitle = appSettings.getString('travelodeTitle');

        const entryPoint = (this.router.url).split('/')[2];
        console.log(entryPoint);

        if (entryPoint === "details") {
            LoadingIndicatorHelper.showLoader();
            this.route.queryParams.subscribe((params) => {
                if (params['path']) {
                    this.localMedia = new LocalMedia(params['path']);
                    LoadingIndicatorHelper.hideLoader();
                    const imageFromLocalFile = fromFile(this.localMedia.url);
                    console.log(imageFromLocalFile.height);
                }
            });
        } else if (entryPoint === 'edit') {
            this.editing = true;
            LoadingIndicatorHelper.showLoader();
            this.route.params.subscribe((params) => {
                if (params['id']) {
                    this.travelodeMediaService.getOneById(params['id'])
                        .subscribe(
                            (data) => {
                                console.log(util.inspect(data, false, null));
                                this.localMedia = new LocalMedia(data.media.url, data.title, data.caption);
                                LoadingIndicatorHelper.hideLoader();
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

    get travelodeMediaCategory(): TravelodeMediaCategory {
        return this._travelodeMediaCategory;
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

    postTravelodeMedia() {
        console.log('Post media button tapped !');
        if (this.localMedia.title && this.localMedia.story && (this.catSeeSelected || this.catDoSelected || this.catEatSelected)) {
            LoadingIndicatorHelper.showLoader();
            this.mediaService.create(this.localMedia.url).subscribe(
                (res) => {
                    // console.log(util.inspect(res, false, null));
                    if (res['status'] === 201) {
                        // alert ('Media Created');

                        this.travelodeMedia = new TravelodeMedia();
                        this.travelodeMedia.mediaId = res['data']['id'];
                        this.travelodeMedia.travelodeId = appSettings.getNumber('travelodeId');
                        this.travelodeMedia.title = this.localMedia.title;
                        this.travelodeMedia.caption = this.localMedia.story;

                        this.travelodeMediaService.create(this.travelodeMedia).subscribe(
                            (data) => {
                                // console.log(util.inspect(data, false, null));
                                LoadingIndicatorHelper.hideLoader();
                                if (data.status === 201) {

                                    this._travelodeMediaCategory = new TravelodeMediaCategory();
                                    this._travelodeMediaCategory.travelodeId = appSettings.getNumber('travelodeId');
                                    this._travelodeMediaCategory.mediaId = res['data']['id'];

                                    // TODO maybe make an array
                                    if (this.catSeeSelected) {
                                        this._travelodeMediaCategory.categoryId = 1;
                                    } else if (this.catEatSelected) {
                                        this._travelodeMediaCategory.categoryId = 2;
                                    } else if (this.catDoSelected) {
                                        this._travelodeMediaCategory.categoryId = 3;
                                    }
                                    // TODO add support for multi category selection
                                    this.travelodeMediaCategoryService.create(this._travelodeMediaCategory).subscribe(
                                        (data) => {
                                            LoadingIndicatorHelper.hideLoader();
                                            if (data.status === 201) {
                                                alert('Travelode post created');
                                                this.router.navigate(['/post/success/' + data.body['id']])

                                            }
                                            else {
                                                alert('Bullocks !');
                                            }
                                        }
                                    )


                                } else {
                                    alert('Bullocks !');
                                }
                            }
                        );

                    } else {
                        LoadingIndicatorHelper.hideLoader();
                        alert('Bullocks !');
                    }

                }
            );
        } else {
            alert('We need the title, caption and minimum one category to save it. Lets put some info there. Ok ?')
        }
    }

    cancel() {
        this.router.navigate(['/post/start/'])
    }

    switchTravelode() {
        console.log('Switch travelode tapped !')
        this.router.navigate(['/travelode/list']);
    }

    onTapCatDo() {
        if (this.catDoSelected) this.catDoSelected = false;
        else this.catDoSelected = true;
        console.log("Do was tapped, checkYes = ", this.catDoSelected);
    }

    onTapCatEat() {
        if (this.catEatSelected) this.catEatSelected = false;
        else this.catEatSelected = true;

        console.log("Eat was tapped, checkYes = ", this.catEatSelected);
    }

    onTapCatSee() {
        if (this.catSeeSelected) this.catSeeSelected = false;
        else this.catSeeSelected = true;

        console.log("See was tapped, checkYes = ", this.catSeeSelected);
    }

    convertCatToID(catName) {
        if (catName = 'see') return 1;
        else if (catName = 'eat') return 2;
        else if (catName = 'do ') return 3;
        else return null;
    }
}