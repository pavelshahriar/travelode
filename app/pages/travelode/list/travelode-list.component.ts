import {Component} from "@angular/core";
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
export class TravelodeListComponent {
    private _travelodeList: Array<Travelode>;

    constructor(
        private router: Router,
        private travelodeService: TravelodeService) {

        this._travelodeList = [];
        this.getTravelodesList();

        // this._travelodeList = [
        //     { "id": 1, "title": 'Nepal Trip 2018', "description": 'Awesome Trip', "userId": 1, "created": '2018-04-22T06:25:33.000Z', "updated": '2018-04-22T08:17:55.000Z', "coverId": null },
        //     { "id": 2, "title": 'USA TRip 2012', "description": 'Blabla boa', "userId": 1, "created": '2018-04-23T06:26:37.000Z', "updated": null, "coverId": null },
        //     { "id": 3, "title": 'EU Trip 2012', "description": 'Nothing to say !', "userId": 1, "created": '2018-04-23T06:28:53.000Z', "updated": null, "coverId": null },
        //     { "id": 4, "title": 'Some trip', "description": 'Fadsasd', "userId": 1, "created": '2018-04-23T06:36:02.000Z', "updated": null, "coverId": null }
        // ];
    }

    get travelodeList(): Array<Travelode> {
        return this._travelodeList;
    }

    set travelodeList(value: Array<Travelode>) {
        this._travelodeList = value;
    }

    getTravelodesList () {
        this.travelodeService.getAllById(appSettings.getNumber('userId'))
            .subscribe(
                (data) => {
                    this.travelodeList = data.json();
                    console.log(util.inspect(this.travelodeList, false, null));
                }
            );
    }

    public onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
    }
}