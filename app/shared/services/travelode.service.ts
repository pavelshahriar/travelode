import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as util from "util";

import * as Config from "../../config/config.json";
import {Travelode} from "../models/travelode";

@Injectable()
export class TravelodeService {
    constructor(private http: HttpClient) {}

    create(tr: Travelode) {
        // console.log(util.inspect(tr, false, null));
        // console.log(util.inspect(Config, false, null));

        const url = Config.apiUrl + "travelode";
        const body = JSON.stringify(tr);
        const headers = this.createRequestHeader();

        return this.http.post(url, body, {headers: headers, observe: "response"});
    }

    getAllByUserId(id: number) {
        // console.log(id);
        // console.log(util.inspect(Config, false, null));

        const url = Config.apiUrl + "travelode?userId=" + id;
        const headers = this.createRequestHeader();

        return this.http.get(url, {headers: headers});
    }

    getOneByTravelodeId(id: number) {
        // console.log(id);
        // console.log(util.inspect(Config, false, null));

        const url = Config.apiUrl + "travelode/" + id;
        const headers = this.createRequestHeader();

        return this.http.get(url, {headers: headers});
    }

    createRequestHeader() {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return headers;
    }
}