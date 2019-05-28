import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as util from "util";
import * as lodash from "lodash";

import * as Config from "../../config/config.json";
import {Travelode} from "../models/travelode";
import {Observable} from "rxjs/Rx";
import {RequestHelper} from "../helpers/request-helper";

@Injectable()
export class TravelodeService {
    constructor(private http: HttpClient) {}

    create(tr: Travelode) {
        const url = Config.apiUrl + "travelode";
        const body = JSON.stringify(tr);
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'POST', body);

        return this.http.post(url, body, {headers: headers, observe: "response"});
    }

    update(tr: Travelode) {
        const url = Config.apiUrl + "travelode/" + tr.id;
        delete tr.id;
        delete tr.created;
        delete tr.userId;
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
    }
}