import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as util from "util";

import * as Config from "../../config/config.json";
import { TravelodeMediaCategory } from "../models/travelode-media-category";
import {Observable} from "rxjs/Rx";
import {RequestHelper} from "../helpers/request-helper";

@Injectable()
export class TravelodeMediaCategoryService {
    constructor(private http: HttpClient) {}

    create(trms: TravelodeMediaCategory) {
        const url = Config.apiUrl + "travelode/media/category";
        const body = JSON.stringify(trms);
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'POST', body);

        return this.http.post(url, body, {headers: headers, observe: "response"});
    }

/*     update(tr: Travelode) {
        const url = Config.apiUrl + "travelode/" + tr.id;
        delete tr.id;
        const body = JSON.stringify(tr);
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'PUT', body);


        return this.http.put(url, body, {headers: headers, observe: "response"});
    }

    getAllByUserId(id: number) {
        const url = Config.apiUrl + "travelode?userId=" + id;
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'GET');

        return this.http.get(url, {headers: headers});
    }

    getOneByTravelodeId(id: number) : Observable<Travelode> {
        const url = Config.apiUrl + "travelode/" + id;
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'GET');

        return this.http.get(url, {headers: headers}).map((data: Travelode) => data[0]);
    } */
}