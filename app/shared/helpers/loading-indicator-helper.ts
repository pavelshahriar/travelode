import {LoadingIndicator, Mode} from "nativescript-loading-indicator";

declare var android: any;

export class LoadingIndicatorHelper {
    static loader: LoadingIndicator;
    static options;

    constructor() {
        LoadingIndicatorHelper.loader = new LoadingIndicator();
        LoadingIndicatorHelper.options = {
            message: 'Working on it...',
            progress: 0.65,
            android: {
                details: "Just travelling around!",
                margin: 10,
                dimBackground: true,
                color: "#fa9646",
                userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
                hideBezel: true, // default false, can hide the surrounding bezel
                mode: Mode.AnnularDeterminate ,// see options below
                indeterminate: true,
                cancelable: true,
                cancelListener: function(dialog) { console.log("Loading cancelled") },
            },
            ios: {
                details: "Just travelling around!",
                margin: 10,
                dimBackground: true,
                color: "#fa9646",
                userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
                hideBezel: true, // default false, can hide the surrounding bezel
                mode:  null// see iOS specific options below
            }
        }
    }

    public static showLoader() {
        LoadingIndicatorHelper.loader.show(LoadingIndicatorHelper.options);
    }

    public static hideLoader() {
        LoadingIndicatorHelper.loader.hide();
    }
}