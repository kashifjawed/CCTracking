/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./AlkhidmatCentreTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./AlkhidmatCentreView");
import dto = require("../../Dtos/AlkhidmatCentreDto");
import DAL = require("../../DAL/AlkhidmatCentre");

export class StationCtrl extends helper.Controller {
    app: any;
    stationViewModel: views.StationViewModel;
    stationView: views.StationView;
    backboneModel: Backbone.Model;
    collection: dto.Models.StationCollection;
    collectionView: views.StationCollectionView;

    constructor() {        
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.StationDto()
        this.stationViewModel = new views.StationViewModel(this.backboneModel, this);
        this.stationView = new views.StationView({ viewModel: this.stationViewModel });
        //this.stationView.on("SaveAlkhidmatCentre", () => this.Save(this.stationView.model));        
        this.collection = new dto.Models.StationCollection({});
        this.collectionView = new views.StationCollectionView({ collection: this.collection });
        //this.events.listento

    }

    Show() {
        var url = window.location.href;
        if (url.indexOf("id=") > -1) {
            //alert(url.substring(url.indexOf("id=") + 3, url.length));
            var id = (url.substring(url.indexOf("id=") + 3, url.length));
            var deferredById = DAL.GetById(id);
            deferredById.done(p=> this.GetByIdCompleted(p));
        }
        else {
            this.Load();
        }
    }

    Load() {

        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
        //var model = new dto.Models.StationDto();
        var model = this.backboneModel;
        this.stationViewModel.bbModel = model;
        this.stationViewModel.model = kb.viewModel(model);

        model.set("name", "");
        model.set("address", "");
        model.set("landmarkIdSelected", "");
        model.set("landmarkList", lookupResponse.landmark);
        model.set("contactNo1", "");
        model.set("contactNo2", "");
        model.set("isCoPartner", "");
        model.set("isActive", "");

        this.stationViewModel = new views.StationViewModel(model, this);
        this.stationView = new views.StationView({ viewModel: this.stationViewModel });
        this.stationView.on("SaveAlkhidmatCentre", () => this.Save(this.stationViewModel.bbModel));

        this.stationView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.stationView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(stationDto: dto.Models.StationDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(stationDto["centreModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.stationView = new views.StationView({ viewModel: this.stationViewModel });
        this.stationView.on("SaveAlkhidmatCentre", () => this.Save(this.stationViewModel.bbModel));
        this.stationView.on("CancelForm", () => this.Cancel());
        //this.stationView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.stationView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(station: any) {
        var appObj = this.app.request("AppGlobalSetting");
        station.set("modifiedBy", appObj.get("Id"));
        station.set("landmarkId", station.get("landmarkIdSelected").id);
        station.set("isActive", station.get("isActive") == "1" ? true : false);
        station.set("isCoPartner", station.get("isCoPartner") == "1" ? true : false);
        var deferred = DAL.Save(station);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(station: dto.Models.StationDto) {
        //app = application.Application.getInstance();
        this.collection.reset(station["centreList"]);
        this.collectionView = new views.StationCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(stationDto: dto.Models.StationDto) {
        var result = new Backbone.Model(stationDto);
        if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {            
            helper.ShowModalPopup("danger", "Alkhidmat Centre", "Due to some technical reason Alkhidmat Centre have not been saved successfully!<br> Pelase try later");
        }
        else {
            helper.ShowModalPopup("success", "Alkhidmat Centre", "Record has been saved successfully with Alkhidmat Centre ID : " + stationDto["id"]);
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewAlkhidmatCentre";
    }

    UIBinding(model: any) {
        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
        model.set("landmarkList", lookupResponse.landmark);
        var landmark = _.filter(lookupResponse.landmark, (p) => { return p.id == model.get("landmarkId"); });
        model.set("landmarkIdSelected", landmark[0]);
        model.set("isActive", model.get("isActive") ? "1" : "0");
        model.set("isCoPartner", model.get("isCoPartner") ? "1" : "0");

        this.stationViewModel.bbModel = model;
        this.stationViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.stationView.el)[0]);
        ko.applyBindings(this.stationViewModel, this.stationView.el);

        //this.stationView = new views.StationView({ viewModel: this.stationViewModel });
        //this.stationView.on("SaveAlkhidmatCentre", () => this.Save(this.stationViewModel.bbModel));
    }

    
}
