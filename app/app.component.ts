import {Component, OnInit} from "@angular/core";
import * as Permissions from "nativescript-permissions";

declare var android: any;

@Component({
  selector: "my-app",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent implements OnInit{

    constructor() {}

    ngOnInit() {
        this.getCameraPermission();
    }

    public getCameraPermission() {
        Permissions.requestPermission(android.Manifest.permission.CAMERA, "Needed for camera operations").then(() => {
          console.log("Permission granted!");
        }).catch(() => {
          console.log("Permission is not granted (sadface)");
        });
    }

}
