/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./UserView", "../Dtos/UserDto", "../DAL/User", "marionette", "jquery", "knockout", "text!./UserTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./UserTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var UserCtrl = (function (_super) {
        __extends(UserCtrl, _super);
        function UserCtrl() {
            _super.call(this);
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.UserDto();
            this.userViewModel = new views.UserViewModel(this.backboneModel, this);
            this.userView = new views.UserView({ viewModel: this.userViewModel });
            this.collection = new dto.Models.UserCollection({});
            this.collectionView = new views.UserCollectionView({ collection: this.collection });
        }
        UserCtrl.prototype.Show = function () {
            var _this = this;
            var url = window.location.href;
            if (url.indexOf("id=") > -1) {
                var id = (url.substring(url.indexOf("id=") + 3, url.length));
                var deferredById = DAL.GetById(id);
                deferredById.done(function (p) {
                    return _this.GetByIdCompleted(p);
                });
            } else {
                this.Load();
            }
        };

        UserCtrl.prototype.Load = function () {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            var model = this.backboneModel;
            this.userViewModel.bbModel = model;
            this.userViewModel.model = kb.viewModel(model);

            // debugger;
            model.set("firstName", "");
            model.set("lastName", "");
            model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
            model.set("alkhidmatCentreSelected", "");
            model.set("roleList", lookupResponse.role);
            model.set("roleSelected", "");
            model.set("cnic", "");
            model.set("userName", "");
            model.set("address", "");
            model.set("city", "");
            model.set("mobile", "");
            model.set("email", "");
            model.set("isActive", "1");

            this.userViewModel = new views.UserViewModel(model, this);
            this.userView = new views.UserView({ viewModel: this.userViewModel });
            this.userView.on("SaveUser", function () {
                return _this.Save(_this.userViewModel.bbModel);
            });

            this.userView.on("CancelForm", function () {
                return _this.Cancel();
            });
            this.app.MainRegion.show(this.userView);
        };

        UserCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        UserCtrl.prototype.GetByIdCompleted = function (userDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(userDto);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.userView = new views.UserView({ viewModel: this.userViewModel });
            this.userView.on("SaveUser", function () {
                return _this.Save(_this.userViewModel.bbModel);
            });
            this.userView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.userView);
        };

        UserCtrl.prototype.Save = function (user) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            user.set("modifiedBy", appObj.get("Id"));
            user.set("centreId", user.get("alkhidmatCentreSelected").id);
            user.set("roleId", user.get("roleSelected").id);
            user.set("isActive", user.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(user);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        UserCtrl.prototype.GetAllCompleted = function (user) {
            var _this = this;
            // debugger;
            this.collection.reset(user);
            this.collectionView = new views.UserCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        UserCtrl.prototype.SaveCompleted = function (userDto) {
            this.backboneModel = new Backbone.Model(userDto);
            var model = this.backboneModel;

            //console.log(loginResponse);
            if (userDto == undefined) {
                //alert("User Detail have not been saved successfully!");
                helper.ShowModalPopup("danger", "User Detail", "User Detail have not been saved successfully!");
            } else {
                // alert("Record has been saved successfully with User ID : " + userDto["id"]);
                helper.ShowModalPopup("success", "User Detail", "Record has been saved successfully with User ID : " + userDto["id"]);

                //this.UIBinding(model);
                this.Cancel();
            }
        };

        UserCtrl.prototype.Cancel = function () {
            window.location.href = "#viewUser";
        };

        UserCtrl.prototype.UIBinding = function (model) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
            var centre = _.filter(lookupResponse.alkhidmatCentre, function (p) {
                return p.id == model.get("centreId");
            });
            model.set("alkhidmatCentreSelected", centre[0]);

            model.set("roleList", lookupResponse.role);
            var role = _.filter(lookupResponse.role, function (p) {
                return p.id == model.get("roleId");
            });
            model.set("roleSelected", role[0]);

            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.userViewModel.bbModel = model;
            this.userViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.userView.el)[0]);
            ko.applyBindings(this.userViewModel, this.userView.el);
        };
        return UserCtrl;
    })(helper.Controller);
    exports.UserCtrl = UserCtrl;
});
//# sourceMappingURL=UserCtrl.js.map
