import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import * as util from "util";
import {TravelodeService} from "~/shared/services/travelode.service";
import {Travelode} from "~/shared/models/travelode";

@Component({
    selector: "TravelodeCreated",
    moduleId: module.id,
    templateUrl: "./travelode-created.component.html",
    styleUrls: ["./travelode-created.component.scss"]
})
export class TravelodeCreatedComponent implements OnInit {
    private _canGoBack: boolean;
    private _travelodeId: number;
    private _travelode : Travelode;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private nav: RouterExtensions,
        private travelodeService: TravelodeService) {}

    ngOnInit() {
        this.canGoBack = this.nav.canGoBack();
        this.route.params.subscribe(params => {
            this.travelodeId = +params['id'];
            // console.log('The travelode id is : ' + this.travelodeId);
            this.getTravelodeById();
        })
    }

    get canGoBack(): boolean {
        return this._canGoBack;
    }

    set canGoBack(value: boolean) {
        this._canGoBack = value;
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

    getTravelodeById () {
        this.travelodeService.getOneByTravelodeId(this.travelodeId)
            .subscribe(
                (data: Travelode) => {
                    // console.log(util.inspect(data, false, null));
                    this.travelode = data;
                    // console.log(this.travelode)
                }
            );
    }

    startPosting() {
        console.log('Going to post start');
        this.router.navigate(["/post/start/"]);
    }

    changeTravelode() {
        this.router.navigate(["/travelode/edit/" + this.travelodeId]);
    }

    goBack() {
        console.log('Nav button tapped !')
        // topmost().goBack();
        this.nav.back();
    }
}