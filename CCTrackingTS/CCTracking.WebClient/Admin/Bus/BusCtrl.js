/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./BusView", "../../Dtos/BusDto", "../../DAL/Bus", "marionette", "jquery", "knockout", "text!./BusTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./BusTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var BusCtrl = (function (_super) {
        __extends(BusCtrl, _super);
        function BusCtrl() {
            _super.call(this);

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
        BusCtrl.prototype.Show = function () {
            var _this = this;
            var url = window.location.href;
            if (url.indexOf("id=") > -1) {
                //alert(url.substring(url.indexOf("id=") + 3, url.length));
                var id = (url.substring(url.indexOf("id=") + 3, url.length));
                var deferredById = DAL.GetById(id);
                deferredById.done(function (p) {
                    return _this.GetByIdCompleted(p);
                });
            } else {
                this.Load();
            }
        };

        BusCtrl.prototype.Load = function () {
            var _this = this;
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
            this.busView.on("SaveBus", function () {
                return _this.Save(_this.busViewModel.bbModel);
            });

            this.busView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.busView);
            //this.GetAll();
        };

        BusCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        BusCtrl.prototype.GetByIdCompleted = function (busDto) {
            //alert("GetByIdCompleted..");
            var _this = this;
            this.backboneModel = new Backbone.Model(busDto["busModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.busView = new views.BusView({ viewModel: this.busViewModel });
            this.busView.on("SaveBus", function () {
                return _this.Save(_this.busViewModel.bbModel);
            });
            this.busView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.busView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.busView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        BusCtrl.prototype.Save = function (bus) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            bus.set("modifiedBy", appObj.get("Id"));
            bus.set("centreId", bus.get("alkhidmatCentreSelected").id);
            bus.set("modelNo", bus.get("busModelSelected").id);
            bus.set("isActive", bus.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(bus);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        BusCtrl.prototype.GetAllCompleted = function (bus) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(bus["busList"]);
            this.collectionView = new views.BusCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        BusCtrl.prototype.SaveCompleted = function (busDto) {
            this.backboneModel = new Backbone.Model(busDto);
            var model = this.backboneModel;

            //console.log(loginResponse);
            if (busDto == undefined) {
                // alert("Bus Detail have not been saved successfully!");
                helper.ShowModalPopup("danger", "Bus", "Bus Details have not been saved successfully!");
            } else {
                //alert("Record has been saved successfully with Bus ID : " + busDto["id"]);
                helper.ShowModalPopup("success", "Bus", "Record has been saved successfully with Bus ID : " + busDto["id"]);

                //this.UIBinding(model);
                this.Cancel();
            }
        };

        BusCtrl.prototype.Cancel = function () {
            window.location.href = "#viewAdminBus";
        };

        BusCtrl.prototype.UIBinding = function (model) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
            var centre = _.filter(lookupResponse.alkhidmatCentre, function (p) {
                return p.id == model.get("centreId");
            });
            model.set("alkhidmatCentreSelected", centre[0]);

            model.set("busModelList", lookupResponse.busModel);
            var modelNo = _.filter(lookupResponse.busModel, function (p) {
                return p.id == model.get("modelNo");
            });
            model.set("busModelSelected", modelNo[0]);

            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.busViewModel.bbModel = model;
            this.busViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.busView.el)[0]);
            ko.applyBindings(this.busViewModel, this.busView.el);
            //this.busView = new views.BusView({ viewModel: this.busViewModel });
            //this.busView.on("SaveBus", () => this.Save(this.busViewModel.bbModel));
        };
        return BusCtrl;
    })(helper.Controller);
    exports.BusCtrl = BusCtrl;
});
