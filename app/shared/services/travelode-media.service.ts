import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/concatMap";
import * as util from "util";

import * as Config from "../../config/config.json";
import {TravelodeMedia} from "../models/travelode-media";
import {Media} from "../../shared/models/media";
import {Travelode} from "../../shared/models/travelode";
import {TravelodeMediaPojo} from "../../shared/models/travelode-media-pojo";

@Injectable()
export class TravelodeMediaService {
    constructor(private http: HttpClient) {}

    getAllMediaByTravelodeId(id: number) : Observable<Array<TravelodeMediaPojo>> {
        // console.log(id);
        const headers = this.createRequestHeader();
        return this.http.get(Config.apiUrl + "travelode/media?travelodeId="+ id, {headers: headers})
            .concatMap((tms: Array<TravelodeMedia>) => Observable.from(tms))
            .concatMap((tm: TravelodeMedia) => this.getTravelodeMediaPojo(tm))
            .toArray()
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
            .concatMap((trm: TravelodeMedia) => {
                return this.getTravelodeMediaPojo(trm)
            });
    }

    private getTravelodeMediaPojo(tm: TravelodeMedia) {
        let headers = this.createRequestHeader();
        let travelodeId = tm.travelodeId;
        let mediaId = tm.mediaId;

        return Observable.forkJoin([
            this.http.get(Config.apiUrl + 'travelode/' + travelodeId, {headers: headers}).map((res: Array<Travelode>) => res[0]),
            this.http.get(Config.apiUrl + 'media/' + mediaId, {headers: headers}).map((res: Array<Media>) => res[0])
        ])
            .map((data: any) => {
                let t: Travelode = data[0];
                let m: Media = data[1];
                return new TravelodeMediaPojo(tm, t, m);
            });
    }

    createRequestHeader() {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return headers;
    }
}