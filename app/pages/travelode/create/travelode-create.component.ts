import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import * as appSettings from "application-settings";
import * as util from "util";

import {LoadingIndicatorHelper} from "~/shared/helpers/loading-indicator-helper";
import {Travelode} from "~/shared/models/travelode";
import {TravelodeService} from "~/shared/services/travelode.service";

@Component({
    selector: "TravelodeCreate",
    moduleId: module.id,
    templateUrl: "./travelode-create.component.html",
    styleUrls: ["./travelode-create.component.scss"]
})
export class TravelodeCreateComponent implements OnInit {
    // private _canGoBack: boolean;
    private _editing: boolean = false;
    private _travelodeId: number = -1;
    private _travelode: Travelode;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private nav: RouterExtensions,
        private travelodeService: TravelodeService) {
            this._travelode = new Travelode();
    }

    ngOnInit() {
        // this.canGoBack = this.nav.canGoBack();
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.editing = true;
                this.travelodeId = +params['id'];
                console.log('The travelode id is : ' + this.travelodeId);
                LoadingIndicatorHelper.showLoader();
                this.travelodeService.getOneByTravelodeId(this.travelodeId)
                    .subscribe(
                        (data) => {
                            this.travelode = data;
                            LoadingIndicatorHelper.hideLoader();
                            // console.log(util.inspect(this.travelode, false, null));
                        }
                    );
            }
        })
    }

    // get canGoBack(): boolean {
    //     return this._canGoBack;
    // }
    //
    // set canGoBack(value: boolean) {
    //     this._canGoBack = value;
    // }

    get editing(): boolean {
        return this._editing;
    }

    set editing(value: boolean) {
        this._editing = value;
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

    createTravelode() {
        if (this.travelode.title) {
            this.travelode.userId = appSettings.getNumber('userId');

            LoadingIndicatorHelper.showLoader();
            if(this.editing) {
                this.travelode.id = this.travelodeId;
                this.travelodeService.update(this.travelode)
                    .subscribe((data) => {
                        LoadingIndicatorHelper.hideLoader();
                        if (data.status === 200) {
                            alert ('Travelode Updated');
                            this.router.navigate(["/travelode/updated/" + this.travelodeId]);
                        }
                    }
                );
            } else {
                this.travelodeService.create(this.travelode)
                    .subscribe((data) => {
                        // console.log(util.inspect(data, false, null));
                        LoadingIndicatorHelper.hideLoader();
                        if(data.status === 201) {
                            alert ('Travelode Created');
                            this.router.navigate(["/travelode/created/" + data.body['id']]);
                        } else {
                            alert('Bullocks !');
                        }
                    });
            }
        } else {
            alert("Whats a Travelode without a title? Tell me!")
        }
    }

    // goBack() {
    //     console.log('Nav button tapped !');
    //     // topmost().goBack();
    //     this.nav.back();
    // }

}