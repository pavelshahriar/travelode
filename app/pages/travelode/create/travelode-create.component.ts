import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {topmost} from "ui/frame";
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
export class TravelodeCreateComponent implements OnInit{
    private _travelodeId: number = -1;
    private _travelode: Travelode;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private travelodeService: TravelodeService) {
            this._travelode = new Travelode();
    }

    get travelodeId(): number {
        return this._travelodeId;
    }

    set travelodeId(value: number) {
        this._travelodeId = value;
    }

    get travelode(): Travelode {
        return this._travelode;
    }

    set travelode(value: Travelode) {
        this._travelode = value;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.travelodeId = +params['id'];
                console.log('The travelode id is : ' + this.travelodeId);
                this.getTravelodeById();
            }
        })
    }

    getTravelodeById() {
        this.travelodeService.getOneByTravelodeId(this.travelodeId)
            .subscribe(
                (data) => {
                    this.travelode = data[0];
                    console.log(util.inspect(this.travelode, false, null));
                }
            );
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

    goBack() {
        console.log('Nav button tapped !')
        topmost().goBack();
    }
}