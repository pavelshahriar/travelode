import {Component, OnInit} from '@angular/core';
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {User} from "~/shared/models/user";
import {UserService} from "~/shared/services/user.service";
import {filter} from "rxjs/internal/operators";
import {NavigationEnd, Router} from "@angular/router";
import * as appSettings from "tns-core-modules/application-settings";
import * as util from "util";
import {RouterExtensions} from "nativescript-angular";

@Component({
    moduleId: module.id,
    selector: 'appSliderMenu',
    templateUrl: 'slider-menu.component.html',
    styleUrls: [
        'slider-menu.scss'
    ]
})
export class SliderMenuComponent implements OnInit {
    private _currentUser: User;
    private _activatedUrl: string;

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.activatedUrl = "/";

        if (appSettings.getNumber('userId')) {
            this._setUserData(appSettings.getNumber('userId'));
        }

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.activatedUrl = event.urlAfterRedirects;
                if (appSettings.getNumber('userId')) {
                    this._setUserData(appSettings.getNumber('userId'));
                }

            });
    }

    get currentUser(): User {
        return this._currentUser;
    }

    set currentUser(value: User) {
        this._currentUser = value;
    }

    set activatedUrl(value: string) {
        this._activatedUrl = value;
    }

    _setUserData(currentUserId) {
        this.userService.getById(currentUserId).subscribe((data) => {
            console.log(util.inspect(data, null, false));
            this.currentUser = new User();
            this.currentUser = data;
            console.log('curent user');
            console.log(util.inspect(this.currentUser, null, false));
        });
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    // onDrawerButtonTap(): void {
    //     const sideDrawer = <RadSideDrawer>app.getRootView();
    //     sideDrawer.showDrawer();
    // }
}