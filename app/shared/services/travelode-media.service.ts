import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as util from "util";
import * as Config from "../../config/config.json";

import {TravelodeMedia} from "../models/travelode-media";

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

    createRequestHeader() {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return headers;
    }
}