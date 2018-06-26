import { Component, OnInit } from "@angular/core";
import { topmost } from "ui/frame";
import { ActivatedRoute, Router } from "@angular/router";
import * as appSettings from "tns-core-modules/application-settings";
import * as util from "util";

@Component({
    selector: "my-app-post-start",
    moduleId: module.id,
    templateUrl: "./post-start.component.html",
    styleUrls: [
        "./post-start-common.scss",
        "./post-start.scss"
    ]
})
export class PostStartComponent implements OnInit {
    private _travelodeId: number;
    private _travelodeTitle: string;

    constructor(private router: Router) {}

    ngOnInit() {
        this.travelodeId = appSettings.getNumber('travelodeId');
        this.travelodeTitle = appSettings.getString('travelodeTitle');

        if (typeof this.travelodeId == "undefined"){
            this.router.navigate(['/travelode/list'])
        }
    }

    get travelodeId(): number {
        return this._travelodeId;
    }

    set travelodeId(value: number) {
        this._travelodeId = value;
    }

    get travelodeTitle(): string {
        return this._travelodeTitle;
    }

    set travelodeTitle(value: string) {
        this._travelodeTitle = value;
    }
    goBack() {
        console.log('Nav button tapped !');
        topmost().goBack();
    }

    switchTravelode() {
        console.log('Switch travelode tapped !');
        this.router.navigate(['/travelode/list']);
    }

    cameraSelected() {
        console.log('Camera icon tapped !');
        this.router.navigate(['/post/entry/camera']);
    }

    gallerySelected() {
        console.log('Gallery icon tapped !');
    }
}