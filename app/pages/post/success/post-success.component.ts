import {Component, OnInit} from "@angular/core";
import * as util from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {topmost} from "tns-core-modules/ui/frame";

@Component({
    selector: "my-app-post-success",
    moduleId: module.id,
    templateUrl: "./post-success.component.html",
    styleUrls: [
        "./post-success-common.scss",
        "./post-success.scss"
    ]
})
export class PostSuccessComponent implements OnInit {
    private _travelodeMediaId: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit() {
        // this.travelodeMediaId = 30;
        this.route.params.subscribe(params => {
            this.travelodeMediaId = params['id'];
            console.log('The travelode media id is : ' + this.travelodeMediaId);
        })
    }

    get travelodeMediaId(): number {
        return this._travelodeMediaId;
    }

    set travelodeMediaId(value: number) {
        this._travelodeMediaId = value;
    }

    goBack() {
        console.log('Nav button tapped !')
        topmost().goBack();
    }

    reviewPost() {
        console.log('review button tapped !')

    }

    postAgain() {
        console.log('Post again button tapped !')
        this.router.navigate(['/post/start'])
    }

}