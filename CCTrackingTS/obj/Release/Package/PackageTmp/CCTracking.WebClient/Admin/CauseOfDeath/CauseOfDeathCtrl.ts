/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./CauseOfDeathTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./CauseOfDeathView");
import dto = require("../../Dtos/CauseOfDeathDto");
import DAL = require("../../DAL/CauseOfDeath");

export class CauseOfDeathCtrl extends helper.Controller {
    app: any;
    causeOfDeathViewModel: views.CauseOfDeathViewModel;
    causeOfDeathView: views.CauseOfDeathView;
    backboneModel: Backbone.Model;
    collection: dto.Models.CauseOfDeathCollection;
    collectionView: views.CauseOfDeathCollectionView;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.CauseOfDeathDto();
        this.causeOfDeathViewModel = new views.CauseOfDeathViewModel(this.backboneModel, this);
        this.causeOfDeathView = new views.CauseOfDeathView({ viewModel: this.causeOfDeathViewModel });
        //this.causeOfDeathView.on("SaveCauseOfDeath", () => this.Save(this.causeOfDeathView.model));        
        this.collection = new dto.Models.CauseOfDeathCollection({});
        this.collectionView = new views.CauseOfDeathCollectionView({ collection: this.collection });
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
        this.causeOfDeathViewModel.bbModel = model;
        this.causeOfDeathViewModel.model = kb.viewModel(model);
        // debugger;
        model.set("name", "");
        model.set("isActive", "");

        this.causeOfDeathViewModel = new views.CauseOfDeathViewModel(model, this);
        this.causeOfDeathView = new views.CauseOfDeathView({ viewModel: this.causeOfDeathViewModel });
        this.causeOfDeathView.on("SaveCauseOfDeath", () => this.Save(this.causeOfDeathViewModel.bbModel));

        this.causeOfDeathView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.causeOfDeathView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(causeOfDeathDto: dto.Models.CauseOfDeathDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(causeOfDeathDto["causeofDeathModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.causeOfDeathView = new views.CauseOfDeathView({ viewModel: this.causeOfDeathViewModel });
        this.causeOfDeathView.on("SaveCauseOfDeath", () => this.Save(this.causeOfDeathViewModel.bbModel));
        this.causeOfDeathView.on("CancelForm", () => this.Cancel());
        //this.causeOfDeathView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.causeOfDeathView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(causeOfDeath: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        causeOfDeath.set("modifiedBy", appObj.get("Id"));
        causeOfDeath.set("isActive", causeOfDeath.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(causeOfDeath);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(causeOfDeath: dto.Models.CauseOfDeathDto) {
        //app = application.Application.getInstance();
       //  debugger;
        this.collection.reset(causeOfDeath["causeofDeathList"]);
        this.collectionView = new views.CauseOfDeathCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(causeOfDeathDto: dto.Models.CauseOfDeathDto) {
        var result = new Backbone.Model(causeOfDeathDto);
        if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
            helper.ShowModalPopup("danger", "Cause Of Death", "Due to some technical reason Cause of Death have not been saved successfully!<br> Pelase try later");
        }
        else {
            helper.ShowModalPopup("success", "Cause Of Death", "Record has been saved successfully with CauseOfDeath ID : " + causeOfDeathDto["id"]);
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewCauseOfDeath";
    }

    UIBinding(model: any) {

         model.set("isActive", model.get("isActive") ? "1" : "0");

        this.causeOfDeathViewModel.bbModel = model;
        this.causeOfDeathViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.causeOfDeathView.el)[0]);
        ko.applyBindings(this.causeOfDeathViewModel, this.causeOfDeathView.el);
    }
}
