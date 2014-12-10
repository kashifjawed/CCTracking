/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./LoginView", "../Dtos/LoginDto", "../DAL/Login", "../Common/Views/HeaderView", "../Dtos/AppObjectDto", "../Common/Views/AdminLeftView", "../Booking/BookingLeft/BookingLeftCtrl", "../Bus/BusAvailabilityCtrl", "../Home/HomeCtrl", "marionette", "jquery", "knockout", "text!./Login.html"], function(require, exports, application, helper, views, dto, DAL, menu, appObjectDto, adminLeft, bookingLeftCtrl, busAvailabilityCtrl, homeCtrl) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./Login.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var LoginCtrl = (function (_super) {
        __extends(LoginCtrl, _super);
        function LoginCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.LoginDto();
            this.loginViewModel = new views.LoginViewModel(this.backboneModel, this);
            this.loginView = new views.LoginView({ viewModel: this.loginViewModel });
        }
        LoginCtrl.prototype.Load = function () {
            var _this = this;
            this.loginView = new views.LoginView();

            //var layout = this.app.AppLayout;
            //this.ContainerRegion.show(layout);
            this.app.LoginRegion.show(this.loginView);
            this.loginView.on("LoginUser", function () {
                return _this.Login(_this.loginViewModel.bbModel);
            });
        };

        LoginCtrl.prototype.Login = function (login) {
            var _this = this;
            //debugger;
            //this.ShowOverlay();
            var appObj = this.app.request("AppGlobalSetting");
            login.set("userName", $("#txtUserName").val());
            login.set("password", $("#txtPassword").val());
            var promise = DAL.Login(login);

            promise.done(function (p) {
                return _this.Authenticated(p);
            });
        };

        //TODO: this method should be inside controller
        LoginCtrl.prototype.Authenticated = function (loginDto) {
            //console.log(loginResponse);
            var lblLoginMessage = $("#lblLoginMessage");
            if (loginDto == undefined) {
                helper.ShowModalPopup("danger", "Authentication", "User name or password is wrong..!<br> Pelase try again");
                return;
            }

            if (loginDto["errorMessage"] !== null) {
                helper.ShowModalPopup("danger", "Authentication", loginDto["errorMessage"]);
            } else {
                var appObject = new appObjectDto.Models.AppObject();

                appObject.set("Id", loginDto["id"]);
                appObject.set("FirstName", loginDto["firstName"]);
                appObject.set("LastName", loginDto["lastName"]);
                appObject.set("UserName", loginDto["userName"]);
                appObject.set("IsAdmin", loginDto["isAdmin"]);
                appObject.set("AuthenticationToken", loginDto["authenticationToken"]);

                this.app.reqres.setHandler("AppGlobalSetting", function () {
                    return appObject;
                }, this);

                this.app.LoginRegion.close();

                var appObj = this.app.request("AppGlobalSetting");
                var headerModel = new Backbone.Model({ firstName: appObj.get("FirstName"), lastName: appObj.get("LastName"), userName: appObj.get("UserName") });

                var headerView = new menu.HeaderItemView({
                    model: headerModel
                });

                this.app.HeaderRegion.show(headerView);
                if (loginDto["isAdmin"]) {
                    //admin view
                    this.app.AdminLeftRegion.show(new adminLeft.AdminLeftItemView());
                    //var ctrl = new uc.UserCtrl();
                    //ctrl.GetAll();
                    //var vm = ctrl.userViewModel.model;
                }
                new bookingLeftCtrl.BookingLeftCtrl().Show();
                new busAvailabilityCtrl.BusAvailabilityCtrl().Show();
                var home = new homeCtrl.HomeCtrl();
                home.Show();
                //var ctrlBooking = new bookingCtrl.BookingCtrl();
                //ctrlBooking.Show();
            }
        };

        LoginCtrl.prototype.Cancel = function () {
            window.location.href = "#viewLogin";
        };
        return LoginCtrl;
    })(helper.Controller);
    exports.LoginCtrl = LoginCtrl;
});
