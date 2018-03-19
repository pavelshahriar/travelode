import { Component } from "@angular/core";
import { User } from "../../shared/models/user";
import {Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import * as util from "util";

@Component({
  selector: "my-app-login",
  templateUrl: './pages/login/login.component.html',
  styleUrls: [
      "./pages/login/login-common.scss",
      "./pages/login/login.scss"
  ]
})
export class LoginComponent {
  private _user: User;
  public isLoggingIn: boolean = true;

  constructor(
      private router: Router,
      private userService: UserService
  ) {
    this.user = new User();
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  signUp() {
    this.userService.register(this.user)
        .subscribe(
            () => {
              alert("Your account was successfully created.");
              this.toggleDisplay();
            },
            () => alert("Bogus inputs !")
        );
  }

  login() {
    if(this.user.email && this.user.password) {
      this.userService.login(this.user)
            .subscribe(
                (data) => {
                  console.log(util.inspect(data, false, null));

                  if(data[0].email == this.user.email && data[0].password == this.user.password) {
                    this.router.navigate(["/travelode/list"])
                  }
                },
                (error) => alert("Bullocks!")
            );
    } else {
      alert("Where is your username and password dude ?")
    }
  }
}
