import { LoginComponent }            from "./pages/login/login.component";
import { SignupComponent }           from "./pages/signup/signup.component";
import { TravelodeWelcomeComponent } from "./pages/travelode/welcome/travelode-welcome.component";
import { TravelodeCreateComponent }  from "./pages/travelode/create/travelode-create.component";
import { TravelodeListComponent }    from "./pages/travelode/list/travelode-list.component";
import { TravelodeCreatedComponent } from "./pages/travelode/created/travelode-created.component";
import { PostDetailsComponent }      from "./pages/post/details/post-details.component";
import { PostEntryCameraComponent }  from "./pages/post/entry/post-entry-camera.component";
import { PostSuccessComponent }      from "./pages/post/success/post-success.component";
import { PostStartComponent }        from "./pages/post/start/post-start.component";
import { PostReviewComponent}        from "./pages/post/review/post-review.component";
import { TravelodeDetailsComponent } from "./pages/travelode/details/travelode-details.component";
import { TravelodeSwitchComponent }  from "./pages/travelode/switch/travelode-switch.component";
import { MainActionBarComponent }    from "./pages/template/main-action-bar/main-action-bar.component";
import { SliderMenuComponent }       from "./pages/template/slider-menu/slider-menu.component";
import { LogoutComponent }           from "./pages/logout/logout.component";
import {PostEntryGalleryComponent}   from "./pages/post/entry/post-entry-gallery.component";

export const routes = [
    {path: "",                      component: LoginComponent},
    {path: "login",                 component: LoginComponent},
    {path: "signup",                component: SignupComponent},
    {path: "logout",                component: LogoutComponent},
    {path: "travelode/welcome",     component: TravelodeWelcomeComponent},
    {path: "travelode/list",        component: TravelodeListComponent},
    {path: "travelode/switch",      component: TravelodeSwitchComponent},
    {path: "travelode/details/:id", component: TravelodeDetailsComponent},
    {path: "travelode/create",      component: TravelodeCreateComponent},
    {path: "travelode/edit/:id",    component: TravelodeCreateComponent},
    {path: "travelode/created/:id", component: TravelodeCreatedComponent},
    {path: "travelode/updated/:id", component: TravelodeCreatedComponent},
    {path: "post/start",            component: PostStartComponent},
    {path: "post/entry/camera",     component: PostEntryCameraComponent},
    {path: "post/entry/gallery",    component: PostEntryGalleryComponent},
    {path: "post/details/local",    component: PostDetailsComponent},
    {path: "post/review/:id",       component: PostReviewComponent},
    {path: "post/edit/:id",         component: PostDetailsComponent},
    {path: "post/success/:id",      component: PostSuccessComponent},
];

export const navigatableComponents = [
    MainActionBarComponent,
    SliderMenuComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    TravelodeWelcomeComponent,
    TravelodeCreateComponent,
    TravelodeListComponent,
    TravelodeDetailsComponent,
    TravelodeSwitchComponent,
    TravelodeCreatedComponent,
    PostStartComponent,
    PostEntryCameraComponent,
    PostEntryGalleryComponent,
    PostDetailsComponent,
    PostReviewComponent,
    PostSuccessComponent
];