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
import { itemsProperty } from "tns-core-modules/ui/list-view/list-view";

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

    catList = [
        { 'name': 'see', 'selected': false },
        { 'name': 'eat', 'selected': false },
        { 'name': 'do', 'selected': false },
    ]

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
        if (this.localMedia.title && this.localMedia.story && this.anyCatSelected()) {
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
                                if (data.status === 201) {

                                    this._travelodeMediaCategory = new TravelodeMediaCategory();
                                    this._travelodeMediaCategory.travelodeId = appSettings.getNumber('travelodeId');
                                    this._travelodeMediaCategory.mediaId = res['data']['id'];

                                    this.catList.forEach((item, index) => {
                                        if (item.selected) {
                                            // This is now hardcoded
                                            // we could use a db query to search by name (item.name) and return the id
                                            this._travelodeMediaCategory.categoryId = index + 1;
                                            this.travelodeMediaCategoryService.create(this._travelodeMediaCategory).subscribe(
                                                (data) => {
                                                    if (data.status === 201) { }
                                                    else {
                                                        alert("Bullocks! Couldn't assign TravelodeMediaCategory");
                                                    }
                                                }
                                            );
                                        }

                                        if (index == this.catList.length - 1) {
                                            LoadingIndicatorHelper.hideLoader();
                                            if (data.status === 201) {
                                                alert('Travelode post created');
                                                this.router.navigate(['/post/success/' + data.body['id']])
                                            }
                                            else {
                                                alert('Bullocks !');
                                            }
                                        }
                                    });

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


    onTapCat(item) {
        if (item.selected) item.selected = false;
        else item.selected = true;
        console.log(item);

        this.catList.forEach((item, index) => {
            console.log(item, index);
        });
    }

    anyCatSelected() {
        for (let i of this.catList) {
            if (i.selected == true) return true;
        }
    }

}