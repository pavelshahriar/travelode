import * as moment from "moment";
import * as lodash from "lodash";

import {Travelode} from "~/shared/models/travelode";
import {TravelodeMediaPojo} from "~/shared/models/travelode-media-pojo";
import {TravelodeDetailsUi} from "~/shared/interfaces/travelode-details-ui";

export class TravelodeDetailsUiHelper {
    public getTravelodeDetailsUi(tr: Travelode, trmpjs: Array<TravelodeMediaPojo>): TravelodeDetailsUi {

        let trmpjByDate = lodash.orderBy(trmpjs, ['displayDate'], ['desc']);
        trmpjs = trmpjByDate;


        let trDUi: TravelodeDetailsUi = {travelodeId: tr.id, travelodeTitle: tr.title, travelodeDays: []};
        trmpjs.forEach(trmpj => {
            let dDate = moment(trmpj.displayDate).format('MMM DD,YYYY');
            let dTime = moment(trmpj.displayDate).format('hh:mm A');

            if (!trDUi.travelodeDays.find(e=>e.date === dDate)){
                trDUi.travelodeDays.push(
                    {
                        date: dDate, travelodeMediaUnits: []
                    });
            }

            trDUi
                .travelodeDays.find(e=>e.date ===dDate)
                .travelodeMediaUnits.push(
                    {
                        time: dTime,
                        mediaTitle: trmpj.title,
                        mediaCaption: trmpj.caption,
                        mediaUrl: trmpj.media.url
                    });

        });

        return trDUi;
    }
}