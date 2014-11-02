/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./DriverTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./DriverView");
import dto = require("../../Dtos/DriverDto");
import DAL = require("../../DAL/Driver");

export class DriverCtrl extends helper.Controller {
    app: any;
    driverViewModel: views.DriverViewModel;
    driverView: views.DriverView;
    backboneModel: Backbone.Model;
    collection: dto.Models.DriverCollection;
    collectionView: views.DriverCollectionView;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.DriverDto();
        this.driverViewModel = new views.DriverViewModel(this.backboneModel, this);
        this.driverView = new views.DriverView({ viewModel: this.driverViewModel });
        //this.driverView.on("SaveDriver", () => this.Save(this.driverView.model));        
        this.collection = new dto.Models.DriverCollection({});
        this.collectionView = new views.DriverCollectionView({ collection: this.collection });
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
        //var model = new dto.Models.DriverDto();
        var model = this.backboneModel;
        this.driverViewModel.bbModel = model;
        this.driverViewModel.model = kb.viewModel(model);
        // debugger;
        model.set("firstName", "");
        model.set("lastName", "");
        model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
        model.set("alkhidmatCentreSelected", "");
        model.set("cnic", "");
        model.set("address", "");
        model.set("city", "");
        model.set("mobile", "");
        model.set("isActive", "1");

        this.driverViewModel = new views.DriverViewModel(model, this);
        this.driverView = new views.DriverView({ viewModel: this.driverViewModel });
        this.driverView.on("SaveDriver", () => this.Save(this.driverViewModel.bbModel));

        this.driverView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.driverView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(driverDto: dto.Models.DriverDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(driverDto["driverModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.driverView = new views.DriverView({ viewModel: this.driverViewModel });
        this.driverView.on("SaveDriver", () => this.Save(this.driverViewModel.bbModel));
        this.driverView.on("CancelForm", () => this.Cancel());
        //this.driverView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.driverView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(driver: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        driver.set("modifiedBy", appObj.get("Id"));
        driver.set("centreId", driver.get("alkhidmatCentreSelected").id);
        driver.set("isActive", driver.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(driver);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(driver: dto.Models.DriverDto) {
        //app = application.Application.getInstance();
        //  debugger;
        this.collection.reset(driver["driverList"]);
        this.collectionView = new views.DriverCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(driverDto: dto.Models.DriverDto) {
        this.backboneModel = new Backbone.Model(driverDto);
        var model = this.backboneModel;
        //console.log(loginResponse);        
        if (driverDto == undefined) {
            //alert("Driver Detail have not been saved successfully!");
            helper.ShowModalPopup("danger", "Driver", "Driver have not been saved successfully!");
        }
        else {
            //alert("Record has been saved successfully with Driver ID : " + driverDto["id"]);
            helper.ShowModalPopup("success", "Driver", "Record has been saved successfully with Driver ID : " + driverDto["id"]);
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewDriver";
    }

    UIBinding(model: any) {

        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

        model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
        var centre = _.filter(lookupResponse.alkhidmatCentre, (p) => { return p.id == model.get("centreId"); });
        model.set("alkhidmatCentreSelected", centre[0]);

        model.set("isActive", model.get("isActive") ? "1" : "0");

        this.driverViewModel.bbModel = model;
        this.driverViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.driverView.el)[0]);
        ko.applyBindings(this.driverViewModel, this.driverView.el);
    }
}
