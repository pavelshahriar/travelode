import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "tns-core-modules/ui/page";
import * as util from "util";
import * as Dialogs from "tns-core-modules/ui/dialogs";

import {LoginCredential} from "~/shared/models/login-credential";
import {UserService} from "~/shared/services/user.service";
import {LoadingIndicatorHelper} from "~/shared/helpers/loading-indicator-helper";

@Component({
    selector: "signup",
    moduleId: module.id,
    templateUrl: './signup.component.html',
    styleUrls: ["./signup.component.scss"]
})
export class SignupComponent {
    private _login_credential: LoginCredential;

    constructor(
        private router: Router,
        private userService: UserService,
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
        this.router.navigate(["/account/login"]);
    }

    singUp() {
        // console.log(this.login_credential);
        LoadingIndicatorHelper.showLoader();
        if (this.login_credential.email && this.login_credential.password) {
            this.userService.singup(this.login_credential)
                .subscribe(
                    (data: any) => {
                        // console.log(util.inspect(data, false, null));
                        if (data.status == 201) {
                            LoadingIndicatorHelper.hideLoader();
                            Dialogs.alert("Account Created! Please login now.");
                            this.router.navigate(["/account/login"]);
                        }
                    },
                    (error) => {
                        // console.log(util.inspect(error, false, null));
                        LoadingIndicatorHelper.hideLoader();
                        Dialogs.alert("Bullocks!");
                    }
                );
        } else {
            LoadingIndicatorHelper.hideLoader();
            Dialogs.alert("You want to create an account without email and password? Really?")
        }
    }
}
