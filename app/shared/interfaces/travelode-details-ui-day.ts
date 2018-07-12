import * as moment from "moment";
import {TravelodeDetailsUiMedia} from "~/shared/interfaces/travelode-details-ui-media";

export interface TravelodeDetailsUiDay {
    date: string;
    travelodeMediaUnits: Array<TravelodeDetailsUiMedia>
}