import {LoadingIndicator} from "nativescript-loading-indicator";

export class LoadingIndicatorHelper {
    static loader: LoadingIndicator;
    static options;

    constructor() {
        LoadingIndicatorHelper.loader = new LoadingIndicator();
        LoadingIndicatorHelper.options = {
            message: 'Loading...',
            progress: 0.65,
            android: {
                indeterminate: true,
                cancelable: true,
                cancelListener: function(dialog) { console.log("Loading cancelled") },
                max: 100,
                progressNumberFormat: "%1d/%2d",
                progressPercentFormat: 0.53,
                progressStyle: 1,
                secondaryProgress: 1
            },
            ios: {
                details: "Additional detail note!",
                margin: 10,
                dimBackground: true,
                color: "#4B9ED6", // color of indicator and labels
                // background box around indicator
                // hideBezel will override this if true
                backgroundColor: "yellow",
                hideBezel: true, // default false, can hide the surrounding bezel
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