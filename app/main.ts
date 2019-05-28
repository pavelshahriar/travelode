import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { enableProdMode } from '@angular/core';
import { AppModule } from "./app.module";

platformNativeScriptDynamic().bootstrapModule(AppModule);
