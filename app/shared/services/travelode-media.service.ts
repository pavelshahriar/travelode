import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import * as util from "util";

import * as Config from "../../config/config.json";
import {TravelodeMedia} from "../models/travelode-media";
import {Media} from "../../shared/models/media";
import {Travelode} from "../../shared/models/travelode";
import {User} from "../../shared/models/user";
import {TravelodeMediaPojo} from "../../shared/models/travelode-media-pojo";

@Injectable()
export class TravelodeMediaService {
    constructor(private http: HttpClient) {}

    getAllMediaByTravelodeId(id: number) {
        // console.log(id);
        // console.log(util.inspect(Config, false, null));

        const url = Config.apiUrl + "travelode/"+ id +"/media";
        const headers = this.createRequestHeader();

        return this.http.get(url, {headers: headers});
    }

    create(trm: TravelodeMedia) {
        // console.log(id);
        // console.log(util.inspect(Config, false, null));

        const url = Config.apiUrl + "travelode/media";
        const body = JSON.stringify(trm);
        const headers = this.createRequestHeader();

        return this.http.post(url, body, {headers: headers, observe: "response"});
    }

    getOneById(id: number) : Observable<TravelodeMediaPojo> {
        const headers = this.createRequestHeader();
        return this.http.get(Config.apiUrl + "travelode/media/"+ id, {headers: headers})
            .map((res: Array<TravelodeMedia>) => {
                console.log(res[0]);
                return res[0];
            })
            .flatMap((trm: TravelodeMedia) => {
                return Observable.forkJoin([
                    this.http.get(Config.apiUrl + 'travelode/' + trm.travelodeId, {headers: headers}).map((res: Array<Travelode>) => res[0]),
                    this.http.get(Config.apiUrl + 'media/' + trm.mediaId, {headers: headers}).map((res: Array<Media>) => res[0])
                ])
                    .map((data: any) => {
                        let t: Travelode = data[0];
                        let m: Media = data[1];
                        let travelodeMedia: TravelodeMediaPojo = new TravelodeMediaPojo(trm, t, m);
                        return travelodeMedia;
                    });
            });
    }

    createRequestHeader() {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return headers;
    }
}