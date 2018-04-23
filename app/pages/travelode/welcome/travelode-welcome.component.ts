import { Component } from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "my-app-travelode-welcome",
  moduleId: module.id,
  templateUrl: "./travelode-welcome.component.html",
  styleUrls: [
      "./travelode-welcome-common.scss",
      "./travelode-welcome.scss"
  ]
})
export class TravelodeWelcomeComponent{

    constructor(private router: Router){ }

    createTravelodeButtonPressed(){
        this.router.navigate(["/travelode/create"]);
    }
}