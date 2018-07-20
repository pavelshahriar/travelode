import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import {filter} from "rxjs/internal/operators";
import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import * as util from "util";

import {UserService} from "~/shared/services/user.service";
import {LoadingIndicatorHelper} from "~/shared/helpers/loading-indicator-helper";
import {UserPojo} from "~/shared/models/user-pojo";
import {User} from "~/shared/models/user";

@Component({
    selector: 'appSliderMenu',
    moduleId: module.id,
    templateUrl: 'slider-menu.component.html',
    styleUrls: [
        'slider-menu.scss'
    ]
})
export class SliderMenuComponent implements OnInit {
    private _currentUser: UserPojo;
    private _activatedUrl: string;

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.activatedUrl = "";
        this.setUserData();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.activatedUrl = event.urlAfterRedirects;
            });
    }

    get currentUser(): UserPojo {
        return this._currentUser;
    }

    set currentUser(value: UserPojo) {
        this._currentUser = value;
    }

    set activatedUrl(value: string) {
        this._activatedUrl = value;
    }

    setUserData() {
        const currentUserId = appSettings.getNumber('userId');
        if(currentUserId) {
            LoadingIndicatorHelper.showLoader();
            this.userService.getOneById(currentUserId).subscribe((data: UserPojo) => {
                LoadingIndicatorHelper.hideLoader();
                this.currentUser = data;
            });
        }
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
}