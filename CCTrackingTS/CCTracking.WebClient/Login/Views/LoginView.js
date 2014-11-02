/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="text!CCTracking.WebClient/Login/Templates/Login.html"/>
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../DAL/Login", "../../App", "../../Dtos/AppObjectDto", "../../Common/Views/HeaderView", "../../Booking/Views/BookingLeftView", "../../Bus/BusAvailabilityCtrl", "../../Booking/BookingCtrl", "../../User/UserCtrl", "../../Common/Views/AdminLeftView", "text!CCTracking.WebClient/Login/Templates/Login.html", "marionette", "jquery"], function(require, exports, DAL, APP, appObjectDto, menu, summary, busAvailabilityCtrl, bookingCtrl, uc, adminLeft) {
    //var Marionette = require("marionette");
    var templateView = require("text!CCTracking.WebClient/Login/Templates/Login.html");

    var LoginItemView = (function (_super) {
        __extends(LoginItemView, _super);
        function LoginItemView(options) {
            //if (!options)
            //    options = {};
            this.template = templateView;
            this.events = {
                "submit": "Login"
            };
            this.App = APP.Application.getInstance();

            //this.App.vent.on("LoginCallback", this.Authenticated1);
            //this.App.reqres.setHandler("AppGlobalSetting", this.ConfigureGlobalSetting);
            _super.call(this, options);
        }
        //ConfigureGlobalSetting() {
        //    //loginResponse: DAL.Models.LoginResponse
        //    alert('global handler');
        //}
        LoginItemView.prototype.Login = function (e) {
            var _this = this;
            e.preventDefault();

            //this.trigger("login:clicked");
            var User = new DAL.Models.LoginRequest();
            User.set("userName", $("#txtUserName").val());
            User.set("password", $("#txtPassword").val());

            //alert('login..');
            var promise = DAL.Login(User);
            promise.done(function (p) {
                return _this.Authenticated(p);
            });
        };

        //TODO: this method should be inside controller
        LoginItemView.prototype.Authenticated = function (loginResponse) {
            //console.log(loginResponse);
            if (loginResponse == undefined) {
                alert("User name or password is wrong..");
            }

            if (loginResponse["errorMessage"] !== null) {
                alert(loginResponse.get("errorMessage"));
            } else {
                alert("You are authencated.." + loginResponse.loginModel["userName"] + " Authenticaiton id is: " + loginResponse.loginModel["authenticationToken"]);
                var app = APP.Application.getInstance();

                //Setting global object which can be accissible from other pages.
                var appObject = new appObjectDto.Models.AppObject();

                appObject.set("Id", loginResponse.loginModel["id"]);
                appObject.set("FirstName", loginResponse.loginModel["firstName"]);
                appObject.set("LastName", loginResponse.loginModel["lastName"]);
                appObject.set("UserName", loginResponse.loginModel["userName"]);
                appObject.set("AuthenticationToken", loginResponse.loginModel["authenticationToken"]);

                this.App.reqres.setHandler("AppGlobalSetting", function () {
                    return appObject;
                }, this);

                //app.AppLayout.LoginRegion.close();
                app.LoginRegion.close();

                var appObj = app.request("AppGlobalSetting");

                //alert(appObj.get("FirstName") + ',' + appObj.get("LastName"));
                //var headerModel = new Backbone.Model({ firstName: "Muhammad", lastName: "Ahmed" });
                var headerModel = new Backbone.Model({ firstName: appObj.get("FirstName"), lastName: appObj.get("LastName"), userName: appObj.get("UserName") });

                //var headerModel = new Backbone.Model({ appObj });
                var headerView = new menu.HeaderItemView({
                    model: headerModel
                });

                //app.AppLayout.HeaderRegion.show(headerView);
                app.HeaderRegion.show(headerView);

                if (loginResponse["isAdmin"]) {
                    //admin view
                    //app.AppLayout.LeftRegion.show(new adminLeft.AdminLeftItemView());
                    app.LeftRegion.show(new adminLeft.AdminLeftItemView());

                    var ctrl = new uc.UserCtrl();
                    ctrl.Show();
                    ctrl.GetAll();
                    var vm = ctrl.userViewModel.model;

                    //knockout binding syntax
                    vm.FirstName("value set from another place...");
                } else {
                    //app.AppLayout.LeftRegion.show(new summary.BookingSummaryItemView());
                    app.LeftRegion.show(new summary.BookingSummaryItemView());
                    new busAvailabilityCtrl.BusAvailabilityCtrl().Show();
                    var ctrlBooking = new bookingCtrl.BookingCtrl();
                    ctrlBooking.Show();
                }
            }
        };
        return LoginItemView;
    })(Marionette.ItemView);
    exports.LoginItemView = LoginItemView;
});
//# sourceMappingURL=LoginView.js.map
