require.config({
    enforceDefine: false,
    baseUrl: './',
    paths: {
        jquery: "Scripts/jquery-2.1.1",
        jqueryUI: "Scripts/jquery-ui",
        underscore: "Scripts/underscore",
        backbone: "Scripts/backbone",
        marionette: "Scripts/backbone.marionette",
        bootstrap: "Scripts/bootstrap",
        bootstrapPopover: "Scripts/bootstrap-popover",
        bootstrapTooltip: "Scripts/bootstrap-tooltip",
        knockout: "Scripts/knockout-3.1.0",
        knockback: "Scripts/knockback.min",
        text: "Scripts/text",
        datatables: "Scripts/DataTables/jquery.dataTables",
        datatablesBootstrap: "Scripts/DataTables/dataTables.bootstrap",
        jqueryValidate: "Scripts/jquery.validate",
        jqueryUnobtrusive: "Scripts/jquery.validate.unobtrusive",
        jqueryUnobtrusiveAjax: "Scripts/jquery.unobtrusive-ajax",
        knockoutJqueryuiDatepicker: 'Scripts/KnockoutJqueryUI/datepicker'
    },
    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        "marionette": {
            deps: ["underscore", "jquery", "backbone"],
            exports: "Marionette"
        },
        "bootstrap": ["jquery"],
        "bootstrapPopover": ["jquery", "bootstrap"],
        "bootstrapTooltip": ["jquery", "bootstrap"],
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
], function () {
});
