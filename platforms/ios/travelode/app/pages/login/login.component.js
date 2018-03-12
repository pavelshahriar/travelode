"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_1 = require("../../shared/models/user");
var router_1 = require("@angular/router");
var user_service_1 = require("../../shared/services/user.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.isLoggingIn = true;
        this.user = new user_1.User();
    }
    Object.defineProperty(LoginComponent.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.submit = function () {
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.signUp();
        }
    };
    LoginComponent.prototype.toggleDisplay = function () {
        this.isLoggingIn = !this.isLoggingIn;
    };
    LoginComponent.prototype.signUp = function () {
        var _this = this;
        this.userService.register(this.user)
            .subscribe(function () {
            alert("Your account was successfully created.");
            _this.toggleDisplay();
        }, function () { return alert("Bogus inputs !"); });
    };
    LoginComponent.prototype.login = function () {
        if (this.user.username && this.user.password) {
            this.router.navigate(["/travelode/list"]);
            // this.userService.login(this.user)
            //     .subscribe(
            //         (data) => {
            //           if(data === true) {this.router.navigate(["/travelode/list"])}
            //         },
            //         (error) => alert("Bullocks!")
            //     );
        }
        else {
            alert("Where is your username and password dude ?");
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "my-app-login",
            templateUrl: './pages/login/login.component.html',
            styleUrls: [
                "./pages/login/login-common.scss",
                "./pages/login/login.scss"
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLGlEQUFnRDtBQUNoRCwwQ0FBdUM7QUFDdkMsbUVBQStEO0FBVS9EO0lBSUUsd0JBQ1ksTUFBYyxFQUNkLFdBQXdCO1FBRHhCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUo3QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQU1qQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELHNCQUFJLGdDQUFJO2FBQVI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO2FBRUQsVUFBUyxLQUFXO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUM7OztPQUpBO0lBTUQsK0JBQU0sR0FBTjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDO0lBQ0gsQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN2QyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUFBLGlCQVNDO1FBUkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUMvQixTQUFTLENBQ047WUFDRSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUNoRCxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUNELGNBQU0sT0FBQSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBdkIsQ0FBdUIsQ0FDaEMsQ0FBQztJQUNSLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQ0UsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBRTFDLG9DQUFvQztZQUNwQyxrQkFBa0I7WUFDbEIsc0JBQXNCO1lBQ3RCLDBFQUEwRTtZQUMxRSxhQUFhO1lBQ2Isd0NBQXdDO1lBQ3hDLFNBQVM7UUFDWCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQTtRQUNyRCxDQUFDO0lBQ0gsQ0FBQztJQXhEVSxjQUFjO1FBUjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELFNBQVMsRUFBRTtnQkFDUCxpQ0FBaUM7Z0JBQ2pDLDBCQUEwQjthQUM3QjtTQUNGLENBQUM7eUNBTW9CLGVBQU07WUFDRCwwQkFBVztPQU56QixjQUFjLENBeUQxQjtJQUFELHFCQUFDO0NBQUEsQUF6REQsSUF5REM7QUF6RFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvbW9kZWxzL3VzZXJcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge1VzZXJTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwLWxvZ2luXCIsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICAgXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5zY3NzXCIsXG4gICAgICBcIi4vcGFnZXMvbG9naW4vbG9naW4uc2Nzc1wiXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQge1xuICBwcml2YXRlIF91c2VyOiBVc2VyO1xuICBwdWJsaWMgaXNMb2dnaW5nSW46IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gIH1cblxuICBnZXQgdXNlcigpOiBVc2VyIHtcbiAgICByZXR1cm4gdGhpcy5fdXNlcjtcbiAgfVxuXG4gIHNldCB1c2VyKHZhbHVlOiBVc2VyKSB7XG4gICAgdGhpcy5fdXNlciA9IHZhbHVlO1xuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIGlmICh0aGlzLmlzTG9nZ2luZ0luKSB7XG4gICAgICB0aGlzLmxvZ2luKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2lnblVwKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRGlzcGxheSgpIHtcbiAgICB0aGlzLmlzTG9nZ2luZ0luID0gIXRoaXMuaXNMb2dnaW5nSW47XG4gIH1cblxuICBzaWduVXAoKSB7XG4gICAgdGhpcy51c2VyU2VydmljZS5yZWdpc3Rlcih0aGlzLnVzZXIpXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiWW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgY3JlYXRlZC5cIik7XG4gICAgICAgICAgICAgIHRoaXMudG9nZ2xlRGlzcGxheSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IGFsZXJ0KFwiQm9ndXMgaW5wdXRzICFcIilcbiAgICAgICAgKTtcbiAgfVxuXG4gIGxvZ2luKCkge1xuICAgIGlmKHRoaXMudXNlci51c2VybmFtZSAmJiB0aGlzLnVzZXIucGFzc3dvcmQpIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90cmF2ZWxvZGUvbGlzdFwiXSk7XG5cbiAgICAgIC8vIHRoaXMudXNlclNlcnZpY2UubG9naW4odGhpcy51c2VyKVxuICAgICAgLy8gICAgIC5zdWJzY3JpYmUoXG4gICAgICAvLyAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAvLyAgICAgICAgICAgaWYoZGF0YSA9PT0gdHJ1ZSkge3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90cmF2ZWxvZGUvbGlzdFwiXSl9XG4gICAgICAvLyAgICAgICAgIH0sXG4gICAgICAvLyAgICAgICAgIChlcnJvcikgPT4gYWxlcnQoXCJCdWxsb2NrcyFcIilcbiAgICAgIC8vICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcIldoZXJlIGlzIHlvdXIgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIGR1ZGUgP1wiKVxuICAgIH1cbiAgfVxufVxuIl19