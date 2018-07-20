import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/concatMap";
import * as util from "util";

import * as Config from "~/config/config.json";
import {TravelodeMedia} from "~/shared/models/travelode-media";
import {Media} from "~/shared/models/media";
import {Travelode} from "~/shared/models/travelode";
import {TravelodeMediaPojo} from "~/shared/models/travelode-media-pojo";
import {RequestHelper} from "~/shared/helpers/request-helper";

@Injectable()
export class TravelodeMediaService {
    constructor(private http: HttpClient) {}

    getAllMediaByTravelodeId(id: number) : Observable<Array<TravelodeMediaPojo>> {
        const url = Config.apiUrl + "travelode/media?travelodeId="+ id;
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'GET');

        return this.http.get(url, {headers: headers})
            .concatMap((tms: Array<TravelodeMedia>) => Observable.from(tms))
            .concatMap((tm: TravelodeMedia) => this.getTravelodeMediaPojo(tm))
            .toArray()
    }

    create(trm: TravelodeMedia) {
        const url = Config.apiUrl + "travelode/media";
        const body = JSON.stringify(trm);
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'POST', body);

        return this.http.post(url, body, {headers: headers, observe: "response"});
    }

    getOneById(id: number) : Observable<TravelodeMediaPojo> {
        const url = Config.apiUrl + "travelode/media/"+ id;
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'GET');

        return this.http.get(url, {headers: headers})
            .map((res: Array<TravelodeMedia>) => {
                // console.log(res[0]);
                return res[0];
            })
            .concatMap((trm: TravelodeMedia) => {
                return this.getTravelodeMediaPojo(trm)
            });
    }

    private getTravelodeMediaPojo(tm: TravelodeMedia) {
        const travelodeUrl = Config.apiUrl + 'travelode/' + tm.travelodeId;
        const mediaUrl = Config.apiUrl + 'media/' + tm.mediaId;
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(travelodeUrl, 'GET');
        RequestHelper.logRequest(mediaUrl, 'GET');

        return Observable.forkJoin([
            this.http.get(travelodeUrl, {headers: headers}).map((res: Array<Travelode>) => res[0]),
            this.http.get(mediaUrl, {headers: headers}).map((res: Array<Media>) => res[0])
        ])
            .map((data: any) => {
                let t: Travelode = data[0];
                let m: Media = data[1];
                return new TravelodeMediaPojo(tm, t, m);
            });
    }
}