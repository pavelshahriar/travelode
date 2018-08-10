import * as moment from "moment";
import {TravelodeDetailsUiMedia} from "./travelode-details-ui-media";

export interface TravelodeDetailsUiDay {
    date: string;
    travelodeMediaUnits: Array<TravelodeDetailsUiMedia>
}