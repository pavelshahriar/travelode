import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: "PostSuccess",
    moduleId: module.id,
    templateUrl: "./post-success.component.html",
    styleUrls: ["./post-success.component.scss"]
})
export class PostSuccessComponent implements OnInit {
    private _travelodeId: number;
    private _travelodeTitle: string;
    private _travelodeMediaId: number;
    private _infoMessageHide: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit() {
        this.travelodeId = appSettings.getNumber('travelodeId');
        this.travelodeTitle = appSettings.getString('travelodeTitle');
        if (this.travelodeId && this.travelodeTitle) {
            this.infoMessageHide = (appSettings.getBoolean('postSuccessfulInfoHide'+this.travelodeId)) ?
                appSettings.getBoolean('postSuccessfulInfoHide'+this.travelodeId) : false;
            this.route.params.subscribe(params => {
                this.travelodeMediaId = params['id'];
                console.log('The travelode media id is : ' + this.travelodeMediaId);
            })
        } else {
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

    get travelodeMediaId(): number {
        return this._travelodeMediaId;
    }

    set travelodeMediaId(value: number) {
        this._travelodeMediaId = value;
    }

    get infoMessageHide(): boolean {
        return this._infoMessageHide;
    }

    set infoMessageHide(value: boolean) {
        this._infoMessageHide = value;
    }

    reviewPost() {
        console.log('Review button tapped !');
        this.router.navigate(['/post/review/'+this.travelodeMediaId])
    }

    postAgain() {
        console.log('Post again button tapped !');
        this.router.navigate(['/post/start'])
    }

    changeTravelode() {
        this.router.navigate(["/travelode/default"]);
    }

    hideInfoMessage() {
        console.log('info show/hide checked !');
        this.infoMessageHide = true;
        appSettings.setBoolean('postSuccessfulInfoHide'+this.travelodeId, this.infoMessageHide);

    }

}