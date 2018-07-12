import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

import { AppComponent } from "./app.component";
import { navigatableComponents, routes } from "./app.routing";

import { HelpersModule } from "./shared/helpers/helpers.module";
import { ServicesModule } from "./shared/services/services.module";

@NgModule({
  imports: [
      NativeScriptModule,
      NativeScriptFormsModule,
      NativeScriptHttpClientModule,
      NativeScriptRouterModule,
      NativeScriptRouterModule.forRoot(routes),
      TNSCheckBoxModule,
      HelpersModule,
      ServicesModule
  ],
  declarations: [
      AppComponent,
      ...navigatableComponents
  ],
  bootstrap: [
      AppComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
