import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import * as appSettings from "application-settings";
import * as util from "util";

import { Travelode } from "~/shared/models/travelode";
import { TravelodeService } from "~/shared/services/travelode.service";
import { TravelodeListUi } from "~/shared/interfaces/travelode-list-ui";
import { TravelodeListUiHelper } from "~/shared/helpers/travelode-list-ui-helper";
import { LoadingIndicatorHelper } from "~/shared/helpers/loading-indicator-helper";
import {Page} from "tns-core-modules/ui/page";


@Component({
    selector: "my-app-switch-list",
    moduleId: module.id,
    templateUrl: "./travelode-switch.component.html",
    styleUrls: [
        "./travelode-switch.scss",
        "./travelode-switch-common.scss"
    ]
})
export class TravelodeSwitchComponent implements OnInit{
    private _canGoBack: boolean;
    private _travelodeList: TravelodeListUi;
    private _isSetting: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private nav: RouterExtensions,
        private page: Page,
        private travelodeService: TravelodeService,
        private travelodeListUiHelper: TravelodeListUiHelper
    ) {
        this._travelodeList = {travelodesByYear: []};
    }

    ngOnInit() {
        this.canGoBack = this.nav.canGoBack();
        if (!appSettings.getNumber('userId')){
            this.router.navigate(['/login'])
        }

        this.route.queryParams.subscribe(params => {
            if (params['set'] && (params['set']=='true')) {
                this.isSetting = true;
                this.page.actionBarHidden = true;
            }
            this.getTravelodesList();
        })
    }

    get isSetting(): boolean {
        return this._isSetting;
    }

    set isSetting(value: boolean) {
        this._isSetting = value;
    }

    get canGoBack(): boolean {
        return this._canGoBack;
    }

    set canGoBack(value: boolean) {
        this._canGoBack = value;
    }

    get travelodeList(): TravelodeListUi {
        return this._travelodeList;
    }

    set travelodeList(value: TravelodeListUi) {
        this._travelodeList = value;
    }

    getTravelodesList () {
        LoadingIndicatorHelper.showLoader();
        this.travelodeService.getAllByUserId(appSettings.getNumber('userId'))
            .subscribe(
                (data: Array<Travelode>) => {
                    this.travelodeList = this.travelodeListUiHelper.getTravelodeListUi(data);
                    // console.log(util.inspect(this.travelodeList, false, null));
                    LoadingIndicatorHelper.hideLoader();
                }
            );
    }

    isSelected(travelodeId: number) {
        return (appSettings.getNumber('travelodeId') === travelodeId);
    }

    itemTapped(item: Travelode) {
        console.log("Item Tapped: ");
        // console.log(util.inspect(item, false, null));
        appSettings.setNumber('travelodeId', item.id);
        appSettings.setString('travelodeTitle', item.title);
        this.router.navigate(["/post/start/"]);
    }

    createNewTapped() {
        this.router.navigate(["/travelode/create/"]);
    }
}