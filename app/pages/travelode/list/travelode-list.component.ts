import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import * as appSettings from "application-settings";
import * as util from "util";

import { Travelode } from "~/shared/models/travelode";
import { TravelodeService } from "~/shared/services/travelode.service";
import { TravelodeListUi } from "~/shared/interfaces/travelode-list-ui";
import { TravelodeListUiHelper } from "~/shared/helpers/travelode-list-ui-helper";
import { LoadingIndicatorHelper } from "~/shared/helpers/loading-indicator-helper";

@Component({
    selector: "TravelodeList",
    moduleId: module.id,
    templateUrl: "./travelode-list.component.html",
    styleUrls: ["./travelode-list.component.scss"]
})
export class TravelodeListComponent implements OnInit{

    private _travelodeList: TravelodeListUi;

    constructor(
        private router: Router,
        private nav: RouterExtensions,
        private travelodeService: TravelodeService,
        private travelodeListUiHelper: TravelodeListUiHelper) {
        this._travelodeList = {travelodesByYear: []};
    }

    ngOnInit() {
        if (!appSettings.getNumber('userId')){
            this.router.navigate(['/login'])
        }

        this.getTravelodesList();
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
                    // console.log(util.inspect(data, false, null))
                    this.travelodeList = this.travelodeListUiHelper.getTravelodeListUi(data);
                    LoadingIndicatorHelper.hideLoader();
                }
            );
    }

    itemTapped(item: Travelode) {
        console.log("Item Tapped: ");
        // console.log(util.inspect(item, false, null));
        this.router.navigate(["/travelode/details/" + item.id]);
    }

    createNewTapped() {
        this.router.navigate(["/travelode/create/"]);
    }
}