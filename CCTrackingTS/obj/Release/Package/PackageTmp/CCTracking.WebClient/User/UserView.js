var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "marionette", "jquery", "knockout", "text!./UserTmpl.html", "text!./UserGrid.html"], function(require, exports, helper) {
    var _ = require('underscore');

    var templateView = require("text!./UserTmpl.html");
    var templateGrid = require("text!./UserGrid.html");

    var app;

    var UserViewModel = (function (_super) {
        __extends(UserViewModel, _super);
        function UserViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return UserViewModel;
    })(helper.ViewModel);
    exports.UserViewModel = UserViewModel;

    var UserView = (function (_super) {
        __extends(UserView, _super);
        function UserView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
        }
        UserView.prototype.close = function () {
        };
        UserView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        UserView.prototype.TestFunction = function () {
            alert("test function");
        };
        UserView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveUser");
        };
        return UserView;
    })(helper.Views.MvvmView);
    exports.UserView = UserView;

    var UserCollectionView = (function (_super) {
        __extends(UserCollectionView, _super);
        function UserCollectionView(options) {
            options.itemView = UserItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return UserCollectionView;
    })(helper.Views.CompositeView);
    exports.UserCollectionView = UserCollectionView;

    var UserItemView = (function (_super) {
        __extends(UserItemView, _super);
        function UserItemView(options) {
            if (!options)
                options = {};
            options.template = templateGrid.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            options.className = "jsRowClick";
            options.events = {
                "click .jsShowDetail": "ShowDetail",
                "click .jsResetPassword": "ResetPassword"
            };
            _super.call(this, options);
        }
        UserItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };

        UserItemView.prototype.ResetPassword = function (e) {
            var userId = helper.GetParameterByName("id", e.target.href);
            var userName = helper.GetParameterByName("username", e.target.href);
            var model = new Backbone.Model({ id: userId, userName: userName });
            this.trigger("Event:ResetPassword", model);
        };
        return UserItemView;
    })(helper.Views.ItemView);
    exports.UserItemView = UserItemView;
});
