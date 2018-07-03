import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

import { AppComponent } from "./app.component";
import { navigatableComponents, routes } from "./app.routing";

import { UserService } from "./shared/services/user.service";
import { TravelodeService } from "./shared/services/travelode.service";
import { TravelodeMediaService } from "./shared/services/travelode-media.service";
import { MediaService } from "./shared/services/media.service";
import { LoadingIndicatorHelper } from "./shared/helpers/loading-indicator-helper";

@NgModule({
  imports: [
      NativeScriptModule,
      NativeScriptFormsModule,
      NativeScriptHttpClientModule,
      NativeScriptRouterModule,
      NativeScriptRouterModule.forRoot(routes),
      TNSCheckBoxModule
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
      TravelodeService,
      MediaService,
      TravelodeMediaService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
