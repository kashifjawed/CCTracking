/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./PaymentTypeTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./PaymentTypeView");
import dto = require("../../Dtos/PaymentTypeDto");
import DAL = require("../../DAL/PaymentType");

export class PaymentTypeCtrl extends helper.Controller {
    app: any;
    paymentTypeViewModel: views.PaymentTypeViewModel;
    paymentTypeView: views.PaymentTypeView;
    backboneModel: Backbone.Model;
    collection: dto.Models.PaymentTypeCollection;
    collectionView: views.PaymentTypeCollectionView;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.PaymentTypeDto();
        this.paymentTypeViewModel = new views.PaymentTypeViewModel(this.backboneModel, this);
        this.paymentTypeView = new views.PaymentTypeView({ viewModel: this.paymentTypeViewModel });
        //this.paymentTypeView.on("SavePaymentType", () => this.Save(this.paymentTypeView.model));        
        this.collection = new dto.Models.PaymentTypeCollection({});
        this.collectionView = new views.PaymentTypeCollectionView({ collection: this.collection });
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
        this.paymentTypeViewModel.bbModel = model;
        this.paymentTypeViewModel.model = kb.viewModel(model);
        // debugger;
        model.set("name", "");
        model.set("isActive", "");

        this.paymentTypeViewModel = new views.PaymentTypeViewModel(model, this);
        this.paymentTypeView = new views.PaymentTypeView({ viewModel: this.paymentTypeViewModel });
        this.paymentTypeView.on("SavePaymentType", () => this.Save(this.paymentTypeViewModel.bbModel));

        this.paymentTypeView.on("CancelForm", () => this.Cancel());
        //this.layout = app.AppLayout;
        this.app.MainRegion.show(this.paymentTypeView);
        //this.GetAll();
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(paymentTypeDto: dto.Models.PaymentTypeDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(paymentTypeDto["paymentTypeModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.paymentTypeView = new views.PaymentTypeView({ viewModel: this.paymentTypeViewModel });
        this.paymentTypeView.on("SavePaymentType", () => this.Save(this.paymentTypeViewModel.bbModel));
        this.paymentTypeView.on("CancelForm", () => this.Cancel());
        //this.paymentTypeView.trigger("TestEvent");

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.paymentTypeView);

        //this.GetAll();
        //this.GetAllCompletedNew(this.collection);

    }

    Save(paymentType: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        paymentType.set("modifiedBy", appObj.get("Id"));
        paymentType.set("isActive", paymentType.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(paymentType);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(paymentType: dto.Models.PaymentTypeDto) {
        //app = application.Application.getInstance();
       //  debugger;
        this.collection.reset(paymentType["paymentTypeList"]);
        this.collectionView = new views.PaymentTypeCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(paymentTypeDto: dto.Models.PaymentTypeDto) {
        var result = new Backbone.Model(paymentTypeDto);
        if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
            helper.ShowModalPopup("danger", "Booking", "Due to some technical reason Payment Type have not been saved successfully!<br> Pelase try later");
        }
        else {
            //alert("Record has been saved successfully with PaymentType ID : " + paymentTypeDto["id"]);
            helper.ShowModalPopup("success", "Payment Type", "Record has been saved successfully with PaymentType ID : " + paymentTypeDto["id"]);
            
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewPaymentType";
    }

    UIBinding(model: any) {

        model.set("isActive", model.get("isActive") ? "1" : "0");

        this.paymentTypeViewModel.bbModel = model;
        this.paymentTypeViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.paymentTypeView.el)[0]);
        ko.applyBindings(this.paymentTypeViewModel, this.paymentTypeView.el);
    }
}
