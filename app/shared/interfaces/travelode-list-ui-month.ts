import {TravelodeListUiDate} from "./travelode-list-ui-date";

export interface TravelodesUiMonth {
    month: number;
    monthName : string
    travelodesByDate: Array<TravelodeListUiDate>;
}

