import {Component, Input} from '@angular/core';
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";

@Component({
    moduleId: module.id,
    selector: 'PostActionBar',
    templateUrl: './post-action-bar.component.html',
    styleUrls: ['./post-action-bar.component.scss']
})
export class PostActionBarComponent{
    @Input() showSlider: boolean;

    @Input() showBack: boolean;

    @Input() backNavigationUrl: string;

    private _canGoBack: boolean;

    get canGoBack(): boolean {
        return this._canGoBack;
    }

    set canGoBack(value: boolean) {
        this._canGoBack = value;
    }

    constructor(
        private router: Router,
        private nav: RouterExtensions
    ) {
        this.canGoBack = this.nav.canGoBack()
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    goBack() {
        console.log('Going back!');
        if (this.backNavigationUrl) {
            this.router.navigate([this.backNavigationUrl]);
        } else {
            this.nav.backToPreviousPage();
        }

    }
}