import {Media} from "../../shared/models/media";
import {TravelodeMedia} from "../../shared/models/travelode-media";
import {Travelode} from "../../shared/models/travelode";

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
}