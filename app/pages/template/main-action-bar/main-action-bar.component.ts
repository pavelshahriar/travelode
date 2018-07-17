import {Component, Input} from '@angular/core';
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";

@Component({
    moduleId: module.id,
    selector: 'appMainActionBar',
    templateUrl: './main-action-bar.component.html',
    styleUrls: ['./main-action-bar.scss']
})
export class MainActionBarComponent {
    @Input() showSlider: boolean;

    @Input() showBack: boolean;

    @Input() backNavigationDefault: boolean;

    @Input() backNavigationUrl: string;

    constructor(
        private router: Router,
        private nav: RouterExtensions
    ) {}

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    goBack() {
        if (this.backNavigationDefault) {
            console.log('Going back!');
            this.nav.back();
        }

        if (this.backNavigationUrl) {
            this.router.navigate([this.backNavigationUrl]);
        }

    }
}