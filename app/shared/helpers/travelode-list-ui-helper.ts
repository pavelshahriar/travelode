import * as moment from "moment";
import * as lodash from "lodash";
import {Travelode} from "../models/travelode";
import {TravelodeListUi} from "../interfaces/travelode-list-ui";

export class TravelodeListUiHelper {
    public getTravelodeListUi(trl: Array<Travelode>) : TravelodeListUi {
        let trui: TravelodeListUi = {travelodesByYear: []};

        // sort
        trl = lodash.orderBy(trl, ['created'], ['desc']);

        // construct
        trl.forEach(travelode => {
            let trMY = moment(travelode.created).year();
            let trMm = moment(travelode.created).month();
            let trMM = moment(travelode.created).format('MMMM');
            let trMd = moment(travelode.created).date();

            // if the list doesn't have this year, create one
            let truiY = trui.travelodesByYear;
            if(!truiY.find(e => e.year === trMY)) {
                truiY.push({year: trMY, travelodesByMonth: []})
            }

            // if the list doesn't have this month, create one
            let truiM = trui.travelodesByYear.find(e=> e.year === trMY).travelodesByMonth;
            if(!truiM.find(e => e.month === trMm)) {
                truiM.push({month: trMm, monthName: trMM, travelodesByDate: []})
            }

            // if the list doesn't have this date, create one
            let truiD = truiM.find(e=> e.month === trMm).travelodesByDate;
            if(!truiD.find(e => e.day === trMd)) {
                truiD.push({day: trMd, travelodes: []})
            }

            truiD.find(e => e.day === trMd).travelodes.push(travelode);
        });

        return trui;
    }
}