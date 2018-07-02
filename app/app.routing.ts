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
import {PostReviewComponent}         from "./pages/post/review/post-review.component";

export const routes = [
    {path: "",                      component: LoginComponent},
    {path: "login",                 component: LoginComponent},
    {path: "signup",                component: SignupComponent},
    {path: "travelode/welcome",     component: TravelodeWelcomeComponent},
    {path: "travelode/list",        component: TravelodeListComponent},
    {path: "travelode/create",      component: TravelodeCreateComponent},
    {path: "travelode/edit/:id",    component: TravelodeCreateComponent},
    {path: "travelode/created/:id", component: TravelodeCreatedComponent},
    {path: "travelode/updated/:id", component: TravelodeCreatedComponent},
    {path: "post/start",            component: PostStartComponent},
    {path: "post/entry/camera",     component: PostEntryCameraComponent},
    {path: "post/details",          component: PostDetailsComponent},
    {path: "post/review/:id",       component: PostReviewComponent},
    {path: "post/edit/:id",         component: PostDetailsComponent},
    {path: "post/success/:id",      component: PostSuccessComponent},
];

export const navigatableComponents = [
    LoginComponent,
    SignupComponent,
    TravelodeWelcomeComponent,
    TravelodeCreateComponent,
    TravelodeListComponent,
    TravelodeCreatedComponent,
    PostStartComponent,
    PostEntryCameraComponent,
    PostDetailsComponent,
    PostReviewComponent,
    PostSuccessComponent
];