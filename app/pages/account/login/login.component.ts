import { Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "tns-core-modules/ui/page";
import * as util from "util";
import * as appSettings from "application-settings";
import * as Dialogs from "tns-core-modules/ui/dialogs";

import {LoadingIndicatorHelper} from "~/shared/helpers/loading-indicator-helper";
import {LoginCredential} from "~/shared/models/login-credential";
import {UserService} from "~/shared/services/user.service";
import {TravelodeService} from "~/shared/services/travelode.service";
import {Travelode} from "~/shared/models/travelode";
import {User} from "~/shared/models/user";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit{
    private _login_credential: LoginCredential;

    constructor(
        private router: Router,
        private userService: UserService,
        private travelodeService: TravelodeService,
        private page: Page
    ) {
        this.login_credential = new LoginCredential();
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        if(appSettings.getNumber('userId')){
            // appSettings.clear();
            this._enterTravelodePanel();
        }
    }

    get login_credential(): LoginCredential {
        return this._login_credential;
    }

    set login_credential(value: LoginCredential) {
        this._login_credential = value;
    }

    signUp() {
        this.router.navigate(["/account/signup"]);
    }

    login() {
        // console.log(this.login_credential);
        LoadingIndicatorHelper.showLoader();
        if (this.login_credential.email && this.login_credential.password) {
            this.userService.login(this.login_credential)
                .subscribe(
                    (data: Array<User>) => {
                        // console.log(util.inspect(data, false, null));
                        LoadingIndicatorHelper.hideLoader();
                        appSettings.setNumber('userId', data[0].id);
                        appSettings.setString('email', data[0].email);
                        this._enterTravelodePanel();
                    },
                    (error) => {
                        // console.log(util.inspect(error, false, null));
                        LoadingIndicatorHelper.hideLoader();
                        (error.status === 401)
                            ? Dialogs.alert("Oops ! Couldn't find you anywhere in the universe. Try Again?")
                            : Dialogs.alert("Bullocks!");
                    }
                );
        } else {
            LoadingIndicatorHelper.hideLoader();
            Dialogs.alert("Where is your username and password dude?")
        }
    }

    _enterTravelodePanel () {
        this.travelodeService.getAllByUserId(appSettings.getNumber('userId'))
            .subscribe(
                (data: Array<Travelode>) => {
                    // console.log(util.inspect(data, false, null));
                    LoadingIndicatorHelper.hideLoader();
                    if(data.length > 0) {
                        if (appSettings.getNumber('travelodeId') && appSettings.getString('travelodeTitle')) {
                            this.router.navigate(["/post/start"]);
                        } else {
                            this.router.navigate(["/travelode/list"]);
                        }
                    } else {
                        this.router.navigate(["/account/onboard"]);
                    }
                }
            );
    }
}
