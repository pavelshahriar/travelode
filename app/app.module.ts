import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import {NativeScriptHttpModule} from "nativescript-angular/http";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import {NativeScriptRouterModule} from "nativescript-angular/router";

import { AppComponent } from "./app.component";
import {navigatableComponents, routes} from "./app.routing";
import {UserService} from "./shared/services/user.service";

@NgModule({
  imports: [
      NativeScriptModule,
      NativeScriptFormsModule,
      NativeScriptHttpModule,
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
      UserService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
