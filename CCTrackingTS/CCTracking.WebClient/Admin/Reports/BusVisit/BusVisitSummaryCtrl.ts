/// <reference path="../../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>


var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../../App");
import helper = require("../../../Helper");
import views = require("./BusVisitSummaryView");
import dto = require("../../../Dtos/BusVisitDto");
import DAL = require("../../../DAL/BusVisit");

export class BusVisitSummaryCtrl extends helper.Controller {
    app: any;
    backboneModel: Backbone.Model;
    backboneCollection: Backbone.Collection;
    collectionView: views.BusVisitSummaryCollectionView;
    compositeModel: Backbone.Model;
    isBusVisit:boolean;
    constructor() {
        super();
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.BusVisitSummaryDto();
        this.compositeModel = new Backbone.Model();
        this.backboneCollection = new Backbone.Collection([]);
        this.collectionView = new views.BusVisitSummaryCollectionView({ collection: this.backboneCollection, model: new Backbone.Model({ title1: "" }) });
        this.backboneCollection.reset([]);
    }

    ShowVisit() {
        this.isBusVisit = true;
        var deferred = DAL.GetAllSummary();
        deferred.done(p=> this.GetBusVisitSummaryCompleted(p));
        this.collectionView.model = new Backbone.Model({ title1: "Visit" });
        this.app.MainRegion.show(this.collectionView);
        this.collectionView.listenTo(this.collectionView, "itemview:BusVisitSummaryDetail", (view, id) => this.GetBusVisitDetial(id));

    }
    ShowMilage() {
        this.isBusVisit = false;
        var deferred = DAL.GetAllMilageSummary();
        deferred.done(p=> this.GetBusVisitSummaryCompleted(p));
        this.collectionView.model = new Backbone.Model({ title1: "Milage" });
        this.app.MainRegion.show(this.collectionView);
        this.collectionView.listenTo(this.collectionView, "itemview:BusVisitSummaryDetail", (view, id) => this.GetBusVisitMilageDetial(id));

    }

    GetBusVisitDetial(id: number) {
        var deferred = DAL.GetAllDetail(id);
        deferred.done(p => this.GetBusVisitDetailCompleted(p));
        //history.pushState(id,'title' + id);
    }

    GetBusVisitMilageDetial(id: number) {
        var deferred = DAL.GetAllMilageDetail(id);
        deferred.done(p => this.GetBusVisitDetailCompleted(p));
        //history.pushState(id,'title' + id);
    }

    GetBusVisitDetailCompleted(busVisitDetailDto: dto.Models.BusVisitSummaryCollection) {
        var result = busVisitDetailDto["busVisitList"];
        var summary = [];
        for (var i = 0; i < result.length; i++) {
            summary[i] = { driverDesc: result[i].driverDesc, centreDesc: result[i].centreDesc, vehicleNo: result[i].vehicleNo, visitDate: helper.FormatDateString(result[i].visitDate), visitInterval: result[i].visitInterval, bookingId: result[i].bookingId, milage: result[i].milage };
        }
        var bbCollection = new Backbone.Collection([]);
        var detailView = new views.BusVisitDetailCollectionView({ collection: bbCollection});
        this.app.MainRegion.show(detailView);
        bbCollection.reset(summary);
        if (this.isBusVisit) {
            location.href = "#busVisitDetail";
        } else {
            location.href = "#busVisitMilageDetail";
        }


    }

    GetBusVisitSummaryCompleted(busVisitSummaryDto: dto.Models.BusVisitSummaryCollection) {
        //TODO:Hack - need rework
        var result = busVisitSummaryDto["busVisitList"];
        var summary = [];
        for (var i = 0; i < result.length; i++) {
            summary[i] = { busId: result[i].busId, driverDesc: result[i].driverDesc, milage: result[i].milage, visitCount: result[i].visitCount, vehicleNo: result[i].vehicleNo };
        }
        this.backboneCollection.reset(summary);
        //history.pushState(result[0].driverId, 'title' + result[0].driverId);
    }

    Cancel() {
        if (this.isBusVisit) {
            location.href = "#busVisitSummary";
        } else {
            location.href = "#busVisitMilageSummary";
        }
    }
}