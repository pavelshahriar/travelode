import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { TravelodeWelcomeComponent } from "./pages/travelode/welcome/travelode-welcome.component";
import { TravelodeCreateComponent } from "./pages/travelode/create/travelode-create.component";
import { TravelodeListComponent } from "./pages/travelode/list/travelode-list.component";
import { TravelodeCreatedComponent } from "./pages/travelode/created/travelode-created.component";
import { PostDetailsComponent } from "./pages/post/details/post-details.component";
import {PostEntryComponent} from "./pages/post/entry/post-entry.component";
import {PostSuccessComponent} from "./pages/post/success/post-success.component";

export const routes = [
    {path: "", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "travelode/welcome", component: TravelodeWelcomeComponent},
    {path: "travelode/create", component: TravelodeCreateComponent},
    {path: "travelode/edit/:id", component: TravelodeCreateComponent},
    {path: "travelode/list", component: TravelodeListComponent},
    {path: "travelode/created/:id", component: TravelodeCreatedComponent},
    {path: "post/entry", component: PostEntryComponent},
    {path: "post/details/local", component: PostDetailsComponent},
    {path: "post/success/:id", component: PostSuccessComponent},
];

export const navigatableComponents = [
    LoginComponent,
    SignupComponent,
    TravelodeWelcomeComponent,
    TravelodeCreateComponent,
    TravelodeListComponent,
    TravelodeCreatedComponent,
    PostEntryComponent,
    PostDetailsComponent,
    PostSuccessComponent
];