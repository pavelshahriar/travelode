import {TravelodeDetailsUiDay} from "~/shared/interfaces/travelode-details-ui-day";

export interface TravelodeDetailsUi {
    travelodeId: number;
    travelodeTitle: string;
    travelodeDays: Array<TravelodeDetailsUiDay>
}