import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {topmost} from "ui/frame";
import * as util from "util";
import {TravelodeService} from "../../../shared/services/travelode.service";
import {Travelode} from "../../../shared/models/travelode";

@Component({
    selector: "my-app-travelode-created",
    moduleId: module.id,
    templateUrl: "./travelode-created.component.html",
    styleUrls: [
        "./travelode-created-common.scss",
        "./travelode-created.scss"
    ]
})
export class TravelodeCreatedComponent implements OnInit{
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
        console.log('Going to post details');
        this.router.navigate(["/post/entry"]);
    }

    changeTravelode() {
        this.router.navigate(["/travelode/edit/" + this.travelodeId]);
    }

    goBack() {
        console.log('Nav button tapped !')
        topmost().goBack();
    }
}