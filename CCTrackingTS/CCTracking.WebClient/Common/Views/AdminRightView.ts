/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="text!CCTracking.WebClient/Common/Templates/AdminRight.html"/>
/// <amd-dependency path="marionette"/>

//var Marionette = require("marionette");
var templateView = require("text!CCTracking.WebClient/Common/Templates/AdminRight.html");


export class AdminRightItemView extends Marionette.ItemView {
    constructor(options?: any) {

        if (!options)
            options = {};
        options.template = templateView;
        super(options);
    }
}
//aaa