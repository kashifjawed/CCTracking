/// <reference path="../../../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>


var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../../../App");
import helper = require("../../../../Helper");
import views = require("./AuditBookingView");
import dto = require("../../../../Dtos/BookingDto");
import DAL = require("../../../../DAL/Booking");

export class AuditBookingCtrl extends helper.Controller {
    app: any;
    backboneModel: Backbone.Model;
    backboneCollection: Backbone.Collection;
    collectionView: views.AuditBookingCollectionView;
    compositeModel: Backbone.Model;
    constructor() {
        super();
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.AuditBooking();
        this.compositeModel = new Backbone.Model();
        this.backboneCollection = new Backbone.Collection([]);
        this.collectionView = new views.AuditBookingCollectionView({ collection: this.backboneCollection });
        this.backboneCollection.reset([]);
    }

    Show() {
        var model = this.backboneModel;
        model.set("fromDate", helper.FormatDateString(Date.now()));
        model.set("toDate", helper.FormatDateString(Date.now()));
        this.compositeModel = model;
        this.collectionView.model = model;

        //var deferred = DAL.GetAllAuditBooking(null);
        //deferred.done(p=> this.AuditBookingCompleted(p));
        this.app.MainRegion.show(this.collectionView);
        this.collectionView.listenTo(this.collectionView, "Event:AuditBooking", (auditRequest) => this.GetAuditBookingDetial(auditRequest));

        var vm = kb.viewModel(this.compositeModel);

        var fromDate = $('#txtFromDate')[0];
        ko.cleanNode(fromDate);
        ko.applyBindings(vm, fromDate);

        var toDate = $('#txtToDate')[0];
        ko.cleanNode(toDate);
        ko.applyBindings(vm, toDate);

    }

    GetAuditBookingDetial(auditRequest: any) {
        var request = new Backbone.Model(auditRequest);
        if (request.get("fromDate") == "" || request.get("toDate") == "") {
            helper.ShowModalPopup("danger", "Audit Booking", "Please enter valid search criteria");
            return;
        }
        var deferred = DAL.GetAllAuditBooking(request);
        deferred.done(p=> this.AuditBookingCompleted(p));
    }
    AuditBookingCompleted(auditDto: dto.Models.AuditBookingResponseCollection) {
        //TODO:Hack - need rework
        var result = auditDto["auditBookingDisplayList"];
        var summary = [];
        for (var i = 0; i < result.length; i++) {
            summary[i] = { bookingId: result[i].bookingId, userName: result[i].userName, propertyName: result[i].propertyName, oldValue: result[i].oldValue, newValue: result[i].newValue, actualModifiedDate: helper.FormatDateString(result[i].actualModifiedDate), rowCounter: result[i].rowCounter };
        }
        this.backboneCollection.reset(summary);
    }

}