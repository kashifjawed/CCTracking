﻿/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./SearchView", "CCTracking.WebClient/Dtos/SearchDto", "../DAL/Search", "marionette", "jquery", "knockout", "text!./SearchTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./SearchTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var app;

    var SearchCtrl = (function (_super) {
        __extends(SearchCtrl, _super);
        function SearchCtrl() {
            _super.call(this);
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.SearchDto();
            this.searchViewModel = new views.SearchViewModel(this.backboneModel, this);

            //this.searchView = new views.SearchView({ viewModel: this.searchViewModel });
            this.compositeModel = new Backbone.Model();
            this.collection = new dto.Models.SearchCollection({ id: "", contactName: "", contactMobile: "", contactNic: "", deseasedName: "", address: "", status: "" });
            this.collectionView = new views.SearchCollectionView({ collection: this.collection, model: this.compositeModel });
        }
        SearchCtrl.prototype.Show = function () {
            this.Load();
        };

        SearchCtrl.prototype.Load = function () {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            var model = this.backboneModel;
            model.set("graveyardList", lookupResponse.graveyard);
            model.set("graveyardIdSelected", "");
            model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
            model.set("alkhidmatCentreSelected", "");
            model.set("busList", lookupResponse.bus);
            model.set("busSelected", "");
            model.set("genderId", "");
            model.set("contactInfo", "");
            model.set("deseasedInfo", "");
            model.set("paymentStatusId", "");
            model.set("bookingDate", "10/10/2000");
            this.compositeModel = model;

            //this.searchViewModel = new views.SearchViewModel(this.compositeModel, this);
            //this.collectionView = new views.SearchCollectionView({ viewModel: this.searchViewModel, collection: null, model: this.compositeModel });
            //this.collectionView.collection = this.collection;
            //this.collectionView.model = this.compositeModel;
            //this.collectionView.on("SearchBooking", () => this.GetByCriteria(this.searchViewModel.bbModel));
            this.collectionView.listenTo(this.collectionView, "SearchBooking", function () {
                return _this.GetByCriteria(_this.searchViewModel.bbModel);
            });

            this.collectionView.on("CancelForm", function () {
                return _this.Cancel();
            });
            this.app.MainRegion.show(this.collectionView);

            var vm = kb.viewModel(this.compositeModel);

            //vm.setOptionDisable = this.collectionView.setOptionDisable;
            var element = $('#ddlGraveyard')[0];
            ko.cleanNode(element);
            ko.applyBindings(vm, element);
            var centre = $('#ddlCentre')[0];
            ko.cleanNode(centre);
            ko.applyBindings(vm, centre);
            var bus = $('#ddlBusDetails')[0];
            ko.cleanNode(bus);
            ko.applyBindings(vm, bus);

            var contactInfo = $('#txtContactInfo')[0];
            ko.cleanNode(contactInfo);
            ko.applyBindings(vm, contactInfo);

            var deseasedInfo = $('#txtDeseasedInfo')[0];
            ko.cleanNode(deseasedInfo);
            ko.applyBindings(vm, deseasedInfo);

            var gender = $('.jsGender')[0];
            ko.cleanNode(gender);
            ko.applyBindings(vm, gender);
            gender = $('.jsGender')[1];
            ko.cleanNode(gender);
            ko.applyBindings(vm, gender);

            var paymentStatus = $('.jsPaymentStatus')[0];
            ko.cleanNode(paymentStatus);
            ko.applyBindings(vm, paymentStatus);
            paymentStatus = $('.jsPaymentStatus')[1];
            ko.cleanNode(paymentStatus);
            ko.applyBindings(vm, paymentStatus);

            var bookingDate = $('#txtBookingDate')[0];
            ko.cleanNode(bookingDate);
            ko.applyBindings(vm, bookingDate);
            //this.searchView = new views.SearchView({ viewModel: this.searchViewModel });
            //this.searchView.on("SearchBooking", () => this.GetByCriteria(this.searchViewModel.bbModel));
            //this.searchView.on("CancelForm", () => this.Cancel());
            //this.app.MainRegion.show(this.searchView);
        };

        SearchCtrl.prototype.GetByCriteria = function (searchDto) {
            //alert('ctrl');
            //var searchRequest = new dto.Models.SearchDto();
            ////searchRequest.set("contactInfo", )
            ////searchRequest.set("deseasedInfo", )
            //searchRequest.set("gender", searchDto.get("gender").toString());
            //searchRequest.set("paymentStatus", searchDto.get("paymentStatus").toString());
            //searchRequest.set("bookingDate", Date.now());
            //searchRequest.set("greveyard", searchDto.get("graveyardIdSelected").id);
            //searchRequest.set("centre", searchDto.get("alkhidmatCentreSelected").id);
            //searchRequest.set("bus", searchDto.get("busSelected").id);
            var _this = this;
            searchDto.set("genderId", searchDto.get("genderId").toString());
            searchDto.set("paymentStatusId", searchDto.get("paymentStatusId").toString());
            searchDto.set("bookingDate", Date.now());
            searchDto.set("greveyardId", searchDto.get("graveyardIdSelected").id);
            searchDto.set("centreId", searchDto.get("alkhidmatCentreSelected").id);
            searchDto.set("busId", searchDto.get("busSelected").id);
            var deferred = DAL.GetByCriteria(searchDto);
            deferred.done(function (p) {
                return _this.GetByCriteriaCompleted(p);
            });
        };

        SearchCtrl.prototype.GetByCriteriaCompleted = function (searchDto) {
            //this.collection.reset();
            //debugger;
            //this.collectionView.collection.reset();
            this.collection.reset(searchDto["bookingList"]);
            //this.collectionView = new views.SearchCollectionView({ collection: this.collection });
            //this.app.MainRegion.show(this.collectionView);
        };

        SearchCtrl.prototype.Cancel = function () {
            window.location.href = "#searchBooking";
        };
        return SearchCtrl;
    })(helper.Controller);
    exports.SearchCtrl = SearchCtrl;
});
//# sourceMappingURL=SearchCtrl.js.map
