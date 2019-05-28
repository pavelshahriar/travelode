import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular";
import {TNSCheckBoxModule} from 'nativescript-checkbox/angular';

import {PostRouting} from "~/pages/post/post.routing";
import { PostActionBarComponent } from "~/template/post-action-bar/post-action-bar.component";
import {PostStartComponent} from "~/pages/post/start/post-start.component";
import {PostEntryCameraComponent} from "~/pages/post/entry/post-entry-camera.component";
import {PostEntryGalleryComponent} from "~/pages/post/entry/post-entry-gallery.component";
import {PostDetailsComponent} from "~/pages/post/details/post-details.component";
import {PostSuccessComponent} from "~/pages/post/success/post-success.component";
import {PostReviewComponent} from "~/pages/post/review/post-review.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        PostRouting,
        TNSCheckBoxModule
    ],
    declarations: [
        PostActionBarComponent,
        PostStartComponent,
        PostEntryCameraComponent,
        PostEntryGalleryComponent,
        PostDetailsComponent,
        PostSuccessComponent,
        PostReviewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PostModule { }