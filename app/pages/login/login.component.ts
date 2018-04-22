import {Component} from "@angular/core";
import {LoginCredential} from "../../shared/models/login-credential";
import {Router} from "@angular/router";
import * as util from "util";

import {UserService} from "../../shared/services/user.service";

@Component({
    selector: "my-app-login",
    templateUrl: './pages/login/login.component.html',
    styleUrls: [
        "./pages/login/login-common.scss",
        "./pages/login/login.scss"
    ]
})
export class LoginComponent {
    private _login_credential: LoginCredential;
    public isLoggingIn: boolean = true;

    constructor(
        private router: Router,
        private userService: UserService
    ) {
        this.login_credential = new LoginCredential();
    }

    get login_credential(): LoginCredential {
        return this._login_credential;
    }

    set login_credential(value: LoginCredential) {
        this._login_credential = value;
    }

    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            // this.signUp();
        }
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    // signUp() {
    //   this.userService.register(this.login_credential)
    //       .subscribe(
    //           () => {
    //             alert("Your account was successfully created.");
    //             this.toggleDisplay();
    //           },
    //           () => alert("Bogus inputs !")
    //       );
    // }

    login() {
        if (this.login_credential.email && this.login_credential.password) {
            this.userService.login(this.login_credential)
                .subscribe(
                    (data) => {
                        console.log(util.inspect(data, false, null));
                        if (data.length === 0) {
                            alert("Oops ! Couldn't find you anywhere in the universe. Try Again?");
                        } else {
                            this.router.navigate(["/travelode/list"]);
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
}
