/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./DriverView", "../../Dtos/DriverDto", "../../DAL/Driver", "marionette", "jquery", "knockout", "text!./DriverTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./DriverTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var DriverCtrl = (function (_super) {
        __extends(DriverCtrl, _super);
        function DriverCtrl() {
            _super.call(this);

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
        DriverCtrl.prototype.Show = function () {
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

        DriverCtrl.prototype.Load = function () {
            var _this = this;
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
            model.set("isActive", "");

            this.driverViewModel = new views.DriverViewModel(model, this);
            this.driverView = new views.DriverView({ viewModel: this.driverViewModel });
            this.driverView.on("SaveDriver", function () {
                return _this.Save(_this.driverViewModel.bbModel);
            });

            this.driverView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.driverView);
            //this.GetAll();
        };

        DriverCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        DriverCtrl.prototype.GetByIdCompleted = function (driverDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(driverDto["driverModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.driverView = new views.DriverView({ viewModel: this.driverViewModel });
            this.driverView.on("SaveDriver", function () {
                return _this.Save(_this.driverViewModel.bbModel);
            });
            this.driverView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.driverView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.driverView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        DriverCtrl.prototype.Save = function (driver) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            driver.set("modifiedBy", appObj.get("Id"));
            driver.set("centreId", driver.get("alkhidmatCentreSelected").id);
            driver.set("isActive", driver.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(driver);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        DriverCtrl.prototype.GetAllCompleted = function (driver) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(driver["driverList"]);
            this.collectionView = new views.DriverCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        DriverCtrl.prototype.SaveCompleted = function (driverDto) {
            this.backboneModel = new Backbone.Model(driverDto);
            var model = this.backboneModel;

            //console.log(loginResponse);
            if (driverDto == undefined) {
                alert("Driver Detail have not been saved successfully!");
            } else {
                alert("Record has been saved successfully with Driver ID : " + driverDto["id"]);

                //this.UIBinding(model);
                this.Cancel();
            }
        };

        DriverCtrl.prototype.Cancel = function () {
            window.location.href = "#viewDriver";
        };

        DriverCtrl.prototype.UIBinding = function (model) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
            var centre = _.filter(lookupResponse.alkhidmatCentre, function (p) {
                return p.id == model.get("centreId");
            });
            model.set("alkhidmatCentreSelected", centre[0]);

            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.driverViewModel.bbModel = model;
            this.driverViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.driverView.el)[0]);
            ko.applyBindings(this.driverViewModel, this.driverView.el);
        };
        return DriverCtrl;
    })(helper.Controller);
    exports.DriverCtrl = DriverCtrl;
});
//# sourceMappingURL=DriverCtrl.js.map
