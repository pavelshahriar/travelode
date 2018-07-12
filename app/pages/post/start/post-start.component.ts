import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import * as camera from "nativescript-camera";
import * as appSettings from "tns-core-modules/application-settings";

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
    private _canGoBack: boolean;
    private _travelodeId: number;
    private _travelodeTitle: string;

    constructor(
        private router: Router,
        private nav: RouterExtensions
    ) {}

    ngOnInit() {
        this.canGoBack = this.nav.canGoBack();
        if (!appSettings.getNumber('travelodeId')){
            this.router.navigate(['/travelode/list'])
        } else {
            this.travelodeId = appSettings.getNumber('travelodeId');
            this.travelodeTitle = appSettings.getString('travelodeTitle');
        }
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

    get travelodeTitle(): string {
        return this._travelodeTitle;
    }

    set travelodeTitle(value: string) {
        this._travelodeTitle = value;
    }

    goBack() {
        console.log('Nav button tapped !');
        // topmost().goBack();
        this.nav.back();
    }

    switchTravelode() {
        console.log('Switch travelode tapped !');
        this.router.navigate(['/travelode/switch']);
    }

    cameraSelected() {
        console.log('Camera icon tapped !');
        if(!camera.isAvailable()) {
            alert('Dude change your phone, it doesnt have any camera!');
        } else {
            camera.requestPermissions()
                .then(() => {
                    this.router.navigate(['/post/entry/camera']);
                })
                .catch(() => {
                    alert('Ummh, how do you plan on taking photo without giving access?')
                });
        }
    }

    gallerySelected() {
        console.log('Gallery icon tapped !');
    }
}