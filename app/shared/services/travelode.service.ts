import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as util from "util";

import * as Config from "../../config/config.json";
import { User } from "../models/user";
import {Travelode} from "../models/travelode";

@Injectable()
export class TravelodeService {
    constructor(private http: Http) {}

    create(tr: Travelode) : Observable<Response>{
        return this.http.post(
            Config.apiUrl + "travelode",
            JSON.stringify(tr),
            {headers: this.getCommonHeaders()}
        )
    }

    getAllByUserId(id: number) : Observable<Response> {
        return this.http.get(
            Config.apiUrl + "travelode?userId=" + id,
            {headers: this.getCommonHeaders()}
        )
    }

    getOneByTravelodeId(id: number) : Observable<Response> {
        return this.http.get(
            Config.apiUrl + "travelode/" + id,
            {headers: this.getCommonHeaders()}
        );
    }

    getCommonHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", Config.authHeader);
        return headers;
    }

    handleErrors(error: Response) {
        return Observable.throw(error);
    }
}