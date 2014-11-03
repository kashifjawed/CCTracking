/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./UserTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../App");
import helper = require("../Helper");
import views = require("./UserView");
import dto = require("../Dtos/UserDto");
import DAL = require("../DAL/User");

export class UserCtrl extends helper.Controller {
    app: any;
    userViewModel: views.UserViewModel;
    userView: views.UserView;
    backboneModel: Backbone.Model;
    collection: dto.Models.UserCollection;
    collectionView: views.UserCollectionView;

    constructor() {
        super();
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.UserDto();
        this.userViewModel = new views.UserViewModel(this.backboneModel, this);
        this.userView = new views.UserView({ viewModel: this.userViewModel });
        this.collection = new dto.Models.UserCollection({});
        this.collectionView = new views.UserCollectionView({ collection: this.collection });
    }

    Show() {
        var url = window.location.href;
        if (url.indexOf("id=") > -1) {
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
        this.userView.on("SaveUser", () => this.Save(this.userViewModel.bbModel));

        this.userView.on("CancelForm", () => this.Cancel());
        this.app.MainRegion.show(this.userView);
    }

    GetAll() {
        var deferred = DAL.GetAll();
        deferred.done(p=> this.GetAllCompleted(p));
    }

    GetByIdCompleted(userDto: dto.Models.UserDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(userDto);
        var model = this.backboneModel;

        this.UIBinding(model);

        this.userView = new views.UserView({ viewModel: this.userViewModel });
        this.userView.on("SaveUser", () => this.Save(this.userViewModel.bbModel));
        this.userView.on("CancelForm", () => this.Cancel());

        //app = application.Application.getInstance();
        this.app.MainRegion.show(this.userView);

    }

    Save(user: any) {

        //debugger;
        var appObj = this.app.request("AppGlobalSetting");
        user.set("modifiedBy", appObj.get("Id"));
        user.set("centreId", user.get("alkhidmatCentreSelected").id);
        user.set("roleId", user.get("roleSelected").id);
        user.set("isActive", user.get("isActive") == "1" ? true : false);
        var deferred = DAL.Save(user);
        deferred.done(p=> this.SaveCompleted(p));
    }

    GetAllCompleted(user: dto.Models.UserDto) {
        // debugger;
        this.collection.reset(user);
        this.collectionView = new views.UserCollectionView({ collection: this.collection });
        this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        this.collectionView.listenTo(this.collectionView, "itemview:Event:ResetPassword", (view, userDto) => this.ResetUserPassword(userDto));

        this.app.MainRegion.show(this.collectionView);
    }

    SaveCompleted(userDto: dto.Models.UserDto) {
        this.backboneModel = new Backbone.Model(userDto);
        var model = this.backboneModel;
        //console.log(loginResponse);        
        if (userDto == undefined) {
            //alert("User Detail have not been saved successfully!");
            helper.ShowModalPopup("danger", "User Detail", "User Detail have not been saved successfully!");
        }
        else {
            // alert("Record has been saved successfully with User ID : " + userDto["id"]);
            helper.ShowModalPopup("success", "User Detail", "Record has been saved successfully with User ID : " + userDto["id"]);
            //this.UIBinding(model);
            this.Cancel();
        }
    }

    Cancel() {
        window.location.href = "#viewUser";
    }

    ResetUserPassword(userDto: any) {
        var appObj = this.app.request("AppGlobalSetting");
      
        userDto.set("modifiedBy", appObj.get("Id"));
        var promise = DAL.ResetUserPasswrd(userDto);

        promise.done((p) => this.ResetUserPasswrdCompleted(p));
    }

    ResetUserPasswrdCompleted(userDto: dto.Models.UserDto) {
        var result = new Backbone.Model(userDto);
        if (result == undefined) {
            helper.ShowModalPopup("danger", "Reset Password", "Due to some technical reason password have not been reset successfully!<br> Pelase try later");
            return;
        }
        else if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
            helper.ShowModalPopup("danger", "Reset Password", result.get("errorMessage"));
            return;
        }
        else {
            helper.ShowModalPopup("success", "Reset Password", "User Password has been reset successfully to his initial password.");
        }
    }

    UIBinding(model: any) {

        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

        model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
        var centre = _.filter(lookupResponse.alkhidmatCentre, (p) => { return p.id == model.get("centreId"); });
        model.set("alkhidmatCentreSelected", centre[0]);

        model.set("roleList", lookupResponse.role);
        var role = _.filter(lookupResponse.role, (p) => { return p.id == model.get("roleId"); });
        model.set("roleSelected", role[0]);

        model.set("isActive", model.get("isActive") ? "1" : "0");

        this.userViewModel.bbModel = model;
        this.userViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.userView.el)[0]);
        ko.applyBindings(this.userViewModel, this.userView.el);
    }
}
