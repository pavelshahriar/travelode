import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/concatMap";
import * as util from "util";

import * as Config from "../../config/config.json";
import {LoginCredential} from "../models/login-credential";
import {User} from "../models/user";
import {RequestHelper} from "../helpers/request-helper";
import {Media} from "../models/media";
import {UserPojo} from "../models/user-pojo";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    login(lc: LoginCredential) {
        const url = Config.apiUrl + "user/login";
        const body = JSON.stringify(lc);
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'POST', body);

        return this.http.post(url, body, {headers: headers});
    }

    singup(lc: LoginCredential) {
        const url = Config.apiUrl + "user";
        const body = JSON.stringify(lc);
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'POST', body);

        return this.http.post(url, body, {headers: headers, observe: "response"});
    }

    getOneById(id: number): Observable<UserPojo> {
        const url = Config.apiUrl + "user/" + id;
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(url, 'GET');

        return this.http.get(url, {headers: headers})
            .map((res: Array<User>) => res[0])
            .concatMap((user: User) => this.getUserPojo(user));
    }

    private getUserPojo(u: User): Observable<UserPojo> {
        if (!u.photo) {
            return Observable.of(new UserPojo(u));
        }
        const mediaUrl = Config.apiUrl + 'media/' + u.photo;
        const headers = RequestHelper.getRequestHeader();
        RequestHelper.logRequest(mediaUrl, 'GET');

        return this.http.get(mediaUrl, {headers: headers})
            .map((res: Array<Media>) => res[0])
            .map((m: Media) => new UserPojo(u, m));
    }
}