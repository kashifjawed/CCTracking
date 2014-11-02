/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./TownTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./TownView");
import dto = require("../../Dtos/TownDto");
import DAL = require("../../DAL/Town");

export class TownCtrl extends helper.Controller {
    app: any;
    townViewModel: views.TownViewModel;
    townView: views.TownView;
    backboneModel: Backbone.Model;
    collection: dto.Models.TownCollection;
    collectionView: views.TownCollectionView;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.TownDto();
        this.townViewModel = new views.TownViewModel(this.backboneModel, this);
        this.townView = new views.TownView({ viewModel: this.townViewModel });
        //this.townView.on("SaveTown", () => this.Save(this.townView.model));        
        this.collection = new dto.Models.TownCollection({});
        this.collectionView = new views.TownCollectionView({ collection: this.collection });
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
        this.townViewModel.bbModel = model;
        this.townViewModel.model = kb.viewModel(model);
        // debugger;
        model.set("name", "");
        model.set("isActive", "");

        this.townViewModel = new views.TownViewModel(model, this);
        this.townView = new views.TownView({ viewModel: this.townViewModel });
        this.townView.on("SaveTown", () => this.Save(this.townViewModel.bbModel));

        this.townView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.townView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(townDto: dto.Models.TownDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(townDto["townModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.townView = new views.TownView({ viewModel: this.townViewModel });
        this.townView.on("SaveTown", () => this.Save(this.townViewModel.bbModel));
        this.townView.on("CancelForm", () => this.Cancel());
        //this.townView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.townView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(town: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        town.set("modifiedBy", appObj.get("Id"));
        town.set("isActive", town.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(town);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(town: dto.Models.TownDto) {
        //app = application.Application.getInstance();
       //  debugger;
        this.collection.reset(town["townList"]);
        this.collectionView = new views.TownCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(townDto: dto.Models.TownDto) {
        this.backboneModel = new Backbone.Model(townDto);
        var model = this.backboneModel;
        //console.log(loginResponse);        
        if (townDto == undefined) {
            //alert("Town Detail have not been saved successfully!");
            helper.ShowModalPopup("danger", "Town", "Town Detail have not been saved successfully!");
        }
        else {
            //alert("Record has been saved successfully with Town ID : " + townDto["id"]);
            helper.ShowModalPopup("success", "Town", "Record has been saved successfully with Town ID : " + townDto["id"]);
            this.Cancel();
        }
    }



    Cancel() {
        window.location.href = "#viewTown";
    }

    UIBinding(model: any) {
        
        model.set("isActive", model.get("isActive") ? "1" : "0");

        this.townViewModel.bbModel = model;
        this.townViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.townView.el)[0]);
        ko.applyBindings(this.townViewModel, this.townView.el);
    }
}
