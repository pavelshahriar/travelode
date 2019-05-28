import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular";

import {PostStartComponent} from "~/pages/post/start/post-start.component";
import {PostEntryCameraComponent} from "~/pages/post/entry/post-entry-camera.component";
import {PostEntryGalleryComponent} from "~/pages/post/entry/post-entry-gallery.component";
import {PostDetailsComponent} from "~/pages/post/details/post-details.component";
import {PostSuccessComponent} from "~/pages/post/success/post-success.component";
import {PostReviewComponent} from "~/pages/post/review/post-review.component";

const routes: Routes = [
    { path: "", component: PostStartComponent },
    { path: "start", component: PostStartComponent },
    { path: "entry/camera", component: PostEntryCameraComponent },
    { path: "entry/gallery", component: PostEntryGalleryComponent },
    { path: "details/local", component: PostDetailsComponent },
    { path: "edit/:id", component: PostDetailsComponent},
    { path: "success/:id", component: PostSuccessComponent},
    { path: "review/:id", component: PostReviewComponent}

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PostRouting { }