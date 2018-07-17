import {Component, OnInit} from "@angular/core";
import {LoadingIndicatorHelper} from "./shared/helpers/loading-indicator-helper";
import {DrawerTransitionBase, SlideInOnTopTransition} from "nativescript-ui-sidedrawer";

declare var android: any;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit{
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor() {
        new LoadingIndicatorHelper();
    }

    ngOnInit(): void {
        this.sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    set sideDrawerTransition(value: DrawerTransitionBase) {
        this._sideDrawerTransition = value;
    }
}
