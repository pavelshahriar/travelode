import { Component, OnInit } from "@angular/core";
import { topmost } from "ui/frame";
import * as camera from "nativescript-camera";
import { ImageSource } from "tns-core-modules/image-source";
import * as FileSystem from "tns-core-modules/file-system";
import { Router} from "@angular/router";


@Component({
    selector: "my-app-post-entry",
    moduleId: module.id,
    templateUrl: "./post-entry-camera.component.html",
})
export class PostEntryCameraComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {
        this.takePicture();
    }

    takePicture() {
        let isAvailable = camera.isAvailable();

        if (isAvailable) {
            camera.requestPermissions();

            let options = {
                width: 500,
                height: 500,
                keepAspectRatio: false,
                saveToGallery: true
            };

            camera.takePicture(options).then((imageAsset) => {
                const source = new ImageSource();
                source.fromAsset(imageAsset).then((imageSource) => {
                    const folder = FileSystem.knownFolders.documents().path;
                    const fileName = "image"+ Date.now() +".jpg";
                    const path = FileSystem.path.join(folder, fileName);
                    const saved = imageSource.saveToFile(path, "jpg");
                    if (saved) {
                        console.log("Image saved successfully with filename : " + fileName + " @ here : " + folder);
                        this.router.navigate(['post/details'], {queryParams: {path: path}});
                    }
                });
            });
        }
    }

    goBack() {
        console.log('Nav button tapped !')
        topmost().goBack();
    }
}