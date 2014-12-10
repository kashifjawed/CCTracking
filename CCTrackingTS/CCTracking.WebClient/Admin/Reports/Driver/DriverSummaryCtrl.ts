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
import views = require("./DriverSummaryView");
import dto = require("../../../Dtos/DriverDto");
import DAL = require("../../../DAL/Driver");

export class DriverSummaryCtrl extends helper.Controller {
    app: any;
    backboneModel: Backbone.Model;
    backboneCollection: Backbone.Collection;
    collectionView: views.DriverSummaryCollectionView;
    compositeModel: Backbone.Model;
    constructor() {
        super();
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.DriverSummaryDto();
        this.compositeModel = new Backbone.Model();
        this.backboneCollection = new Backbone.Collection([]);
        this.collectionView = new views.DriverSummaryCollectionView({ collection: this.backboneCollection });
        this.backboneCollection.reset([]);
    }

    Show() {
        var deferred = DAL.GetAllSummary();
        deferred.done(p=> this.GetDrvierSummaryCompleted(p));
        this.app.MainRegion.show(this.collectionView);
        this.collectionView.listenTo(this.collectionView, "itemview:DriverSummaryDetail", (view, id) => this.GetDriverDetial(id));

    }

    GetDriverDetial(id: number) {
        var deferred = DAL.GetAllDetail(id);
        deferred.done(p => this.GetDriverDetailCompleted(p));
        //history.pushState(id,'title' + id);
    }

    GetDriverDetailCompleted(driverDetailDto: dto.Models.DriverSummaryCollection) {
        var result = driverDetailDto["driverList"];
        var summary = [];
        for (var i = 0; i < result.length; i++) {
            summary[i] = { driverName: result[i].driverName, vehicleNo: result[i].vehicleNo, visitDate: helper.FormatDateString(result[i].visitDate), visitInterval: result[i].visitInterval, bookingId: result[i].bookingId };
        }
        var bbCollection = new Backbone.Collection([]);
        var detailView = new views.DriverDetailCollectionView({ collection: bbCollection});
        this.app.MainRegion.show(detailView);
        bbCollection.reset(summary);
        location.href = "#driverDetail";
        
    }

    GetDrvierSummaryCompleted(driverSummaryDto: dto.Models.DriverSummaryCollection) {
        //TODO:Hack - need rework
        var result = driverSummaryDto["driverList"];
        var summary = [];
        for (var i = 0; i < result.length; i++) {
            summary[i] = { driverId: result[i].driverId, driverName: result[i].driverName, milage: result[i].milage, visitCount: result[i].visitCount };
        }
        this.backboneCollection.reset(summary);
        //history.pushState(result[0].driverId, 'title' + result[0].driverId);
    }

    Cancel() {
        window.location.href = "#driverSummary";
    }
}