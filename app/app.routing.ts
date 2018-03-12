import { LoginComponent } from "./pages/login/login.component";
import {TravelodeComponent} from "./pages/travelode/travelode.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "travelode/list", component: TravelodeComponent },
];

export const navigatableComponents = [
  LoginComponent,
  TravelodeComponent
];