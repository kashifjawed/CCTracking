/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./BusTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./BusView");
import dto = require("../../Dtos/BusDto");
import DAL = require("../../DAL/Bus");

export class BusCtrl extends helper.Controller {
    app: any;
    busViewModel: views.BusViewModel;
    busView: views.BusView;
    backboneModel: Backbone.Model;
    collection: dto.Models.BusCollection;
    collectionView: views.BusCollectionView;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.BusDto();
        this.busViewModel = new views.BusViewModel(this.backboneModel, this);
        this.busView = new views.BusView({ viewModel: this.busViewModel });
        //this.busView.on("SaveBus", () => this.Save(this.busView.model));        
        this.collection = new dto.Models.BusCollection({});
        this.collectionView = new views.BusCollectionView({ collection: this.collection });
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
        //var model = new dto.Models.BusDto();
        var model = this.backboneModel;
        this.busViewModel.bbModel = model;
        this.busViewModel.model = kb.viewModel(model);
        // debugger;
        model.set("trackingDeviceId", "");
        model.set("vehicleNo", "");
        model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
        model.set("alkhidmatCentreSelected", "");
        model.set("busModelList", lookupResponse.busModel);
        model.set("busModelSelected", "");
        model.set("no", "");
        model.set("description", "");
        model.set("isActive", "1");

        this.busViewModel = new views.BusViewModel(model, this);
        this.busView = new views.BusView({ viewModel: this.busViewModel });
        this.busView.on("SaveBus", () => this.Save(this.busViewModel.bbModel));

        this.busView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.busView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(busDto: dto.Models.BusDto) {
        //alert("GetByIdCompleted..");

        this.backboneModel = new Backbone.Model(busDto["busModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.busView = new views.BusView({ viewModel: this.busViewModel });
        this.busView.on("SaveBus", () => this.Save(this.busViewModel.bbModel));
        this.busView.on("CancelForm", () => this.Cancel());
        //this.busView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.busView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(bus: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        bus.set("modifiedBy", appObj.get("Id"));
        bus.set("centreId", bus.get("alkhidmatCentreSelected").id);
        bus.set("modelNo", bus.get("busModelSelected").id);
        bus.set("isActive", bus.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(bus);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(bus: dto.Models.BusDto) {
        //app = application.Application.getInstance();
        //  debugger;
        this.collection.reset(bus["busList"]);
        this.collectionView = new views.BusCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(busDto: dto.Models.BusDto) {
        this.backboneModel = new Backbone.Model(busDto);
        var model = this.backboneModel;
        //console.log(loginResponse);        
        if (busDto == undefined) {
            // alert("Bus Detail have not been saved successfully!");
            helper.ShowModalPopup("danger", "Bus", "Bus Details have not been saved successfully!");
        }
        else {
            //alert("Record has been saved successfully with Bus ID : " + busDto["id"]);
            helper.ShowModalPopup("success", "Bus", "Record has been saved successfully with Bus ID : " + busDto["id"]);
            //this.UIBinding(model);
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewAdminBus";
    }

    UIBinding(model: any) {
        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

        model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
        var centre = _.filter(lookupResponse.alkhidmatCentre, (p) => { return p.id == model.get("centreId"); });
        model.set("alkhidmatCentreSelected", centre[0]);

        model.set("busModelList", lookupResponse.busModel);
        var modelNo = _.filter(lookupResponse.busModel, (p) => { return p.id == model.get("modelNo"); });
        model.set("busModelSelected", modelNo[0]);

        model.set("isActive", model.get("isActive") ? "1" : "0");

        this.busViewModel.bbModel = model;
        this.busViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.busView.el)[0]);
        ko.applyBindings(this.busViewModel, this.busView.el);

        //this.busView = new views.BusView({ viewModel: this.busViewModel });
        //this.busView.on("SaveBus", () => this.Save(this.busViewModel.bbModel));
    }


}
