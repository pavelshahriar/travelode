import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {topmost} from "ui/frame";
import * as util from "util";
import * as appSettings from "tns-core-modules/application-settings";
import {TravelodeService} from "../../../shared/services/travelode.service";
import {Travelode} from "../../../shared/models/travelode";

@Component({
    selector: "my-app-post-start",
    moduleId: module.id,
    templateUrl: "./post-start.component.html",
    styleUrls: [
        "./post-start-common.scss",
        "./post-start.scss"
    ]
})
export class PostStartComponent implements OnInit{
    private _travelodeId: number;
    private _travelode : Travelode;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private travelodeService: TravelodeService) {}

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
            this.travelodeId = +params['id'];
            console.log('The travelode id is : ' + this.travelodeId);
            this.getTravelodeById();
        })
    }

    getTravelodeById () {
        this.travelodeService.getOneByTravelodeId(this.travelodeId)
            .subscribe(
                (data: Travelode) => {
                    console.log(util.inspect(data, false, null));
                    this.travelode = data[0];
                }
            );
    }

    startPosting() {
        console.log('Posting button tapped !');
    }

    changeTravelode() {
        this.router.navigate(["/travelode/edit/" + this.travelodeId]);
    }


    goBack() {
        console.log('Nav button tapped !')
        topmost().goBack();
    }
}