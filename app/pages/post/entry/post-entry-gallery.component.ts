import {Component, OnInit} from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";
import {RouterExtensions} from "nativescript-angular";
import * as FileSystem from "tns-core-modules/file-system";
import {ImageSource} from "tns-core-modules/image-source";
import * as screenOrientation from "nativescript-screen-orientation";
import {Router} from "@angular/router";
import {topmost} from "tns-core-modules/ui/frame";


@Component({
    selector: 'PostEntryGallery',
    moduleId: module.id,
    templateUrl: './post-entry-gallery.component.html'
})
export class PostEntryGalleryComponent implements OnInit{
    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        this.chooseFromGallery();
    }

    chooseFromGallery(){
        let context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });

        context
            .present()
            .then((selection) => {
                selection.forEach((imageAsset) => {
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
                });
            })
            .catch(function (e) {
                console.log(e);
                topmost().goBack();
            });
    }
}