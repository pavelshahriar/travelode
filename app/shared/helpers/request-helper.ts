import * as util from "util";
import {HttpHeaders} from "@angular/common/http";

export class RequestHelper {

    public static logRequest(url:string, protocol:string, body ?:any) {
        console.log(protocol.toUpperCase() + " => " + url);
        if (body){
            console.log("With body => ");
            console.log(util.inspect(body, null, false));
        }
    }

    public static getRequestHeader() {
        return new HttpHeaders({
            "Content-Type": "application/json"
        });
    }
}