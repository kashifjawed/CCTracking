/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./TrackingDeviceTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./TrackingDeviceView");
import dto = require("../../Dtos/TrackingDeviceDto");
import DAL = require("../../DAL/TrackingDevice");

export class TrackingDeviceCtrl extends helper.Controller {
    app: any;
    trackingDeviceViewModel: views.TrackingDeviceViewModel;
    trackingDeviceView: views.TrackingDeviceView;
    backboneModel: Backbone.Model;
    collection: dto.Models.TrackingDeviceCollection;
    collectionView: views.TrackingDeviceCollectionView;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.TrackingDeviceDto();
        this.trackingDeviceViewModel = new views.TrackingDeviceViewModel(this.backboneModel, this);
        this.trackingDeviceView = new views.TrackingDeviceView({ viewModel: this.trackingDeviceViewModel });
        //this.trackingDeviceView.on("SaveTrackingDevice", () => this.Save(this.trackingDeviceView.model));        
        this.collection = new dto.Models.TrackingDeviceCollection({});
        this.collectionView = new views.TrackingDeviceCollectionView({ collection: this.collection });
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

        
        var model = this.backboneModel;
        this.trackingDeviceViewModel.bbModel = model;
        this.trackingDeviceViewModel.model = kb.viewModel(model);
        // debugger;
        model.set("trackingNo", "");
        model.set("isActive", "");

        this.trackingDeviceViewModel = new views.TrackingDeviceViewModel(model, this);
        this.trackingDeviceView = new views.TrackingDeviceView({ viewModel: this.trackingDeviceViewModel });
        this.trackingDeviceView.on("SaveTrackingDevice", () => this.Save(this.trackingDeviceViewModel.bbModel));

        this.trackingDeviceView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.trackingDeviceView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(trackingDeviceDto: dto.Models.TrackingDeviceDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(trackingDeviceDto["trackingDeviceModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.trackingDeviceView = new views.TrackingDeviceView({ viewModel: this.trackingDeviceViewModel });
        this.trackingDeviceView.on("SaveTrackingDevice", () => this.Save(this.trackingDeviceViewModel.bbModel));
        this.trackingDeviceView.on("CancelForm", () => this.Cancel());
        //this.trackingDeviceView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.trackingDeviceView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(trackingDevice: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        trackingDevice.set("modifiedBy", appObj.get("Id"));
        trackingDevice.set("isActive", trackingDevice.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(trackingDevice);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(trackingDevice: dto.Models.TrackingDeviceDto) {
        //app = application.Application.getInstance();
       //  debugger;
        this.collection.reset(trackingDevice["trackingDeviceList"]);
        this.collectionView = new views.TrackingDeviceCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(trackingDeviceDto: dto.Models.TrackingDeviceDto) {
        var result = new Backbone.Model(trackingDeviceDto);
        if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
            helper.ShowModalPopup("danger", "Tracking Device", "Due to some technical reason Tracking Device have not been saved successfully!<br> Pelase try later");
        }
        else {
            //alert("Record has been saved successfully with TrackingDevice ID : " + trackingDeviceDto["id"]);
            helper.ShowModalPopup("success", "Tracking Device", "Record has been saved successfully with TrackingDevice ID : " + trackingDeviceDto["id"]);
            //this.UIBinding(model);
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewTrackingDevice";
    }

    UIBinding(model: any) {

         model.set("isActive", model.get("isActive") ? "1" : "0");

        this.trackingDeviceViewModel.bbModel = model;
        this.trackingDeviceViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.trackingDeviceView.el)[0]);
        ko.applyBindings(this.trackingDeviceViewModel, this.trackingDeviceView.el);
    }
}
