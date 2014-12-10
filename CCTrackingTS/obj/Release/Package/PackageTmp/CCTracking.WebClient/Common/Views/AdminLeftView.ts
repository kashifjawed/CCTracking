/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="text!../Templates/AdminLeft.html"/>
/// <amd-dependency path="marionette"/>

//var Marionette = require("marionette");
var templateView = require("text!../Templates/AdminLeft.html");
export class AdminLeftItemView extends Marionette.ItemView {
    constructor(options?: any) {
        //if (!options)
        //    options = {};
        this.template = templateView;
        super(options);
    }
}
//aaa