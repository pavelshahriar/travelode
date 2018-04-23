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
    templateUrl: './signup.component.html',
    styleUrls: [
        "./signup-common.scss",
        "./signup.scss"
    ]
})
export class SignupComponent {
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

    login() {
        this.router.navigate(["/"]);
    }

    singUp() {
        if (this.login_credential.email && this.login_credential.password) {
            this.userService.singup(this.login_credential)
                .subscribe(
                    (data) => {
                        console.log(util.inspect(data, false, null));
                        if (data.status === 200) {
                            alert("Account Created! Please login now.");
                            this.router.navigate(["/"]);
                        }
                    },
                    (error) => {
                        console.log(util.inspect(error, false, null));
                        alert("Bullocks!");
                    }
                );
        } else {
            alert("You want to create an account without email and password ? Really ?")
        }
    }
}
