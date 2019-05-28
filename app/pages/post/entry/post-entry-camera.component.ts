import { Component, OnInit } from "@angular/core";
import { topmost } from "ui/frame";
import * as camera from "nativescript-camera";
import { ImageSource } from "tns-core-modules/image-source";
import * as FileSystem from "tns-core-modules/file-system";
import { Router} from "@angular/router";
import * as screenOrientation from "nativescript-screen-orientation";

@Component({
    selector: "PostEntryCamera",
    moduleId: module.id,
    templateUrl: "./post-entry-camera.component.html",
})
export class PostEntryCameraComponent implements OnInit {

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        // screenOrientation.setCurrentOrientation('landscape',() => {
        //     console.log('Orientation set to landscape.');
            this.takePicture();
        // })
    }

    takePicture() {
        let options = {
            saveToGallery: false
        };

        camera.takePicture(options)
            .then((imageAsset) => {
                const source = new ImageSource();
                source.fromAsset(imageAsset).then((imageSource) => {

                    console.log('width ==> ' + imageSource.width)
                    console.log('height => ' + imageSource.height)

                    const folder = FileSystem.knownFolders.documents().path;
                    const fileName = "image"+ Date.now() +".jpg";
                    const path = FileSystem.path.join(folder, fileName);
                    const saved = imageSource.saveToFile(path, "jpg");
                    if (saved) {
                        console.log("Image saved successfully with filename : " + fileName + " @ here : " + folder);
                        this.router.navigate(['post/details/local'], {queryParams: {path: path}});
                    }
                });
            })
            .catch((e) => {
                console.log(e);
                // screenOrientation.orientationCleanup();
                topmost().goBack();
            });
    }
}