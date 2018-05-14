import {Component} from "@angular/core";
import {LoginCredential} from "../../shared/models/login-credential";
import {Router} from "@angular/router";
import * as util from "util";
import * as appSettings from "application-settings";

import {UserService} from "../../shared/services/user.service";
import {TravelodeService} from "../../shared/services/travelode.service";
import {Travelode} from "../../shared/models/travelode";
import {Page} from "tns-core-modules/ui/page";

@Component({
    selector: "my-app-login",
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: [
        "./login-common.scss",
        "./login.scss"
    ]
})
export class LoginComponent {
    private _login_credential: LoginCredential;
    public isLoggingIn: boolean = true;

    constructor(
        private router: Router,
        private userService: UserService,
        private travelodeService: TravelodeService,
        public page: Page
    ) {
        this.login_credential = new LoginCredential();
            page.actionBarHidden = true;
    }

    get login_credential(): LoginCredential {
        return this._login_credential;
    }

    set login_credential(value: LoginCredential) {
        this._login_credential = value;
    }

    signUp() {
        this.router.navigate(["/signup"]);
    }

    login() {
        if (this.login_credential.email && this.login_credential.password) {
            this.userService.login(this.login_credential)
                .subscribe(
                    (data) => {
                        console.log(util.inspect(data, false, null));
                        if (data.length === 0) {
                            alert("Oops ! Couldn't find you anywhere in the universe. Try Again?");
                        } else {
                            appSettings.setNumber('userId', data[0].id);
                            appSettings.setString('email', data[0].email);
                            this._enterTravelodePanel();
                            // this.router.navigate(["/travelode/welcome"]);
                        }
                    },
                    (error) => {
                        console.log(util.inspect(error, false, null));
                        alert("Bullocks!");
                    }
                );
        } else {
            alert("Where is your username and password dude ?")
        }
    }

    _enterTravelodePanel () {
        let travelodes: Array<Travelode> = [];
        this.travelodeService.getAllByUserId(appSettings.getNumber('userId'))
            .subscribe(
                (data) => {
                    travelodes = data.json();
                    if(travelodes.length > 0) {
                        this.router.navigate(["/travelode/list"]);
                    } else {
                        this.router.navigate(["/travelode/welcome"]);
                    }
                }
            );
    }
}
