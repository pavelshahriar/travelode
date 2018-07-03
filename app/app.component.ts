import {Component, OnInit} from "@angular/core";
import {LoadingIndicatorHelper} from "./shared/helpers/loading-indicator-helper";

declare var android: any;

@Component({
  selector: "my-app",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent implements OnInit{

    constructor() {
        new LoadingIndicatorHelper();
    }

    ngOnInit() {}
}
