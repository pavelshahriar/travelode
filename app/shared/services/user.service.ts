import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders } from "@angular/common/http";

import * as Config from "../../config/config.json";
import {LoginCredential} from "../models/login-credential";
import * as util from "util";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    login(lc: LoginCredential) {
        // console.log(util.inspect(lc, false, null));
        // console.log(util.inspect(Config, false, null));

        const url = Config.apiUrl + "user/login";
        const body = JSON.stringify(lc);
        const headers = this.createRequestHeader();

        return this.http.post(url, body, {headers: headers});
    }

    singup(lc: LoginCredential) {
        // console.log(util.inspect(lc, false, null));
        // console.log(util.inspect(Config, false, null));

        const url = Config.apiUrl + "user";
        const body = JSON.stringify(lc);
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