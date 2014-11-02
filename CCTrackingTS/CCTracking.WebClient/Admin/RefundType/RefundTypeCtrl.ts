/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./RefundTypeTmpl.html"/>

var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./RefundTypeView");
import dto = require("../../Dtos/RefundTypeDto");
import DAL = require("../../DAL/RefundType");

export class RefundTypeCtrl extends helper.Controller {
    app: any;
    refundTypeViewModel: views.RefundTypeViewModel;
    refundTypeView: views.RefundTypeView;
    backboneModel: Backbone.Model;
    collection: dto.Models.RefundTypeCollection;
    collectionView: views.RefundTypeCollectionView;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.RefundTypeDto();
        this.refundTypeViewModel = new views.RefundTypeViewModel(this.backboneModel, this);
        this.refundTypeView = new views.RefundTypeView({ viewModel: this.refundTypeViewModel });
        //this.refundTypeView.on("SaveRefundType", () => this.Save(this.refundTypeView.model));        
        this.collection = new dto.Models.RefundTypeCollection({});
        this.collectionView = new views.RefundTypeCollectionView({ collection: this.collection });
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
        this.refundTypeViewModel.bbModel = model;
        this.refundTypeViewModel.model = kb.viewModel(model);
        // debugger;
        model.set("name", "");
        model.set("isActive", "1");

        this.refundTypeViewModel = new views.RefundTypeViewModel(model, this);
        this.refundTypeView = new views.RefundTypeView({ viewModel: this.refundTypeViewModel });
        this.refundTypeView.on("SaveRefundType", () => this.Save(this.refundTypeViewModel.bbModel));

        this.refundTypeView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.refundTypeView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(refundTypeDto: dto.Models.RefundTypeDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(refundTypeDto["refundTypeModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.refundTypeView = new views.RefundTypeView({ viewModel: this.refundTypeViewModel });
        this.refundTypeView.on("SaveRefundType", () => this.Save(this.refundTypeViewModel.bbModel));
        this.refundTypeView.on("CancelForm", () => this.Cancel());
        //this.refundTypeView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.refundTypeView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(refundType: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        refundType.set("modifiedBy", appObj.get("Id"));
        refundType.set("isActive", refundType.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(refundType);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(refundType: dto.Models.RefundTypeDto) {
        //app = application.Application.getInstance();
       //  debugger;
        this.collection.reset(refundType["refundTypeList"]);
        this.collectionView = new views.RefundTypeCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(refundTypeDto: dto.Models.RefundTypeDto) {
        this.backboneModel = new Backbone.Model(refundTypeDto);
        var model = this.backboneModel;
        //console.log(loginResponse);        
        if (refundTypeDto == undefined) {
            //alert("RefundType Detail have not been saved successfully!");
            helper.ShowModalPopup("danger", "Refund Type", "RefundType Detail have not been saved successfully!");
        }
        else {
           // alert("Record has been saved successfully with RefundType ID : " + refundTypeDto["id"]);
            helper.ShowModalPopup("success", "Refund Type", "Record has been saved successfully with RefundType ID : " + refundTypeDto["id"]);
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewRefundType";
    }

    UIBinding(model: any) {

        model.set("isActive", model.get("isActive") ? "1" : "0");

        this.refundTypeViewModel.bbModel = model;
        this.refundTypeViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.refundTypeView.el)[0]);
        ko.applyBindings(this.refundTypeViewModel, this.refundTypeView.el);
    }
}
