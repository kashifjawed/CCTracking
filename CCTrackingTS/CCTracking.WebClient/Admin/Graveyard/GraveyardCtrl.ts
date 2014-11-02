/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./GraveyardTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./GraveyardView");
import dto = require("../../Dtos/GraveyardDto");
import DAL = require("../../DAL/Graveyard");

export class GraveyardCtrl extends helper.Controller {
    app: any;
    graveyardViewModel: views.GraveyardViewModel;
    graveyardView: views.GraveyardView;
    backboneModel: Backbone.Model;
    collection: dto.Models.GraveyardCollection;
    collectionView: views.GraveyardCollectionView;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.GraveyardDto();
        this.graveyardViewModel = new views.GraveyardViewModel(this.backboneModel, this);
        this.graveyardView = new views.GraveyardView({ viewModel: this.graveyardViewModel });
        //this.graveyardView.on("SaveGraveyard", () => this.Save(this.graveyardView.model));        
        this.collection = new dto.Models.GraveyardCollection({});
        this.collectionView = new views.GraveyardCollectionView({ collection: this.collection });
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
        //var model = new dto.Models.GraveyardDto();
        var model = this.backboneModel;
        this.graveyardViewModel.bbModel = model;
        this.graveyardViewModel.model = kb.viewModel(model);
        // debugger;

        model.set("name", "");
        model.set("landmarkIdSelected", "");
        model.set("landmarkList", lookupResponse.landmark);
        model.set("isActive", "1");

        this.graveyardViewModel = new views.GraveyardViewModel(model, this);
        this.graveyardView = new views.GraveyardView({ viewModel: this.graveyardViewModel });
        this.graveyardView.on("SaveGraveyard", () => this.Save(this.graveyardViewModel.bbModel));

        this.graveyardView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.graveyardView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(graveyardDto: dto.Models.GraveyardDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(graveyardDto["graveyardModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.graveyardView = new views.GraveyardView({ viewModel: this.graveyardViewModel });
        this.graveyardView.on("SaveGraveyard", () => this.Save(this.graveyardViewModel.bbModel));
        this.graveyardView.on("CancelForm", () => this.Cancel());
        //this.graveyardView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.graveyardView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(graveyard: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        graveyard.set("modifiedBy", appObj.get("Id"));
        graveyard.set("landmarkId", graveyard.get("landmarkIdSelected").id);
        graveyard.set("isActive", graveyard.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(graveyard);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(graveyard: dto.Models.GraveyardDto) {
        //app = application.Application.getInstance();
        //  debugger;
        this.collection.reset(graveyard["graveyardList"]);
        this.collectionView = new views.GraveyardCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(graveyardDto: dto.Models.GraveyardDto) {
        this.backboneModel = new Backbone.Model(graveyardDto);
        var model = this.backboneModel;
        //console.log(loginResponse);        
        if (graveyardDto == undefined) {
            helper.ShowModalPopup("danger", "Graveyard", "Booking have not been saved successfully!");
            //alert("Graveyard Detail have not been saved successfully!");
        }
        else {
            // alert("Record has been saved successfully with Graveyard ID : " + graveyardDto["id"]);
            helper.ShowModalPopup("success", "Graveyard", "Record has been saved successfully with Graveyard ID : " + graveyardDto["id"]);
            //this.UIBinding(model);
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewGraveyard";
    }

    UIBinding(model: any) {

        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

        model.set("landmarkList", lookupResponse.landmark);
        var landmark = _.filter(lookupResponse.landmark, (p) => { return p.id == model.get("landmarkId"); });
        model.set("landmarkIdSelected", landmark[0]);

        model.set("isActive", model.get("isActive") ? "1" : "0");

        this.graveyardViewModel.bbModel = model;
        this.graveyardViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.graveyardView.el)[0]);
        ko.applyBindings(this.graveyardViewModel, this.graveyardView.el);
    }
}
