import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import * as appSettings from "application-settings";

@Component({
    selector: 'Logout',
    moduleId: module.id,
    templateUrl: './logout.component.html'
})

export class LogoutComponent implements OnInit {
    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        appSettings.clear();
        this.router.navigate(['/account/login']);
    }
}