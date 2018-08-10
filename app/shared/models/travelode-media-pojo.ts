import {Media} from "./media";
import {TravelodeMedia} from "./travelode-media";
import {Travelode} from "./travelode";

export class TravelodeMediaPojo {
    id: number;
    travelode: Travelode;
    media: Media;
    rollNo: number;
    privacy: number;
    title: string;
    caption ?: string;
    displayDate: string;
    displayLocationId ?: number;
    isCover: boolean;

    constructor(trm: TravelodeMedia, tr: Travelode, m: Media) {
        this.id = trm.id;
        this.travelode = tr;
        this.media = m;
        this.rollNo = trm.rollNo;
        this.privacy = trm.privacy;
        this.title = trm.title;
        this.caption = trm.caption;
        this.displayDate = trm.displayDate;
        this.displayLocationId = trm.displayLocationId;
        this.isCover = trm.isCover;
    }

    deconstruct(trmp: TravelodeMediaPojo) : TravelodeMedia {
        let returnTravelodMedia = new TravelodeMedia();
        returnTravelodMedia.id = trmp.id;
        returnTravelodMedia.travelodeId = trmp.travelode.id;
        returnTravelodMedia.mediaId = trmp.media.id;
        returnTravelodMedia.rollNo = trmp.rollNo;
        returnTravelodMedia.privacy = trmp.privacy;
        returnTravelodMedia.title = trmp.title;
        returnTravelodMedia.displayDate = trmp.displayDate;
        returnTravelodMedia.isCover = trmp.isCover;

        returnTravelodMedia.caption = (trmp.caption) ? trmp.caption : '';
        returnTravelodMedia.displayLocationId = (trmp.displayLocationId) ? trmp.displayLocationId : 0;

        return returnTravelodMedia;
    }
}