/// <reference path="../Scripts/typings/require/require.d.ts" />
// Set the require.js configuration
require.config({
    enforceDefine: false,
    //By default load  any module IDs from js/lib
    baseUrl: './',
    //urlArgs: "bust=" + "V3",
    // If no baseUrl is explicitly set in the configuration, the default value
    // will be the location of the HTML page that loads require.js.
    // If a data-main attribute is used, that path will become the baseUrl.
    // Path mappings for module names not found directly under baseUrl.
    // The path settings are assumed to be relative to baseUrl, unless the paths
    // setting starts with a "/" or has a URL protocol in it ("like http:").
    // In those cases, the path is determined relative to baseUrl.
    paths: {
        // JavaScript folders
        // Libraries
        jquery: "Scripts/jquery-2.1.1",
        jqueryUI: "Scripts/jquery-ui",
        underscore: "Scripts/underscore",
        backbone: "Scripts/backbone",
        //router: "Vendor/gladstone/backbonerouter",
        marionette: "Scripts/backbone.marionette",
        bootstrap: "Scripts/bootstrap",
        bootstrapPopover: "Scripts/bootstrap-popover",
        bootstrapTooltip: "Scripts/bootstrap-tooltip",
        //datepicker: "Scripts/bootstrap-datepicker",
        knockout: "Scripts/knockout-3.1.0",
        //knockoutvalidation: "Scripts/knockout.validation",
        knockback: "Scripts/knockback.min",
        //bindings: "Vendor/Gladstone/KnockoutBindings",
        // Require plugins
        text: "Scripts/text",
        datatables: "Scripts/DataTables/jquery.dataTables",
        datatablesBootstrap: "Scripts/DataTables/dataTables.bootstrap",
        jqueryValidate: "Scripts/jquery.validate",
        jqueryUnobtrusive: "Scripts/jquery.validate.unobtrusive",
        jqueryUnobtrusiveAjax: "Scripts/jquery.unobtrusive-ajax",
        //knockoutJqueryuiUtils: 'Scripts/KnockoutJqueryUI/utils',
        //knockoutJqueryuiHandler: 'Scripts/KnockoutJqueryUI/bindingHandler',
        knockoutJqueryuiDatepicker: 'Scripts/KnockoutJqueryUI/datepicker'
    },
    // Configure the dependencies and exports for older, traditional "browser globals"
    // scripts that do not use define() to declare the dependencies and set a module value.
    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            // These script dependencies should be loaded before loading backbone.js
            deps: ["underscore", "jquery"],
            // Once loaded, use the global "Backbone" as the module value.
            exports: "Backbone"
        },
        "marionette": {
            deps: ["underscore", "jquery", "backbone"],
            exports: "Marionette"
        },
        //"router": ["underscore", "jquery"],
        "bootstrap": ["jquery"],
        "bootstrapPopover": ["jquery", "bootstrap"],
        "bootstrapTooltip": ["jquery", "bootstrap"],
        //"datepicker": ["jquery", "bootstrap"],
        "knockout": {
            exports: "ko"
        },
        "knockback": {
            deps: ["knockout"],
            exports: "kb"
        },
        "datatablesBootstrap": {
            deps: ["datatables"]
        },
        //"knockoutvalidation": {
        //    deps: ["knockout"]
        //},
        //"jquery-ui": ["jquery","bootstrap"],
        "jqueryUI": ["jquery"],
        "jqueryValidate": ["jquery"],
        "jqueryUnobtrusive": ["jquery", "jqueryValidate"],
        "jqueryUnobtrusiveAjax": ["jquery"],
        "knockoutJqueryuiDatepicker": {
            depts: ["jquery", "knockout", "jqueryUI"]
        }
    }
});

require([
    "jquery",
    "backbone",
    "underscore",
    "marionette",
    "bootstrap",
    "jqueryUI",
    "knockoutJqueryuiDatepicker",
    "CCTracking.WebClient/App"
], //function ($, Backbone, _, Marionette) {
//    //console.log('ddddd');
//}
function () {
});
//aaa
//# sourceMappingURL=Main.js.map
