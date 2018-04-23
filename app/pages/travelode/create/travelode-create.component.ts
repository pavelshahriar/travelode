import {Component} from "@angular/core";
import {Router} from "@angular/router";
import * as util from "util";
import {Travelode} from "../../../shared/models/travelode";
import {TravelodeService} from "../../../shared/services/travelode.service";
import * as appSettings from "application-settings";

@Component({
    selector: "my-app-travelode-create",
    moduleId: module.id,
    templateUrl: "./travelode-create.component.html",
    styleUrls: [
        "./travelode-create-common.scss",
        "./travelode-create.scss"
    ]
})
export class TravelodeCreateComponent {
    private _travelode: Travelode;

    constructor(
        private router: Router,
        private travelodeService: TravelodeService) {
            this._travelode = new Travelode();
    }

    get travelode(): Travelode {
        return this._travelode;
    }

    set travelode(value: Travelode) {
        this._travelode = value;
    }

    createTravelode() {
        if (this.travelode.title) {
            this.travelode.userId = appSettings.getNumber('userId');
            this.travelodeService.create(this.travelode)
                .subscribe(
                    (data) => {
                        console.log(util.inspect(data, false, null));
                        if(data.status === 200) {
                            alert ('Travelode Created');
                            this.router.navigate(["/travelode/list"]);
                        } else {
                            alert('Bullocks !');
                        }
                    }
                );
        } else {
            alert("Whats a Travelode without a title? Tell me!")
        }
    }
}