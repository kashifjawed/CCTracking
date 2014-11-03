/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./LandmarkTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./LandmarkView");
import dto = require("../../Dtos/LandmarkDto");
import DAL = require("../../DAL/Landmark");

export class LandmarkCtrl extends helper.Controller {
    app: any;
    landmarkViewModel: views.LandmarkViewModel;
    landmarkView: views.LandmarkView;
    backboneModel: Backbone.Model;
    collection: dto.Models.LandmarkCollection;
    collectionView: views.LandmarkCollectionView;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.LandmarkDto();
        this.landmarkViewModel = new views.LandmarkViewModel(this.backboneModel, this);
        this.landmarkView = new views.LandmarkView({ viewModel: this.landmarkViewModel });
        //this.landmarkView.on("SaveLandmark", () => this.Save(this.landmarkView.model));        
        this.collection = new dto.Models.LandmarkCollection({});
        this.collectionView = new views.LandmarkCollectionView({ collection: this.collection });
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
        //var model = new dto.Models.LandmarkDto();
        var model = this.backboneModel;
        this.landmarkViewModel.bbModel = model;
        this.landmarkViewModel.model = kb.viewModel(model);
        // debugger;

        model.set("name", "");
        model.set("unionCouncilList", lookupResponse.unionCouncil);
        model.set("unionCouncilIdSelected", "");
        model.set("isActive", "");

        this.landmarkViewModel = new views.LandmarkViewModel(model, this);
        this.landmarkView = new views.LandmarkView({ viewModel: this.landmarkViewModel });
        this.landmarkView.on("SaveLandmark", () => this.Save(this.landmarkViewModel.bbModel));

        this.landmarkView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.landmarkView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(landmarkDto: dto.Models.LandmarkDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(landmarkDto["landmarkModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.landmarkView = new views.LandmarkView({ viewModel: this.landmarkViewModel });
        this.landmarkView.on("SaveLandmark", () => this.Save(this.landmarkViewModel.bbModel));
        this.landmarkView.on("CancelForm", () => this.Cancel());
        //this.landmarkView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.landmarkView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(landmark: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        landmark.set("modifiedBy", appObj.get("Id"));
        landmark.set("ucId", landmark.get("unionCouncilIdSelected").id);
        landmark.set("isActive", landmark.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(landmark);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(landmark: dto.Models.LandmarkDto) {
        //app = application.Application.getInstance();
        //  debugger;
        this.collection.reset(landmark["landmarkList"]);
        this.collectionView = new views.LandmarkCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(landmarkDto: dto.Models.LandmarkDto) {
        var result = new Backbone.Model(landmarkDto);
        if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
            helper.ShowModalPopup("danger", "Landmark", "Due to some technical reason Landmark have not been saved successfully!<br> Pelase try later");
        }
        else {
            helper.ShowModalPopup("success", "Landmark", "Record has been saved successfully with Landmark ID : " + landmarkDto["id"]);
            //this.UIBinding(model);
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewLandmark";
    }

    UIBinding(model: any) {

        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

        model.set("unionCouncilList", lookupResponse.unionCouncil);
        var unionCouncil = _.filter(lookupResponse.unionCouncil, (p) => { return p.id == model.get("ucId"); });
        model.set("unionCouncilIdSelected", unionCouncil[0]);

        model.set("isActive", model.get("isActive") ? "1" : "0");

        this.landmarkViewModel.bbModel = model;
        this.landmarkViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.landmarkView.el)[0]);
        ko.applyBindings(this.landmarkViewModel, this.landmarkView.el);
    }
}
