import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import * as util from "util";

import * as Config from "../../config/config.json";
import { User } from "../models/user";
import { LoginCredential } from "../models/login-credential";

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  login(lc: LoginCredential) : Observable<Array<User>>{
    console.log(util.inspect(lc, false, null));
    console.log(util.inspect(Config, false, null));
    return this.http.post(
        Config.apiUrl + "user/login",
        JSON.stringify(lc),
        {headers: this.getCommonHeaders()}
    )
        .map(response => response.json())
        .catch(this.handleErrors);
  }

  singup(lc: LoginCredential) {
    return this.http.post(
        Config.apiUrl + "user",
        JSON.stringify(lc),
        { headers: this.getCommonHeaders() }
    );
  }

    getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", Config.authHeader);
    return headers;
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}