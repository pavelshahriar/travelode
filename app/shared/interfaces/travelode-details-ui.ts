import {TravelodeDetailsUiDay} from "./travelode-details-ui-day";

export interface TravelodeDetailsUi {
    travelodeId: number;
    travelodeTitle: string;
    travelodeDays: Array<TravelodeDetailsUiDay>
}