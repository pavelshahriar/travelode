import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {TravelodeWelcomeComponent} from "./pages/travelode/welcome/travelode-welcome.component";
import {TravelodeCreateComponent} from "./pages/travelode/create/travelode-create.component";
import {TravelodeListComponent} from "./pages/travelode/list/travelode-list.component";

export const routes = [
    {path: "", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "travelode/welcome", component: TravelodeWelcomeComponent},
    {path: "travelode/create", component: TravelodeCreateComponent},
    {path: "travelode/list", component: TravelodeListComponent},
];

export const navigatableComponents = [
    LoginComponent,
    SignupComponent,
    TravelodeWelcomeComponent,
    TravelodeCreateComponent,
    TravelodeListComponent
];