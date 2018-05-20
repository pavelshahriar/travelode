import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from "./app.component";
import {navigatableComponents, routes} from "./app.routing";
import {UserService} from "./shared/services/user.service";
import {TravelodeService} from "./shared/services/travelode.service";

@NgModule({
  imports: [
      NativeScriptModule,
      NativeScriptFormsModule,
      NativeScriptHttpClientModule,
      NativeScriptRouterModule,
      NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [
      AppComponent,
      ...navigatableComponents
  ],
  bootstrap: [
      AppComponent
  ],
  providers: [
      UserService,
      TravelodeService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
