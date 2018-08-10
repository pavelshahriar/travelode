import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import * as util from "util";
import * as appSettings from "application-settings";
import * as BackgroundHttp from "nativescript-background-http";
import * as fs from "file-system";

import * as Config from "../../config/config.json";

@Injectable()
export class MediaService {
    constructor(private http: HttpClient) {}

    create(mediaPath: string ) {
        return new Observable((observer: any) => {
            let session = BackgroundHttp.session("file-upload");
            let request = {
                url: Config.apiUrl + "media",
                method: "POST",
                description: "Media uploader"
            };
            let params = [
                { "name": "userId", "value": ""+appSettings.getNumber('userId')},
                { "name": "tripMedia", "filename": mediaPath, "mimeType": "image/jpg" }
            ];
            let task = session.multipartUpload(params, request);
            task.on("responded", (event) => {
                const data = JSON.parse(event.data)
                observer.next({"status": event.responseCode, "data": data});
            });
            task.on("completed", (event) => {
                let file = fs.File.fromPath(mediaPath);
                file.remove().then(result => {
                    observer.complete();
                }, error => {
                    // console.log(util(event, false, null));
                    observer.error("Could not delete `" + mediaPath + "`");
                });
            });
            task.on("error", event => {
                // console.log(util(event, false, null));
                observer.error("Could not upload `" + mediaPath + "`. " + event.eventName);
            });
        });
    }
}