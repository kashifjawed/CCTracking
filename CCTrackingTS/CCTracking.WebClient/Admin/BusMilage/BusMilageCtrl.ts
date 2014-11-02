/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>

var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./BusMilageView");
import dto = require("../../Dtos/BusMilageDto");
import DAL = require("../../DAL/BusMilage");

export class BusMilageCtrl extends helper.Controller {
    app: any;
    viewModel: views.BusMilageViewModel;
    view: views.BusMilageView;
    backboneModel: Backbone.Model;
    collection: dto.Models.BusMilageCollection;
    collectionView: views.BusMilageCollectionView;
    compositeModel: Backbone.Model;

    constructor() {
        super();
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.BusMilageDto();
        this.viewModel = new views.BusMilageViewModel(this.backboneModel, this);
        this.collection = new dto.Models.BusMilageCollection({ id: "", vehicleNo: "", centreDesc: "", totalMilage: "", totalVisits: "" });
        this.collectionView = new views.BusMilageCollectionView({ collection: this.collection });
        this.compositeModel = new Backbone.Model();
    }

    SimpleLoad() {
       var model = this.backboneModel;
       
        model.set("fromVisitDate", helper.FormatDateString( Date.now()));
        model.set("toVisitDate", helper.FormatDateString(Date.now()));
        this.compositeModel = model;

        this.collectionView.model = this.compositeModel;
        this.collectionView.listenTo(this.collectionView, "Event:BusMilage", () => this.BusMilage(model));
        this.app.MainRegion.show(this.collectionView);
        
        var vm = kb.viewModel(this.compositeModel);
       
        var fromVisitDate = $('#txtFromVisitDate')[0];
        ko.cleanNode(fromVisitDate);
        ko.applyBindings(vm, fromVisitDate);

        var toVisitDate = $('#txtToVisitDate')[0];
        ko.cleanNode(toVisitDate);
        ko.applyBindings(vm, toVisitDate);
    }

    BusMilage(busMilageDto: any) {
        
        var deferred = DAL.GetByCriteria(busMilageDto);
        deferred.done(p=> this.GetByCriteriaCompleted(p));
    }
    
    GetByCriteriaCompleted(model: dto.Models.BusMilageDto) {
       // debugger;
        this.collection.reset(model["busMilageList"]);
    }

    Cancel() {
        window.location.href = "#viewBusMilage";
    }

    UIBinding(model: any) {
        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
        model.set("landmarkList", lookupResponse.landmark);
        var landmark = _.filter(lookupResponse.landmark, (p) => { return p.id == model.get("landmarkId"); });
        model.set("landmarkIdSelected", landmark[0]);
        
        this.viewModel.bbModel = model;
    }

}