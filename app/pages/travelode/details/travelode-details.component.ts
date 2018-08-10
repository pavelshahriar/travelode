import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import * as appSettings from "tns-core-modules/application-settings";
import * as util from "util";

import {TravelodeService} from "../../../shared/services/travelode.service";
import {LoadingIndicatorHelper} from "../../../shared/helpers/loading-indicator-helper";
import {TravelodeMediaService} from "../../../shared/services/travelode-media.service";
import {TravelodeDetailsUi} from "../../../shared/interfaces/travelode-details-ui";
import {TravelodeDetailsUiHelper} from "../../../shared/helpers/travelode-details-ui-helper";


@Component({
    selector: "my-app-travelode-details",
    moduleId: module.id,
    templateUrl: "./travelode-details.component.html",
    styleUrls: [
        "./travelode-details.scss",
        "./travelode-details-common.scss"
    ]
})

export class TravelodeDetailsComponent implements OnInit{
    private _canGoBack: boolean;
    private _emptyTravelode: boolean = true;
    private _travelodeDetailsUI: TravelodeDetailsUi= {travelodeId: -1, travelodeTitle: '', travelodeDays: []};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private nav: RouterExtensions,
        private travelodeService: TravelodeService,
        private travelodeMediaService: TravelodeMediaService,
        private travelodeDetailsUiHelper: TravelodeDetailsUiHelper
    ) {}

    ngOnInit() {
        this.canGoBack = this.nav.canGoBack();
        LoadingIndicatorHelper.showLoader();
        this.route.params.subscribe(params => {
            if (params['id']) {
                let travelodeId = params['id'];
                this.travelodeService.getOneByTravelodeId(params['id'])
                    .subscribe(
                        travelode => {
                            if (!travelode) {
                                LoadingIndicatorHelper.hideLoader();
                                alert('Something is wrong. Surprisingly, we couldnt find that travelode, lets try again!');
                                this.router.navigate(['/travelode/list']);
                            } else {
                                console.log(util.inspect(travelode, false, null));
                                this.travelodeDetailsUI.travelodeId = travelode.id;
                                this.travelodeDetailsUI.travelodeTitle = travelode.title;

                                this.travelodeMediaService.getAllMediaByTravelodeId(travelodeId)
                                    .subscribe(travelodeUi => {
                                        LoadingIndicatorHelper.hideLoader();
                                        if (travelodeUi.length > 0) {
                                            this.emptyTravelode = false;
                                            this.travelodeDetailsUI = this.travelodeDetailsUiHelper.getTravelodeDetailsUi(travelode, travelodeUi);
                                            // console.log(util.inspect(this.travelodeDetailsUI, false, null));
                                        }
                                    });
                            }
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

    get emptyTravelode(): boolean {
        return this._emptyTravelode;
    }

    set emptyTravelode(value: boolean) {
        this._emptyTravelode = value;
    }

    get travelodeDetailsUI(): TravelodeDetailsUi {
        return this._travelodeDetailsUI;
    }

    set travelodeDetailsUI(value: TravelodeDetailsUi) {
        this._travelodeDetailsUI = value;
    }

    goBack() {
        console.log('Nav button tapped!');
        // topmost().goBack();
        this.nav.back();
    }

    startPosting() {
        console.log('Start post tapped!');
        // console.log(util.inspect(this.travelodeDetailsUI, null, false));
        appSettings.setNumber('travelodeId', this.travelodeDetailsUI.travelodeId);
        appSettings.setString('travelodeTitle', this.travelodeDetailsUI.travelodeTitle);

        this.router.navigate(['/post/start']);
    }
}