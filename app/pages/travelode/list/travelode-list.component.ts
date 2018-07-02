import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import * as util from "util";
import {Travelode} from "../../../shared/models/travelode";
import {TravelodeService} from "../../../shared/services/travelode.service";
import * as appSettings from "application-settings";

@Component({
    selector: "my-app-travelode-list",
    moduleId: module.id,
    templateUrl: "./travelode-list.component.html",
    styleUrls: [
        "./travelode-list-common.scss",
        "./travelode-list.scss"
    ]
})
export class TravelodeListComponent implements OnInit{
    private _travelodeList: Array<Travelode>;

    constructor(
        private router: Router,
        private travelodeService: TravelodeService) {

        this._travelodeList = [];
        this.getTravelodesList();
    }

    ngOnInit() {
        if (!appSettings.getNumber('userId')){
            this.router.navigate(['/login'])
        }
    }

    get travelodeList(): Array<Travelode> {
        return this._travelodeList;
    }

    set travelodeList(value: Array<Travelode>) {
        this._travelodeList = value;
    }

    getTravelodesList () {
        this.travelodeService.getAllByUserId(appSettings.getNumber('userId'))
            .subscribe(
                (data: Array<Travelode>) => {
                    this.travelodeList = data;
                    // console.log(util.inspect(this.travelodeList, false, null));
                }
            );
    }

    public itemTapped(item) {
        console.log("Item Tapped: ");
        // console.log(util.inspect(item, false, null));
        this.router.navigate(["/post/start/"]);
        appSettings.setNumber('travelodeId', item.id);
        appSettings.setString('travelodeTitle', item.title);
    }

    public createNewTapped() {
        this.router.navigate(["/travelode/create/"]);
    }
}