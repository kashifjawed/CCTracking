/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./VisitTypeTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./VisitTypeView");
import dto = require("../../Dtos/VisitTypeDto");
import DAL = require("../../DAL/VisitType");

export class VisitTypeCtrl extends helper.Controller {
    app: any;
    visitTypeViewModel: views.VisitTypeViewModel;
    visitTypeView: views.VisitTypeView;
    backboneModel: Backbone.Model;
    collection: dto.Models.VisitTypeCollection;
    collectionView: views.VisitTypeCollectionView;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.VisitTypeDto();
        this.visitTypeViewModel = new views.VisitTypeViewModel(this.backboneModel, this);
        this.visitTypeView = new views.VisitTypeView({ viewModel: this.visitTypeViewModel });
        //this.visitTypeView.on("SaveVisitType", () => this.Save(this.visitTypeView.model));        
        this.collection = new dto.Models.VisitTypeCollection({});
        this.collectionView = new views.VisitTypeCollectionView({ collection: this.collection });
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
        this.visitTypeViewModel.bbModel = model;
        this.visitTypeViewModel.model = kb.viewModel(model);
        // debugger;
        model.set("name", "");
        model.set("isActive", "");

        this.visitTypeViewModel = new views.VisitTypeViewModel(model, this);
        this.visitTypeView = new views.VisitTypeView({ viewModel: this.visitTypeViewModel });
        this.visitTypeView.on("SaveVisitType", () => this.Save(this.visitTypeViewModel.bbModel));

        this.visitTypeView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.visitTypeView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(visitTypeDto: dto.Models.VisitTypeDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(visitTypeDto["visitTypeModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.visitTypeView = new views.VisitTypeView({ viewModel: this.visitTypeViewModel });
        this.visitTypeView.on("SaveVisitType", () => this.Save(this.visitTypeViewModel.bbModel));
        this.visitTypeView.on("CancelForm", () => this.Cancel());
        //this.visitTypeView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.visitTypeView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(visitType: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        visitType.set("modifiedBy", appObj.get("Id"));
        visitType.set("isActive", visitType.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(visitType);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(visitType: dto.Models.VisitTypeDto) {
        //app = application.Application.getInstance();
       //  debugger;
        this.collection.reset(visitType["visitTypeList"]);
        this.collectionView = new views.VisitTypeCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(visitTypeDto: dto.Models.VisitTypeDto) {
        var result = new Backbone.Model(visitTypeDto);
        if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
            helper.ShowModalPopup("danger", "Visit Type", "Due to some technical reason Visit Type have not been saved successfully!<br> Pelase try later");
        }
        else {
            //alert("Record has been saved successfully with VisitType ID : " + visitTypeDto["id"]);
            helper.ShowModalPopup("success", "Visit Type", "Record has been saved successfully with VisitType ID : " + visitTypeDto["id"]);
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewVisitType";
    }

    UIBinding(model: any) {

         model.set("isActive", model.get("isActive") ? "1" : "0");

        this.visitTypeViewModel.bbModel = model;
        this.visitTypeViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.visitTypeView.el)[0]);
        ko.applyBindings(this.visitTypeViewModel, this.visitTypeView.el);
    }
}
