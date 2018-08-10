import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import * as util from "util";
import {TravelodeMediaService} from "../../../shared/services/travelode-media.service";
import {TravelodeMediaPojo} from "../../../shared/models/travelode-media-pojo";

@Component({
    selector: "my-app-post-review",
    moduleId: module.id,
    templateUrl: "./post-review.component.html",
    styleUrls: [
        "./post-review-common.scss",
        "./post-review.scss"
    ]
})
export class PostReviewComponent implements OnInit {
    private _canGoBack: boolean;
    private _travelodeMedia: TravelodeMediaPojo;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private nav: RouterExtensions,
        private travelodeMediaService: TravelodeMediaService
    ) {}

    ngOnInit() {
        this.canGoBack = this.nav.canGoBack();
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.travelodeMediaService.getOneById(params['id'])
                    .subscribe(
                        (data) => {
                            console.log(util.inspect(data, false, null));
                            this.travelodeMedia = data;
                        }
                    );
            }
        });
    }

    get canGoBack(): boolean {
        return this._canGoBack;
    }

    set canGoBack(value: boolean) {
        this._canGoBack = value;
    }

    get travelodeMedia(): TravelodeMediaPojo {
        return this._travelodeMedia;
    }

    set travelodeMedia(value: TravelodeMediaPojo) {
        this._travelodeMedia = value;
    }

    goBack() {
        console.log('Nav button tapped !');
        // topmost().goBack();
        this.nav.back();
    }

    edit() {
        console.log('Edit button tapped !');
        this.router.navigate(['/post/edit/' + this.travelodeMedia.id]);
    }

    ok() {
        console.log('Ok button tapped !');
        this.router.navigate(['/post/start'])
    }

    switchTravelode() {
        console.log('Switch travelode tapped !');
        this.router.navigate(['/travelode/list']);
    }
}
