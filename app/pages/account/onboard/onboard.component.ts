import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "tns-core-modules/ui/page";

@Component({
  selector: "onboard",
  moduleId: module.id,
  templateUrl: "./onboard.component.html",
  styleUrls: ["./onboard.component.scss"]
})
export class OnboardComponent{

    constructor(
        private router: Router,
        private page: Page
    ){
        this.page.actionBarHidden = true;
    }

    createTravelodeButtonPressed(){
        this.router.navigate(["/travelode/create"]);
    }
}